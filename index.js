document.addEventListener("DOMContentLoaded", function () {
  const bar = document.getElementById("sidebar");
  const overflowMenu = document.getElementById("overflow-menu");
  const close = document.getElementById("closea");
  document.addEventListener("click", function () {
    bar.classList.remove("movingbar");
  });
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("shoot")) {
      overflowMenu.classList.add("menu-slide");
    } else {
      overflowMenu.classList.remove("menu-slide");
    }
  });
  document.addEventListener("mousemove", function (event) {
    if (event.clientX <= 5 && bar.classList.contains("movingbar") !== true) {
      bar.classList.add("movingbar");
    }
  });
  close.addEventListener("click", function () {
    close.parentElement.parentElement.style.display = "none";
    localStorage.setItem("macideascloseeee", "closed");
  });
});
