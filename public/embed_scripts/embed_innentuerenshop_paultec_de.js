(function () {
  function main() {
    // ── SELECTORS ────────────────────────────────────────────────────
    const GALLERY_WRAPPER_SELECTOR = ".woocommerce-product-gallery__wrapper";
    const OPTIONS_SELECTOR = "#tm-extra-product-options-fields";
    const IFRAME_3D_URL =
      "https://door-3d-configurator.vercel.app/paultec_alba/embed_alba_iframe";

    const galleryWrapper = document.querySelector(GALLERY_WRAPPER_SELECTOR);
    if (!galleryWrapper) {
      console.warn("[DoorConfigurator] Gallery wrapper not found");
      return;
    }

    console.log("[DoorConfigurator] script loaded");

    // ── INJECT STYLES ────────────────────────────────────────────────
    const style = document.createElement("style");
    style.innerHTML = `
      .door-toggle {
        position: absolute;
        top: 12px;
        left: 12px;
        z-index: 10001;
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

      /* Hide 2D images when 3D mode is active */
      .door-3d-active .flickity-viewport {
        visibility: hidden;
      }

      /* 3D iframe overlay */
      #door-3d-iframe {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        z-index: 10000;
      }

      .door-3d-active #door-3d-iframe {
        display: block;
      }
    `;
    document.head.appendChild(style);

    // ── MAKE WRAPPER RELATIVE (needed for absolute iframe overlay) ───
    galleryWrapper.style.position = "relative";

    // ── CREATE TOGGLE UI ─────────────────────────────────────────────
    const toggle = document.createElement("div");
    toggle.className = "door-toggle";
    toggle.innerHTML = `
      <button data-mode="2d" class="active">2D</button>
      <button data-mode="3d">3D</button>
      <a href="${IFRAME_3D_URL}" target="_blank">Iframe</a>
    `;
    galleryWrapper.appendChild(toggle);

    // ── CREATE IFRAME (lazy — injected once, shown/hidden by CSS) ────
    const iframeEl = document.createElement("iframe");
    iframeEl.id = "door-3d-iframe";
    iframeEl.setAttribute("allowfullscreen", "true");
    galleryWrapper.appendChild(iframeEl);

    // ── STATE ────────────────────────────────────────────────────────
    let viewMode = "2d";
    let iframeLoaded = false;

    function updateUI() {
      toggle.querySelectorAll("button").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.mode === viewMode);
      });

      if (viewMode === "3d") {
        galleryWrapper.classList.add("door-3d-active");

        // Lazy-load the iframe src the first time 3D is activated
        if (!iframeLoaded) {
          iframeEl.src = IFRAME_3D_URL;
          iframeLoaded = true;
          // Send current options once iframe finishes loading
          iframeEl.addEventListener(
            "load",
            () => sendOptions("iframe loaded"),
            { once: true },
          );
        }
      } else {
        galleryWrapper.classList.remove("door-3d-active");
      }
    }

    // ── TOGGLE CLICK ─────────────────────────────────────────────────
    toggle.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      viewMode = btn.dataset.mode;
      updateUI();

      console.log("[DoorConfigurator] viewMode:", viewMode);

      // Notify the 3D iframe of the mode change
      if (iframeLoaded && iframeEl.contentWindow) {
        iframeEl.contentWindow.postMessage(
          { type: "VIEW_MODE_CHANGE", mode: viewMode },
          "*",
        );
      }
    });

    // ── COLLECT OPTIONS FROM MAIN DOCUMENT ───────────────────────────
    // Options live in the main document, NOT inside an iframe
    function collectOptions() {
      const containers = document.querySelectorAll(
        `${OPTIONS_SELECTOR} div.tc-container:not(.tc-hidden)`,
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

    // ── SEND OPTIONS INTO THE 3D IFRAME ──────────────────────────────
    function sendOptions(reason) {
      if (!iframeLoaded || !iframeEl.contentWindow) return;

      const options = collectOptions();
      console.log("[DoorConfigurator] sendOptions triggered:", reason, options);

      iframeEl.contentWindow.postMessage(
        {
          type: "DOOR_OPTIONS",
          options,
        },
        "*",
      );
    }

    // ── WATCH FOR OPTION CHANGES IN MAIN DOCUMENT ────────────────────
    const optionsContainer = document.querySelector(OPTIONS_SELECTOR);

    if (optionsContainer) {
      optionsContainer.addEventListener("change", () => sendOptions("change"));
      optionsContainer.addEventListener("input", () => sendOptions("input"));

      // MutationObserver catches AJAX-injected options and tc-hidden toggles
      const observer = new MutationObserver(() => sendOptions("DOM mutated"));
      observer.observe(optionsContainer, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    } else {
      console.warn(
        "[DoorConfigurator] Options container not found:",
        OPTIONS_SELECTOR,
      );
    }
  }

  // ── WAIT FOR DOM ──────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main(); // DOM already ready (script deferred or injected late)
  }
})();
