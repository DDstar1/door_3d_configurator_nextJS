(function () {
  const IFRAME_ID = "door-configurator";
  const VISIBLE_OPTIONS_SELECTOR =
    "#tm-extra-product-options-fields div.tc-container:not(.tc-hidden)";

  const iframe = document.getElementById(IFRAME_ID);
  if (!iframe) {
    console.warn("[DoorConfigurator] iframe not found");
    return;
  }

  console.log("[DoorConfigurator] script loaded");

  // ── helpers ────────────────────────────────────────────────────────────────

  function getLabel(container, productDescriptions) {
    const labelSelectors = [".tc-epo-element-label-text", ".tc-label-text"];
    for (const sel of labelSelectors) {
      const el = container.querySelector(sel);
      if (el) {
        const text = el.innerText.trim();
        if (text) return text.replace(/:$/, "").trim();
      }
    }
    const fallbackLabel = `Description${productDescriptions.length + 1}`;
    productDescriptions.push({ label_text: fallbackLabel });
    return fallbackLabel;
  }

  function getValue(container) {
    const select = container.querySelector("select.tmcp-select");
    if (select) {
      const checked = select.querySelector("option:checked");
      return checked ? checked.innerText.trim() : null;
    }
    const checkedInput = container.querySelector(
      "input[type='radio']:checked, input[type='checkbox']:checked",
    );
    if (checkedInput) {
      const labelEl = container.querySelector(".tc-label-text");
      if (labelEl) return labelEl.innerText.trim();
      return checkedInput.value || null;
    }
    const inputEl = container.querySelector(
      "input[type='number'], input[type='text']",
    );
    if (inputEl) {
      const min = inputEl.getAttribute("min") ?? "null";
      const max = inputEl.getAttribute("max") ?? "null";
      const val = inputEl.value ?? "null"; // .value for live value, not attribute
      return `min_${min} | max_${max} | value_${val}`;
    }
    const descBlock = container.querySelector(".tm-description");
    if (descBlock) {
      const text = container.innerText.replace(/\s+/g, " ").trim();
      return text || null;
    }
    return null;
  }

  // ── collect ────────────────────────────────────────────────────────────────

  function collectOptions(iframeDoc) {
    const containers = iframeDoc.querySelectorAll(VISIBLE_OPTIONS_SELECTOR);
    const productDescriptions = [];
    const result = {};
    containers.forEach((container) => {
      const label = getLabel(container, productDescriptions);
      const value = getValue(container);
      result[label] = value;
    });
    return result;
  }

  // ── init: called once the iframe DOM is ready ──────────────────────────────

  function init() {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc || iframeDoc.readyState === "loading") {
      iframe.addEventListener("load", init, { once: true });
      return;
    }

    function update(source) {
      const options = collectOptions(iframeDoc);
      iframe._doorOptions = options;
      window.parent.postMessage({ type: "DOOR_OPTIONS", options }, "*");
      console.log(`[DoorConfigurator] ${source} →`, options);
    }
    update("initial");

    // Change / input events
    iframeDoc.addEventListener("change", () => update("changed"));
    iframeDoc.addEventListener("input", () => update("input"));

    // DOM mutations (hidden toggles, injected containers)
    const observer = new MutationObserver(() => update("DOM mutated"));

    observer.observe(iframeDoc.body, {
      subtree: true,
      childList: true, // containers added / removed
      attributes: true, // tc-hidden class toggled
      attributeFilter: ["class", "style"],
    });
  }

  init();
})();
