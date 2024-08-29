document.addEventListener("DOMContentLoaded", function () {
  const bar = document.getElementById("sidebare");
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
    if (event.clientX <= 5 && !bar.classList.contains("movingbar")) {
      bar.classList.add("movingbar");
    }
  });
});

const canvas = document.getElementById("canvas");
const clear = document.getElementById("clear");
const colorLabel = document.getElementById("color-label");
const ctx = canvas.getContext("2d");
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
let isPainting = false;
let width = 5;
let startX;
let startY;
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

const options = document.querySelectorAll(".options");
const optionMenu = document.getElementById("opmenu");
const opEdit = document.getElementById("opedit");
const opDelete = document.getElementById("opdelete");
const size = document.getElementById("width");
if (localStorage.getItem("drawingsWidth")) {
  width = parseInt(localStorage.getItem("drawingsWidth"));
  size.value = localStorage.getItem("drawingsWidth");
}
options.forEach((option) => {
  let parentName = option.parentElement.querySelector("#name");
  let optionparentName = localStorage.getItem("drawingname");
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
        parentName.innerText = "Untitled Drawing";
        parentName.setAttribute("contenteditable", false);
        localStorage.setItem("drawingname", parentName.innerText);
      } else {
        parentName.setAttribute("contenteditable", false);
        localStorage.setItem("drawingname", parentName.innerText);
      }
    });
    opDelete.addEventListener("click", () => {
      if (
        confirm(
          "Are you sure you want to delete this drawing? Everything on it will be permenantly deleted."
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

const bigger = document.getElementById("bigger");
const smaller = document.getElementById("smaller");
console.log(bigger, smaller);
bigger.addEventListener("click", () => {
  width += 2;
  size.value = width;
  localStorage.setItem("drawingsWidth", width);
});
smaller.addEventListener("click", () => {
  width -= 2;
  size.value = width;
  localStorage.setItem("drawingsWidth", width);
});
size.addEventListener("click", () => {
  size.focus();
});
size.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    size.blur();
    width = parseInt(size.value);
    localStorage.setItem("drawingsWidth", width);
  }
});

document.getElementById("color").onchange = function () {
  colorLabel.style.backgroundColor = document.getElementById("color").value;
};

clear.addEventListener("click", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

const draw = (e) => {
  if (!isPainting) {
    return;
  }
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
  ctx.stroke();
};

canvas.addEventListener("mousedown", (e) => {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
  ctx.strokeStyle = document.getElementById("color").value;
});

canvas.addEventListener("mousemove", draw);

canvas.addEventListener("mouseup", (e) => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});
