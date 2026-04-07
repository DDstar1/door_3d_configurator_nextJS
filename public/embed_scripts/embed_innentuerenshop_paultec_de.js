(function () {
  const TARGET_SELECTOR =
    ".woocommerce-product-gallery__wrapper .flickity-viewport";

  const target = document.querySelector(TARGET_SELECTOR);
  if (!target) {
    console.warn("[DoorConfigurator] Target not found");
    return;
  }

  console.log("[DoorConfigurator] script loaded");

  // ── CREATE CONTAINER ─────────────────────────────────────────────
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";

  target.appendChild(wrapper);

  // ── INJECT STYLES ────────────────────────────────────────────────
  const style = document.createElement("style");
  style.innerHTML = `
    .door-toggle {
      position: absolute;
      top: 12px;
      left: 12px;
      z-index: 999;
      display: flex;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      font-family: sans-serif;
    }

    .door-toggle button,
    .door-toggle a {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      font-size: 13px;
      cursor: pointer;
      border: none;
      background: white;
      color: #555;
      text-decoration: none;
    }

    .door-toggle button:hover,
    .door-toggle a:hover {
      background: #f3f4f6;
    }

    .door-toggle .active {
      background: #7f1d1d;
      color: white;
    }
  `;
  document.head.appendChild(style);

  // ── CREATE HTML ──────────────────────────────────────────────────
  const toggle = document.createElement("div");
  toggle.className = "door-toggle";

  toggle.innerHTML = `
    <button data-mode="2d" class="active">2D</button>
    <button data-mode="3d">3D</button>
    <a href="https://door-3d-configurator.vercel.app/paultec_alba/embed_alba_iframe" target="_blank">
      Iframe
    </a>
  `;

  wrapper.appendChild(toggle);

  // ── FIND THE ACTUAL IFRAME ───────────────────────────────────────
  // FIX: target is a DOM element, not an iframe. Find the real iframe inside it.
  const iframeEl = target.querySelector("iframe");

  // ── STATE ────────────────────────────────────────────────────────
  let viewMode = "2d";

  function updateUI() {
    toggle.querySelectorAll("button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === viewMode);
    });
  }

  // ── EVENTS ───────────────────────────────────────────────────────
  toggle.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    viewMode = btn.dataset.mode;
    updateUI();

    console.log("[DoorConfigurator] viewMode:", viewMode);

    // FIX: Post to the iframe's contentWindow, not window itself
    if (iframeEl && iframeEl.contentWindow) {
      iframeEl.contentWindow.postMessage(
        {
          type: "VIEW_MODE_CHANGE",
          mode: viewMode,
        },
        "*",
      );
    } else {
      // Fallback: post to window if no iframe found
      window.postMessage(
        {
          type: "VIEW_MODE_CHANGE",
          mode: viewMode,
        },
        "*",
      );
    }
  });

  // ── COLLECT OPTIONS ───────────────────────────────────────────────
  function collectOptions(doc) {
    const containers = doc.querySelectorAll(
      "#tm-extra-product-options-fields div.tc-container:not(.tc-hidden)",
    );
    const result = {};

    containers.forEach((container) => {
      const label =
        container.querySelector(".tc-label-text")?.innerText.trim() ||
        "Unknown";

      const value =
        container.querySelector("select")?.value ||
        container.querySelector("input:checked")?.value ||
        null;

      result[label] = value;
    });

    return result;
  }

  // ── INIT ──────────────────────────────────────────────────────────
  function init() {
    if (!iframeEl) {
      console.warn("[DoorConfigurator] No iframe found inside target");
      return;
    }

    const iframeDoc =
      iframeEl.contentDocument || iframeEl.contentWindow?.document;

    if (!iframeDoc || iframeDoc.readyState === "loading") {
      iframeEl.addEventListener("load", init, { once: true });
      return;
    }

    function update(reason) {
      console.log("[DoorConfigurator] update triggered:", reason);
      const options = collectOptions(iframeDoc);

      window.parent.postMessage(
        {
          type: "DOOR_OPTIONS",
          options,
        },
        "*",
      );
    }

    update("init");

    iframeDoc.addEventListener("change", () => update("change"));
    iframeDoc.addEventListener("input", () => update("input"));

    // FIX: MutationObserver is now inside init(), where iframeDoc and update() are in scope
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
