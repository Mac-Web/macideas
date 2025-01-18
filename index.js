document.addEventListener("DOMContentLoaded", function () {
  const bar = document.getElementById("sidebar");
  const helpMenuItems = document.getElementById("cats");
  const helpMenu = document.getElementById("help-menu");
  const helpCaret = document.getElementById("caret");
  let helpOpen = false;
  document.addEventListener("click", function () {
    bar.classList.remove("movingbar");
  });
  document.addEventListener("mousemove", function (event) {
    if (event.clientX <= 5 && bar.classList.contains("movingbar") !== true) {
      bar.classList.add("movingbar");
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("help-menu")) {
      helpMenuItems.style.transform = "scaleY(0)";
      helpMenu.removeAttribute("style");
      helpCaret.removeAttribute("style");
      helpOpen = false;
    }
  });
  helpMenu.addEventListener("click", () => {
    if (helpOpen === false) {
      helpMenuItems.style.transform = "scaleY(1)";
      helpMenu.style.backgroundColor = "rgba(15, 15, 15, 0.8)";
      helpCaret.style.transform = "rotate(0deg)";
      helpOpen = true;
    } else {
      helpMenuItems.style.transform = "scaleY(0)";
      helpMenu.removeAttribute("style");
      helpCaret.removeAttribute("style");
      helpOpen = false;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let updateModal = document.querySelector(".modal-background");
  document.addEventListener("click", (e) => {
    if (e.target === updateModal) {
      e.target.style.display = "none";
      localStorage.setItem("macideasmodal", "true");
    }
  });
});
