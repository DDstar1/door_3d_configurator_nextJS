(function DoorConfiguratorEmbed() {
  function main() {
    const GALLERY_WRAPPER_SELECTOR = ".product-images";
    const OPTIONS_SELECTOR = "#tm-extra-product-options-fields";
    const IFRAME_3D_URL =
      "https://door-3d-configurator.vercel.app/paultec_alba/embed_alba_iframe";

    // ── FONT LINKS ──────────────────────────────────────────────────
    [
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=deployed_code",
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=image",
    ].forEach((href) => {
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = href;
      document.head.appendChild(l);
    });

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0";
    document.head.appendChild(fontLink);

    const galleryWrapper = document.querySelector(GALLERY_WRAPPER_SELECTOR);
    if (!galleryWrapper) {
      console.warn("[DoorConfigurator] Gallery wrapper not found");
      return;
    }

    // ── FULLSCREEN OVERLAY (created once, reused) ───────────────────
    const FULL_3D_SCREEN_WRAPPER = document.createElement("div");
    FULL_3D_SCREEN_WRAPPER.classList.add("door-3d-fullscreen-overlay");
    FULL_3D_SCREEN_WRAPPER.style.display = "none";
    document.body.appendChild(FULL_3D_SCREEN_WRAPPER);

    // ── STYLES ──────────────────────────────────────────────────────
    const style = document.createElement("style");
    style.innerHTML = `
      .door-toggle {
        position: absolute; top: 12px; left: 12px; z-index: 10001;
        display: flex; border: 1px solid #e5e7eb; border-radius: 6px;
        overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        font-family: sans-serif; height: 40px;
      }
      .door-toggle button {
        display: flex; align-items: center; gap: 6px;
        padding: 6px 10px; font-size: 13px; cursor: pointer;
        border: none; background: white; color: #555; height: 100%;
      }
      .door-toggle button:hover:not(.active) { background: #fca5a5; }
      .door-toggle .active { background: #7f1d1d; color: white; }

      .door-3d-active .flickity-viewport { visibility: hidden; }

      #door-3d-iframe {
        display: none; position: absolute; top: 0; left: 0;
        width: 100%; height: 100%; border: none; z-index: 10000;
      }
      .door-3d-active #door-3d-iframe { display: block; }

      /* Fullscreen overlay — sits over everything */
      .door-3d-fullscreen-overlay {
        position: fixed; top: 0; left: 0;
        width: 100vw; height: 100vh;
        z-index: 2147483647;
        background: #fff; overflow: hidden;
      }
      .door-3d-fullscreen-overlay #door-3d-iframe {
        display: block; position: absolute;
        top: 0; left: 0; width: 100%; height: 100%; border: none;
      }
      .door-3d-fullscreen-overlay .door-toggle {
        z-index: 2147483647;
      }
    `;
    document.head.appendChild(style);

    galleryWrapper.style.position = "relative";

    // ── UI ──────────────────────────────────────────────────────────
    const toggle = document.createElement("div");
    toggle.className = "door-toggle";
    toggle.innerHTML = `
      
        image2D
      
      
        deployed_code3D
      
      
        view_in_arFullscreen
      
    `;
    galleryWrapper.appendChild(toggle);

    const iframeEl = document.createElement("iframe");
    iframeEl.id = "door-3d-iframe";
    iframeEl.setAttribute("allowfullscreen", "true");
    // iframe lives in galleryWrapper permanently — we MOVE the wrapper
    galleryWrapper.appendChild(iframeEl);

    // ── STATE ───────────────────────────────────────────────────────
    let viewMode = "2d";
    let iframeLoaded = false;
    let iframeReady = false;
    let lastOptions = null;
    let debounceTimer = null;

    // ── IFRAME READY HANDSHAKE ──────────────────────────────────────
    window.addEventListener("message", (event) => {
      if (event.data?.type === "IFRAME_READY") {
        console.log("[DoorConfigurator] iframe ready");
        iframeReady = true;
        sendOptions("iframe ready handshake");
      }
    });

    // ── LOAD IFRAME (once) ──────────────────────────────────────────
    function ensureIframeLoaded() {
      if (!iframeLoaded) {
        iframeEl.src = IFRAME_3D_URL;
        iframeLoaded = true;
      }
    }

    // ── UI UPDATE ───────────────────────────────────────────────────
    function updateUI() {
      toggle.querySelectorAll("button").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.mode === viewMode);
      });

      if (viewMode === "3d_fullscreen") {
        console.log("[DoorConfigurator] Switching to 3D Fullscreen view");

        // Move galleryWrapper (with the real iframe inside) into overlay
        FULL_3D_SCREEN_WRAPPER.appendChild(galleryWrapper);
        FULL_3D_SCREEN_WRAPPER.style.display = "block";
        galleryWrapper.classList.add("door-3d-active");
        ensureIframeLoaded();
        if (iframeReady) debouncedSend("3D fullscreen open");
      } else if (viewMode === "3d") {
        console.log("[DoorConfigurator] Switching to 3D view");
        // If coming from fullscreen, move galleryWrapper back first
        if (FULL_3D_SCREEN_WRAPPER.contains(galleryWrapper)) {
          // Re-insert before the overlay in DOM order
          document
            .querySelector(".product-images-placeholder")
            ?.replaceWith(galleryWrapper) ??
            FULL_3D_SCREEN_WRAPPER.before(galleryWrapper);
        }
        FULL_3D_SCREEN_WRAPPER.style.display = "none";
        galleryWrapper.classList.add("door-3d-active");
        ensureIframeLoaded();
        if (iframeReady) debouncedSend("3D open");
      } else {
        console.log("[DoorConfigurator] Switching to 2D view");

        // 2D — restore gallery to original position if needed
        if (FULL_3D_SCREEN_WRAPPER.contains(galleryWrapper)) {
          FULL_3D_SCREEN_WRAPPER.before(galleryWrapper);
        }
        FULL_3D_SCREEN_WRAPPER.style.display = "none";
        galleryWrapper.classList.remove("door-3d-active");
      }
    }

    // ── TOGGLE CLICK ────────────────────────────────────────────────
    // Use event delegation on document so clicks work even after
    // galleryWrapper is reparented into the overlay
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".door-toggle button");
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
        let label = (labelEl?.textContent?.trim() || `Field_${index}`)
          .replace(/:$/, "")
          .trim();
        const select = container.querySelector("select");
        const input = container.querySelector("input:checked");
        const value = select?.value || input?.value || null;
        if (value !== null && value !== "") {
          result[result[label] ? `${label}_${index}` : label] = value;
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
      new MutationObserver(() => debouncedSend("DOM mutated")).observe(
        optionsContainer,
        {
          subtree: true,
          childList: true,
          attributes: true,
          attributeFilter: ["class", "style"],
        },
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
})();
