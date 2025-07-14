let zIndexCounter = 10;

document.addEventListener("DOMContentLoaded", () => {
  const windows = document.querySelectorAll(".window");

  windows.forEach((win) => {
    // Affichage progressif (effet "boot Windows")
    const delay = parseInt(win.dataset.delay || 0);
    setTimeout(() => {
      win.classList.add("show");
      win.style.zIndex = zIndexCounter++;
    }, delay);

    // Focus (au clic sur la fenêtre → passe au premier plan)
    win.addEventListener("mousedown", () => {
      win.style.zIndex = zIndexCounter++;
    });

    // Gestion de la fermeture (croix)
    const closeBtn = win.querySelector(".close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // ✅ évite le drag
        win.classList.remove("show"); // ✅ ferme la fenêtre
      });
    }

    // Drag & Drop
    const header = win.querySelector(".window-header");
    if (header) {
      let offsetX = 0;
      let offsetY = 0;
      let isDragging = false;

      header.style.cursor = "grab";

      header.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        win.style.zIndex = zIndexCounter++;
        header.style.cursor = "grabbing";
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
        header.style.cursor = "grab";
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        win.style.left = `${e.clientX - offsetX}px`;
        win.style.top = `${e.clientY - offsetY}px`;
      });
    }
  });

  // Menu démarrer toggle
  const startButton = document.getElementById("start-button");
  const startMenu = document.getElementById("start-menu");

  if (startButton && startMenu) {
    startButton.addEventListener("click", () => {
      startMenu.classList.toggle("visible");
      startMenu.classList.remove("hidden"); // ← ça enlève la classe cachée
    });

    document.addEventListener("click", (e) => {
      if (!startMenu.contains(e.target) && e.target !== startButton) {
        startMenu.classList.remove("visible");
        startMenu.classList.add("hidden"); // ← on remet la classe cachée
      }
    });
  }

  // Bouton "Réouvrir tout" dans le menu démarrer
  const reopenAllBtn = document.getElementById("reopen-all");
  if (reopenAllBtn) {
    reopenAllBtn.addEventListener("click", () => {
      windows.forEach((win, i) => {
        setTimeout(() => {
          win.classList.remove("hidden"); // ← enlève la classe bloquante
          win.classList.add("show");
          win.style.zIndex = zIndexCounter++;
        }, parseInt(win.dataset.delay || 0));
      });
    });
  }

  function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    clock.textContent = `${hours}:${minutes}`;
  }

  updateClock();
  setInterval(updateClock, 1000);

  // Gestion de l'ouverture des fenêtres via le menu démarrer
  const menuItems = document.querySelectorAll("#start-menu li[data-target]");
  menuItems.forEach((item) => {
    const targetId = item.dataset.target;
    item.addEventListener("click", () => {
      const win = document.querySelector(`.window[data-id="${targetId}"]`);
      if (win) {
        win.classList.remove("hidden"); // ← ajoute ceci
        win.classList.add("show");
        win.style.zIndex = zIndexCounter++;
      }
    });
  });
});
