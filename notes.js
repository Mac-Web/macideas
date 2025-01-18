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
  const options = document.querySelectorAll(".options");
  const optionMenu = document.getElementById("opmenu");
  const opEdit = document.getElementById("opedit");
  const opDelete = document.getElementById("opdelete");
  const noteContainer = document.querySelector(".note-container");
  const textarea = document.querySelector(".textarea");
  const statusMessage = document.getElementById("status");
  let ogstring = window.getComputedStyle(textarea);
  let ogsize = ogstring.getPropertyValue("font-size");
  const size = document.getElementById("fontsize");
  if (localStorage.getItem("note")) {
    textarea.innerHTML = localStorage.getItem("note");
  }
  if (localStorage.getItem("notesize")) {
    textarea.style.fontSize = localStorage.getItem("notesize");
    size.value = localStorage
      .getItem("notesize")
      .substring(0, localStorage.getItem("notesize").length - 2);
  }
  options.forEach((option) => {
    let parentName = option.parentElement.querySelector("#name");
    let optionparentName = localStorage.getItem("notename");
    if (optionparentName) {
      parentName.innerText = optionparentName;
    }
    option.addEventListener("click", (e) => {
      let y = e.clientY;
      optionMenu.style.top = y - 50 + "px";
      optionMenu.style.visibility = "visible";
      opEdit.addEventListener("click", () => {
        parentName.setAttribute("contenteditable", true);
        parentName.focus();
        window.setTimeout(function () {
          let sel, range;
          if (window.getSelection && document.createRange) {
            range = document.createRange();
            range.selectNodeContents(parentName);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          } else if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(parentName);
            range.select();
          }
        }, 1);
      });
      parentName.addEventListener("blur", () => {
        if (parentName.innerText.trim().length == 0) {
          parentName.innerText = "Untitled Note";
          parentName.setAttribute("contenteditable", false);
          localStorage.setItem("notename", parentName.innerText);
        } else {
          parentName.setAttribute("contenteditable", false);
          localStorage.setItem("notename", parentName.innerText);
        }
      });
      opDelete.addEventListener("click", () => {
        if (
          confirm(
            "Are you sure you want to delete this note? All the text will be permenantly deleted."
          )
        ) {
          option.parentElement.style.display = "none";
        }
      });
      parentName.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
          parentName.blur();
          parentName.setAttribute("contenteditable", false);
        }
      });
    });
    document.addEventListener("click", (e) => {
      if (e.target !== optionMenu && e.target !== option) {
        optionMenu.style.visibility = "hidden";
      }
    });
  });

  let saving = setInterval(() => {
    saveNote();
  }, 10000);

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 83 && e.ctrlKey) {
      e.preventDefault();
      saveNote();
    }
  });

  function saveNote() {
    const value = noteContainer.querySelector(".textarea").innerHTML;
    let ogstring = window.getComputedStyle(textarea);
    let ogsize = ogstring.getPropertyValue("font-size");
    localStorage.setItem("note", value);
    localStorage.setItem("notesize", ogsize);
    statusMessage.style.opacity = "1";
    setTimeout(() => {
      statusMessage.style.opacity = "0";
    }, 1500);
  }

  const bigger = document.getElementById("bigger");
  const smaller = document.getElementById("smaller");
  bigger.addEventListener("click", () => {
    let ogstring = window.getComputedStyle(textarea);
    let ogsize = ogstring.getPropertyValue("font-size");
    let newsize = parseInt(ogsize) + 5;
    size.value = newsize;
    textarea.style.fontSize = newsize + "px";
  });
  smaller.addEventListener("click", () => {
    let ogstring = window.getComputedStyle(textarea);
    let ogsize = ogstring.getPropertyValue("font-size");
    let newsize = parseInt(ogsize) - 5;
    size.value = newsize;
    textarea.style.fontSize = newsize + "px";
  });
  size.addEventListener("click", () => {
    size.focus();
  });
  size.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      size.blur();
    }
  });
  size.addEventListener("blur", () => {
    textarea.style.fontSize = size.value + "px";
  });
});

function toggleBold() {
  document.execCommand("bold");
}

function toggleItalic() {
  document.execCommand("italic");
}

function toggleUnderline() {
  document.execCommand("underline");
}

function toggleStrike() {
  document.execCommand("strikethrough");
}
