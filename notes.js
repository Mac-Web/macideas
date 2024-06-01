document.addEventListener("DOMContentLoaded", function () {
  const bar = document.getElementById("sidebar");
  const overflowMenu = document.getElementById("overflow-menu");
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
});

document.addEventListener("DOMContentLoaded", function () {
  const note = document.querySelectorAll(".note");
  const noteContainer = document.querySelector(".note-container");
  note.forEach(function (element) {
    element.addEventListener("click", function () {
      note.forEach(function (element) {
        element.style.display = "none";
      });
      const textarea = document.createElement("textarea");
      const saveBtn = document.createElement("button");
      const bar = document.createElement("div");
      const bold = document.createElement("button");
      bold.classList.add("tool");
      bar.classList.add("tool-bar");
      textarea.classList.add("textarea");
      saveBtn.classList.add("save-button");
      saveBtn.innerHTML = "Save Note";
      bold.innerHTML = "Bold";
      bold.id = "bold";
      noteContainer.appendChild(textarea);
      if (localStorage.getItem("bold") === "yes") {
        textarea.style.fontWeight = "bold";
        bold.innerHTML = "Unbold";
      } else {
        textarea.style.fontWeight = "normal";
      }
      noteContainer.appendChild(bar);
      bar.appendChild(saveBtn);
      bar.appendChild(bold);
      textarea.value = localStorage.getItem("note");
      saveBtn.addEventListener("click", saveNote);
      bold.addEventListener("click", bolding);
    });
  });

  function saveNote() {
    const textarea = noteContainer.querySelector(".textarea");
    let value = textarea.value;
    localStorage.setItem("note", value);
  }

  function bolding() {
    const textarea = noteContainer.querySelector(".textarea");
    const bold = document.getElementById("bold");
    if (textarea.style.fontWeight === "bold") {
      textarea.style.fontWeight = "normal";
      bold.innerHTML = "Bold";
      localStorage.setItem("bold", "no");
    } else {
      textarea.style.fontWeight = "bold";
      bold.innerHTML = "Unbold";
      localStorage.setItem("bold", "yes");
    }
  }
});
