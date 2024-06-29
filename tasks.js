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
/*
document.addEventListener("DOMContentLoaded", () => {
  const text = document.getElementById("text");
  const form = document.getElementById("form");
  const list = document.getElementById("list");
  text.focus();
  if (localStorage.simpleToDo) {
    let storedItems = localStorage.simpleToDo.split(
      "skibidiskibidiskibidiskibidi"
    );
    storedItems.forEach((itemText) => {
      createListItem(itemText);
    });
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (text.value.trim() !== "") {
      createListItem(text.value);
      saveToLocalStorage(text.value);
      text.value = "";
    } else {
      alert("Please enter something in the input field!");
    }
  });
  list.addEventListener("click", (e) => {
    if (e.target.classList.contains("close")) {
      let listItem = e.target.parentElement;
      listItem.classList.add("animate");
      listItem.addEventListener("animationend", () => {
        listItem.style.display = "none";
        let actuall = listItem.querySelector(".actual");
        removeFromLocalStorage(actuall.getAttribute("data-name"));
      });
    } else if (e.target.classList.contains("fav")) {
      let listItem = e.target.parentElement;
      if (e.target.src.includes("star-regular.svg")) {
        e.target.src = "icons/star-solid.svg";
        let favorites = localStorage.getItem("simpleToDoFavorites")
          ? localStorage.getItem("simpleToDoFavorites").split("computer")
          : [];
        let actualll = listItem.querySelector(".actual");
        favorites.push(actualll.getAttribute("data-name"));
        localStorage.setItem("simpleToDoFavorites", favorites.join("computer"));
      } else {
        e.target.src = "icons/star-regular.svg";
        let favorites = localStorage.getItem("simpleToDoFavorites")
          ? localStorage.getItem("simpleToDoFavorites").split("computer")
          : [];
        const index = favorites.indexOf(
          listItem.querySelector(".actual").getAttribute("data-name")
        );
        if (index !== -1) {
          favorites.splice(index, 1);
          localStorage.setItem(
            "simpleToDoFavorites",
            favorites.join("computer")
          );
        }
      }
    }
  });

  function createListItem(itemText) {
    let newItem = document.createElement("li");
    let actualText = document.createElement("div");
    actualText.innerHTML = itemText;
    actualText.classList.add("actual");
    newItem.innerHTML =
      newItem.innerHTML +
      `<img src="icons/star-regular.svg" class="fav"><img src="icons/trash-solid.svg" class="close">`;
    newItem.classList.add("li");
    let starr = newItem.querySelector(".fav");
    if (localStorage.getItem("simpleToDoFavorites")) {
      let favoritess = localStorage
        .getItem("simpleToDoFavorites")
        .split("computer");
      favoritess.forEach((favorit) => {
        if (favorit === itemText) {
          starr.src = "icons/star-solid.svg";
        }
      });
    }
    actualText.addEventListener("dblclick", (e) => {
      let ogTextt = actualText.innerHTML;
      actualText.contentEditable = true;
      actualText.focus();
      actualText.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          blurry(actualText.innerHTML, ogTextt, actualText);
          return;
        }
      });
    });
    actualText.addEventListener("blur", () => {
      blurry(actualText.innerHTML, itemText, actualText);
      return;
    });
    actualText.setAttribute("data-name", itemText);
    list.appendChild(newItem);
    newItem.appendChild(actualText);
  }

  function saveToLocalStorage(itemText) {
    let storedData = localStorage.getItem("simpleToDo");
    if (storedData) {
      let dataArray = storedData.split("skibidiskibidiskibidiskibidi");
      dataArray.push(itemText);
      localStorage.setItem(
        "simpleToDo",
        dataArray.join("skibidiskibidiskibidiskibidi")
      );
    } else {
      localStorage.setItem("simpleToDo", itemText);
    }
  }

  function removeFromLocalStorage(itemText) {
    let storedData = localStorage.getItem("simpleToDo");
    if (storedData) {
      let dataArray = storedData.split("skibidiskibidiskibidiskibidi");
      let index = dataArray.indexOf(itemText);
      if (index !== -1) {
        dataArray.splice(index, 1);
        localStorage.setItem(
          "simpleToDo",
          dataArray.join("skibidiskibidiskibidiskibidi")
        );
      }
    }
  }

  function blurry(editedText, ogText, ogElement) {
    ogElement.contentEditable = false;
    ogElement.blur();
    ogElement.setAttribute("data-name", editedText);
    ogElement.innerHTML = editedText;
    let storedData = localStorage.getItem("simpleToDo");
    if (storedData) {
      let dataArray = storedData.split("skibidiskibidiskibidiskibidi");
      let index = dataArray.indexOf(ogText);
      if (index !== -1) {
        dataArray[index] = editedText;
        localStorage.setItem(
          "simpleToDo",
          dataArray.join("skibidiskibidiskibidiskibidi")
        );
      }
    }
  }
});
*/
document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("task-input");
  const saveTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const audio = document.getElementById("ding");
  const taskstorage = JSON.parse(localStorage.getItem("tasks"));
  let randomArray = [];
  if (taskstorage) {
    checkNoTask(taskstorage);
  } else {
    checkNoTask(randomArray);
  }
  saveTaskBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
      const taskItem = document.createElement("li");
      const edit = document.createElement("span");
      const remove = document.createElement("span");
      const complete = document.createElement("span");
      remove.classList.add("remove");
      remove.innerHTML =
        '<i class="fa-solid fa-trash" style="color: #ffffff;"></i>';
      edit.classList.add("edit");
      edit.innerHTML =
        '<i class="fa-solid fa-pen" style="color: #ffffff;"></i>';
      complete.classList.add("complete");
      complete.innerHTML =
        '<i class="fa-regular fa-circle" style="color: #ffffff;"></i>';
      taskItem.innerHTML = taskText;
      taskItem.setAttribute("data-task", taskText);
      let notask = taskList.querySelector("#notask");
      if (notask) {
        notask.style.display = "none";
      }
      taskList.appendChild(taskItem);
      taskItem.appendChild(remove);
      taskItem.appendChild(edit);
      taskItem.appendChild(complete);
      todoInput.value = "";

      saveTasksToStorage();
      const completeIcons = document.querySelectorAll(".complete");
      completeIcons.forEach((icon) => {
        console.log(icon);
        icon.addEventListener("mouseenter", () => {
          console.log("entering")
          icon.innerHTML =
            '<i class="fa-regular fa-circle-check" style="color: #ffffff;"></i>';
        });
        icon.addEventListener("mouseleave", () => {
          console.log("leaving")
          icon.innerHTML =
            '<i class="fa-regular fa-circle" style="color: #ffffff;"></i>';
        });
      });
    }
  });

  taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("fa-trash")) {
      const taskItem = event.target.closest("li");
      taskList.removeChild(taskItem);
      const taskText = taskItem.getAttribute("data-task");
      removeTaskFromStorage(taskText);
    }
    if (event.target.classList.contains("fa-pen")) {
      const taskItem = event.target.closest("li");
      const remove = taskItem.querySelector(".fa-trash");
      const edit = taskItem.querySelector(".fa-pen");
      const complete = taskItem.querySelector(".fa-circle");
      remove.style.visibility = "hidden";
      edit.style.visibility = "hidden";
      complete.style.visibility = "hidden";
      taskItem.visibility = "visible";
      taskItem.setAttribute("contenteditable", true);
      taskItem.focus();
      taskItem.classList.add("editing");
      taskItem.addEventListener("blur", function () {
        if (taskItem.classList.contains("editing")) {
          taskItem.setAttribute("contenteditable", false);
          const taskText2 = this.innerText;
          taskItem.setAttribute("data-task", taskText2);
          taskItem.classList.remove("editing");
          const edit = document.createElement("span");
          const remove = document.createElement("span");
          const complete = document.createElement("span");

          remove.classList.add("remove");
          remove.innerHTML =
            '<i class="fa-solid fa-trash" style="color: #ffffff;"></i>';
          edit.classList.add("edit");
          edit.innerHTML =
            '<i class="fa-solid fa-pen" style="color: #ffffff;"></i>';
          complete.classList.add("complete");
          complete.innerHTML =
            '<i class="fa-regular fa-circle" style="color: #ffffff;"></i>';
          taskItem.innerHTML = taskText2;

          taskList.appendChild(taskItem);
          taskItem.appendChild(remove);
          taskItem.appendChild(edit);
          taskItem.appendChild(complete);

          saveTasksToStorage();
        }
      });
    }
    if (event.target.classList.contains("fa-circle-check")) {
      audio.play();
      const taskItem = event.target.closest("li");
      taskList.removeChild(taskItem);
      const taskText = taskItem.getAttribute("data-task");
      removeTaskFromStorage(taskText);
    }
  });

  function removeTaskFromStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndexToDelete = tasks.findIndex((task) => task === taskText);
    if (taskIndexToDelete !== -1) {
      tasks.splice(taskIndexToDelete, 1);
      checkNoTask(tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  function loadTasksFromStorage() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((taskText) => {
      const taskItem = document.createElement("li");
      const edit = document.createElement("span");
      const remove = document.createElement("span");
      const complete = document.createElement("span");

      remove.classList.add("remove");
      remove.innerHTML =
        '<i class="fa-solid fa-trash" style="color: #ffffff;"></i>';
      edit.classList.add("edit");
      edit.innerHTML =
        '<i class="fa-solid fa-pen" style="color: #ffffff;"></i>';
      complete.classList.add("complete");
      complete.innerHTML =
        '<i class="fa-regular fa-circle" style="color: #ffffff;"></i>';
      taskItem.innerHTML = taskText;
      taskItem.setAttribute("data-task", taskText);

      taskList.appendChild(taskItem);
      taskItem.appendChild(remove);
      taskItem.appendChild(edit);
      taskItem.appendChild(complete);
      taskItem.setAttribute("draggable", true);
    });const completeIcons = document.querySelectorAll(".complete");
    completeIcons.forEach((icon) => {
      console.log(icon);
      icon.addEventListener("mouseenter", () => {
        console.log("entering")
        icon.innerHTML =
          '<i class="fa-regular fa-circle-check" style="color: #ffffff;"></i>';
      });
      icon.addEventListener("mouseleave", () => {
        console.log("leaving")
        icon.innerHTML =
          '<i class="fa-regular fa-circle" style="color: #ffffff;"></i>';
      });
    });
  }

  function saveTasksToStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll("#task-list li");
    taskItems.forEach((taskItem) =>
      tasks.push(taskItem.getAttribute("data-task"))
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  loadTasksFromStorage();
  const list = document.getElementById("task-list");
  let draggedItem = null;
  let placeholder = document.createElement("div");
  placeholder.classList.add("placeholder");

  list.addEventListener("dragstart", (event) => {
    draggedItem = event.target;
    draggedItem.classList.add("none");
  });

  list.addEventListener("dragover", (event) => {
    event.preventDefault();
    if (event.target.tagName === "LI" && event.target !== draggedItem) {
      const rect = event.target.getBoundingClientRect();
      const mouseY = event.clientY;
      const aboveTarget = mouseY < rect.top + rect.height / 2;

      if (placeholder.parentNode === list) {
        list.removeChild(placeholder);
      }
      event.currentTarget.classList.add("dragging");

      if (aboveTarget) {
        list.insertBefore(placeholder, event.target);
      } else {
        list.insertBefore(placeholder, event.target.nextSibling);
      }
    } else {
      list.removeChild(placeholder);
    }
  });

  list.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.tagName === "LI" && event.target !== draggedItem) {
      if (placeholder.parentNode === list) {
        list.removeChild(placeholder);
      }
      draggedItem.classList.remove("none");
      draggedItem.classList.remove("dragging");
      const rect = event.target.getBoundingClientRect();
      const mouseY = event.clientY;
      event.currentTarget.classList.remove("dragging");
      const aboveTarget = mouseY < rect.top + rect.height / 2;

      if (aboveTarget) {
        list.insertBefore(draggedItem, event.target);
      } else {
        list.insertBefore(draggedItem, event.target.nextSibling);
      }
      draggedItem.classList.remove("none");
    }
  });
  const options = document.querySelectorAll(".options");
  const optionMenu = document.getElementById("opmenu");
  const opEdit = document.getElementById("opedit");
  const opDelete = document.getElementById("opdelete");
  options.forEach((option) => {
    let parentName = option.parentElement.querySelector("#name");
    let optionparentName = localStorage.getItem("tasklistname");
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
          parentName.innerText = "Untitled Task List";
          parentName.setAttribute("contenteditable", false);
          localStorage.setItem("tasklistname", parentName.innerText);
        } else {
          parentName.setAttribute("contenteditable", false);
          localStorage.setItem("tasklistname", parentName.innerText);
        }
      });
      opDelete.addEventListener("click", () => {
        if (
          confirm(
            "Are you sure you want to delete this task list? Your tasks will be permenantly deleted."
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
});

function checkNoTask(taskList) {
  if (taskList.length == 0) {
    const tasks = document.getElementById("task-list");
    tasks.innerHTML =
      '<div id="notask"><img class="notaskimg" src="media/notask.png"> No tasks! <br>To create a new task, enter a task or item in the input field below or import them.</div>';
  }
}
