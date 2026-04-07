(function DoorConfiguratorEmbed() {
  function main() {
    const GALLERY_WRAPPER_SELECTOR = ".product-images";
    const GALLERY_WRAPPER_PARENT_SELECTOR = ".is-sticky-column__inner";
    const OPTIONS_SELECTOR = "#tm-extra-product-options-fields";
    const IFRAME_3D_URL =
      "https://door-3d-configurator.vercel.app/paultec_alba/embed_alba_iframe";

    const links = [
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=deployed_code",
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=image",
    ];

    links.forEach((href) => {
      const fontLink = document.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href = href;
      document.head.appendChild(fontLink);
    });

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0";
    document.head.appendChild(fontLink);

    const galleryWrapper = document.querySelector(GALLERY_WRAPPER_SELECTOR);
    const galleryWrapperParent = document.querySelector(
      GALLERY_WRAPPER_PARENT_SELECTOR,
    );
    if (!galleryWrapper) {
      console.warn("[DoorConfigurator] Gallery wrapper not found");
      return;
    }

    console.log("[DoorConfigurator] script loaded");

    // ── STYLES ──────────────────────────────────────────────────────
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
        height: 40px;
      }

      .door-toggle button
      {
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
        height: 100%;
      }

      .door-toggle button:hover:not(.active){
        background: #fca5a5;
      }

      .door-toggle .active {
        background: #7f1d1d;
        color: white;
      }

      .door-3d-active .flickity-viewport {
        visibility: hidden;
      }

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

           /* 3D fullscreen mode expands container and shows iframe */
      .door-3d-fullscreen {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 10000000000000 !important;
        background: #fff;
        overflow: hidden;
      }
      .door-3d-fullscreen #door-3d-iframe {
        display: block;
        width: 100%;
        height: 100%;
      }
    `;

    document.head.appendChild(style);

    galleryWrapper.style.position = "relative";

    // ── UI ──────────────────────────────────────────────────────────
    const toggle = document.createElement("div");
    toggle.className = "door-toggle";

    toggle.innerHTML = `
      <button data-mode="2d" class="active">
        <span class="material-symbols-outlined">image</span>
        2D
      </button>

      <button data-mode="3d">
      <span class="material-symbols-outlined">deployed_code</span>
        3D
      </button>

      <button data-mode="3d_fullscreen">
        <span class="material-symbols-outlined">view_in_ar</span> Iframe
      </button>
    `;
    galleryWrapper.appendChild(toggle);

    const iframeEl = document.createElement("iframe");
    iframeEl.id = "door-3d-iframe";
    iframeEl.setAttribute("allowfullscreen", "true");
    galleryWrapper.appendChild(iframeEl);

    // ── STATE ───────────────────────────────────────────────────────
    let viewMode = "2d";
    let iframeLoaded = false;
    let iframeReady = false; // 🔥 NEW
    let lastOptions = null;
    let debounceTimer = null;

    // ── LISTEN FOR IFRAME READY ─────────────────────────────────────
    window.addEventListener("message", (event) => {
      if (event.data?.type === "IFRAME_READY") {
        console.log("[DoorConfigurator] iframe ready");
        iframeReady = true;
        sendOptions("iframe ready handshake");
      }
    });

    // ── UI UPDATE ───────────────────────────────────────────────────
    function updateUI() {
      // Update toggle button states
      toggle.querySelectorAll("button").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.mode === viewMode);
      });

      const fullscreenWrapperClass = "door-3d-fullscreen";

      if (viewMode === "3d") {
        // Normal 3D view inside gallery
        galleryWrapper.classList.add("door-3d-active");
        galleryWrapper.classList.remove(fullscreenWrapperClass);

        // Ensure iframe is inside galleryWrapper
        if (iframeEl.parentElement !== galleryWrapper) {
          galleryWrapper.prepend(iframeEl);
        }

        // Move galleryWrapper back to its original parent as first child
        if (galleryWrapper.parentElement !== galleryWrapperParent) {
          galleryWrapperParent.prepend(galleryWrapper);
        }

        if (!iframeLoaded) {
          iframeEl.src = IFRAME_3D_URL;
          iframeLoaded = true;
        } else if (iframeReady) {
          debouncedSend("3D reopen");
        }
      } else if (viewMode === "3d_fullscreen") {
        // Fullscreen mode → move galleryWrapper to body
        galleryWrapper.classList.add("door-3d-active");
        galleryWrapper.classList.add(fullscreenWrapperClass);

        // Move galleryWrapper directly under body as first child
        if (galleryWrapper.parentElement !== document.body) {
          document.body.prepend(galleryWrapper);
        }

        if (!iframeLoaded) {
          iframeEl.src = IFRAME_3D_URL;
          iframeLoaded = true;
        } else if (iframeReady) {
          debouncedSend("3D fullscreen reopen");
        }
      } else {
        // 2D mode
        galleryWrapper.classList.remove("door-3d-active");
        galleryWrapper.classList.remove(fullscreenWrapperClass);

        // Ensure iframe is inside galleryWrapper
        if (iframeEl.parentElement !== galleryWrapper) {
          galleryWrapper.prepend(iframeEl);
        }

        // Move galleryWrapper back to its original parent as first child
        if (galleryWrapper.parentElement !== galleryWrapperParent) {
          galleryWrapperParent.prepend(galleryWrapper);
        }
      }
    }
    // ── TOGGLE CLICK ────────────────────────────────────────────────
    toggle.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      viewMode = btn.dataset.mode;
      updateUI();

      console.log("[DoorConfigurator] viewMode:", viewMode);

      if (iframeLoaded && iframeEl.contentWindow) {
        iframeEl.contentWindow.postMessage(
          { type: "VIEW_MODE_CHANGE", mode: viewMode },
          "*",
        );
      }
    });

    // ── COLLECT OPTIONS ─────────────────────────────────────────────
    function collectOptions() {
      const containers = document.querySelectorAll(
        `${OPTIONS_SELECTOR} div.tc-container:not(.tc-hidden)`,
      );

      const result = {};

      containers.forEach((container, index) => {
        const labelEl = container.querySelector(".tc-epo-element-label-text");
        let label = labelEl?.textContent?.trim() || `Field_${index}`;
        label = label.replace(/:$/, "").trim();

        const select = container.querySelector("select");
        const input = container.querySelector("input:checked");
        const value = select?.value || input?.value || null;

        if (value !== null && value !== "") {
          const finalKey = result[label] ? `${label}_${index}` : label;
          result[finalKey] = value;
        }
      });

      return result;
    }

    // ── SEND OPTIONS ────────────────────────────────────────────────
    function sendOptions(reason) {
      if (!iframeLoaded || !iframeReady || !iframeEl.contentWindow) return;

      const options = collectOptions();
      const serialised = JSON.stringify(options);

      if (serialised === JSON.stringify(lastOptions)) return;

      lastOptions = options;

      console.log("[DoorConfigurator] send:", reason, options);

      iframeEl.contentWindow.postMessage(
        { type: "DOOR_OPTIONS", options },
        "*",
      );
    }

    function debouncedSend(reason) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => sendOptions(reason), 100);
    }

    // ── WATCH OPTIONS ───────────────────────────────────────────────
    const optionsContainer = document.querySelector(OPTIONS_SELECTOR);

    if (optionsContainer) {
      optionsContainer.addEventListener("change", () =>
        debouncedSend("change"),
      );
      optionsContainer.addEventListener("input", () => debouncedSend("input"));

      const observer = new MutationObserver(() => debouncedSend("DOM mutated"));

      observer.observe(optionsContainer, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
})();
