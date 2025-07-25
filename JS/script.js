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
    const closeBtns = win.querySelectorAll(".close-btn");
    closeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        win.classList.remove("show");
      });
    });

    // Drag & Drop souris et tactile avec pointer events
    const header = win.querySelector(".window-header");
    if (header) {
      let offsetX = 0;
      let offsetY = 0;
      let isDragging = false;

      header.style.cursor = "grab";
      header.style.touchAction = "none";

      const onPointerMove = (e) => {
        if (!isDragging) return;
        win.style.left = `${e.clientX - offsetX}px`;
        win.style.top = `${e.clientY - offsetY}px`;
      };

      const onPointerUp = () => {
        if (!isDragging) return;
        isDragging = false;
        header.style.cursor = "grab";
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      };

      header.addEventListener("pointerdown", (e) => {
        isDragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        win.style.zIndex = zIndexCounter++;
        header.style.cursor = "grabbing";

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
      });
    }
  });

  const startButton = document.getElementById("start-button");
  const startMenu = document.getElementById("start-menu");

  if (startButton && startMenu) {
    startButton.addEventListener("click", () => {
      startMenu.classList.toggle("visible");
      startMenu.classList.remove("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!startMenu.contains(e.target) && e.target !== startButton) {
        startMenu.classList.remove("visible");
        startMenu.classList.add("hidden");
      }
    });
  }

  const reopenAllBtn = document.getElementById("reopen-all");
  if (reopenAllBtn) {
    reopenAllBtn.addEventListener("click", () => {
      windows.forEach((win) => {
        setTimeout(() => {
          win.classList.remove("hidden");
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

  const menuItems = document.querySelectorAll("#start-menu li[data-target]");
  menuItems.forEach((item) => {
    const targetId = item.dataset.target;
    item.addEventListener("click", () => {
      const win = document.querySelector(`.window[data-id="${targetId}"]`);
      if (win) {
        win.classList.remove("hidden");
        win.classList.add("show");
        win.style.zIndex = zIndexCounter++;
      }
    });
  });
});
