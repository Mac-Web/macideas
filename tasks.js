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

function checkNoTask(taskList) {
  if (taskList.length == 0) {
    const tasks = document.getElementById("list");
    tasks.innerHTML =
      '<div id="notask"><img class="notaskimg" src="media/notask.png"> No tasks! <br>To create a new task, enter a task or item in the input field below or import them.</div>';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const taskPanel = document.getElementById("task-panel");
  const optionMenu = document.getElementById("opmenu");
  const opEdit = document.getElementById("opedit");
  const opDelete = document.getElementById("opdelete");
  const addListBtn = document.getElementById("add");
  let listNamesArray = [];
  const storedListNames = localStorage.getItem("taskname");

  if (storedListNames) {
    listNamesArray = storedListNames.split(",");
    listNamesArray.forEach((listName, index) => {
      appendListPanelItem(listName, index);
    });
  } else {
    const defaultListName = "Task #1";
    appendListPanelItem(defaultListName, 0);
    listNamesArray.push(defaultListName);
    localStorage.setItem("taskname", listNamesArray.join(","));
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("options")) {
      const option = e.target;
      const parentElement = option.closest("li");
      const parentName = parentElement.querySelector("#name");
      const currentIndex = parentName.getAttribute("data-task-index");
      optionMenu.style.top = e.clientY - 50 + "px";
      optionMenu.style.visibility = "visible";
      opEdit.onclick = () => editListName(parentName, currentIndex);
      opDelete.onclick = () => deleteListItem(parentElement, currentIndex);
    } else {
      optionMenu.style.visibility = "hidden";
    }
  });

  addListBtn.addEventListener("click", () => {
    const newListName = "New Task";
    const newIndex = listNamesArray.length;
    appendListPanelItem(newListName, newIndex);
    listNamesArray.push(newListName);
    localStorage.setItem("taskname", listNamesArray.join(","));
  });

  function appendListPanelItem(itemName, index) {
    const newListElement = document.createElement("li");
    newListElement.innerHTML = `
      <span class="name" id="name" data-task-index="${index}">${itemName}</span>
      <img src="media/ellipsis-vertical-solid.svg" class="options" id="options" />
    `;
    newListElement.classList.add("side-item");
    taskPanel.appendChild(newListElement);
  }

  function editListName(element, index) {
    element.setAttribute("contenteditable", true);
    element.focus();
    const setCaret = () => {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(element);
      sel.removeAllRanges();
      sel.addRange(range);
    };
    setTimeout(setCaret, 1);
    element.onblur = () => {
      element.setAttribute("contenteditable", false);
      if (element.innerText.trim().length === 0) {
        element.innerText = "Untitled List";
      }
      listNamesArray[index] = element.innerText;
      localStorage.setItem("taskname", listNamesArray.join(","));
    };
    element.onkeydown = (e) => {
      if (e.key === "Enter") {
        element.blur();
      }
    };
  }

  function deleteListItem(element, index) {
    if (
      confirm(
        "Are you sure you want to delete this list? All the items will be permanently deleted."
      )
    ) {
      element.remove();
      listNamesArray.splice(index, 1);
      localStorage.setItem("taskname", listNamesArray.join(","));
      localStorage.removeItem(`task${index}items`);
    }
  }
});

document.addEventListener("click", (e) => {
  const list = document.getElementById("list");
  const audio = document.getElementById("ding");
  if (
    e.target.classList.contains("side-item") ||
    e.target.parentElement.classList.contains("side-item")
  ) {
    const itemIndex = e.target.classList.contains("side-item")
      ? e.target.children[0].getAttribute("data-task-index")
      : e.target.getAttribute("data-task-index");

    const sideItems = document.querySelectorAll(".side-item");
    sideItems.forEach((sideItem) => {
      sideItem.classList.remove("selected-side-item");
    });
    const selectedSideItem = e.target.classList.contains("side-item")
      ? e.target
      : e.target.parentElement;
    selectedSideItem.classList.add("selected-side-item");

    fetchItems(itemIndex);
  }

  function fetchItems(index) {
    const barContainer = document.querySelector(".bar-container");
    barContainer.style.visibility = "visible";
    const listForm = document.getElementById("list-form");
    const listInput = document.getElementById("list-input");
    list.innerHTML = "";

    let itemsArray = [];
    const storedItems = localStorage.getItem(`task${index}items`);
    if (storedItems) {
      itemsArray = storedItems.split("|~|");
    }

    checkNoTask(itemsArray);

    itemsArray.forEach((item) => appendListItem(item));

    listForm.onsubmit = (e) => {
      e.preventDefault();
      const itemText = listInput.value.trim();
      if (itemText !== "") {
        itemsArray.push(itemText);
        const noTask = document.getElementById("notask");
        if (noTask) {
          noTask.remove();
        }
        localStorage.setItem(`task${index}items`, itemsArray.join("|~|"));
        appendListItem(itemText);
        listInput.value = "";
      }
    };

    function appendListItem(itemText) {
      const listItem = document.createElement("li");
      const edit = document.createElement("span");
      const remove = document.createElement("span");
      const complete = document.createElement("span");

      listItem.innerText = itemText;
      listItem.classList.add("list-item");
      listItem.setAttribute("data-item", itemText);
      remove.classList.add("remove");
      remove.innerHTML =
        '<i class="fa-solid fa-trash" style="color: #ffffff;"></i>';
      edit.classList.add("edit");
      edit.innerHTML =
        '<i class="fa-solid fa-pen" style="color: #ffffff;"></i>';
      complete.classList.add("complete");
      complete.innerHTML =
        '<i class="fa-regular fa-circle" style="color: #ffffff;"></i>';
      listItem.appendChild(remove);
      listItem.appendChild(edit);
      listItem.appendChild(complete);
      list.appendChild(listItem);
      listItem.setAttribute("draggable", true);
      const completeIcons = document.querySelectorAll(".complete");
      completeIcons.forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
          icon.innerHTML =
            '<i class="fa-regular fa-circle-check" style="color: #ffffff;"></i>';
        });
        icon.addEventListener("mouseleave", () => {
          icon.innerHTML =
            '<i class="fa-regular fa-circle" style="color: #ffffff;"></i>';
        });
        icon.addEventListener("click", (e) => {
          audio.play();
          const listItem = e.target.closest("li");
          const itemText = listItem.getAttribute("data-item");
          listItem.remove();
          itemsArray = itemsArray.filter((item) => item !== itemText);
          localStorage.setItem(`task${index}items`, itemsArray.join("|~|"));
          checkNoTask(itemsArray);
        });
      });
    }

    const taskList = document.getElementById("list");
    let draggedItem = null;
    const placeholder = document.createElement("div");
    placeholder.classList.add("placeholder");

    taskList.addEventListener("dragstart", (event) => {
      draggedItem = event.target.closest("li"); // Ensure correct item is dragged
      event.dataTransfer.effectAllowed = "move";
      draggedItem.classList.add("none");
      console.log("Drag start", draggedItem);
    });
    let previousTargetItem = null;

    taskList.addEventListener("dragover", (event) => {
      event.preventDefault();
      const targetItem = event.target.closest("li.task-item");
      if (!targetItem || targetItem === draggedItem) return;

      if (placeholder.parentNode !== taskList) {
        taskList.appendChild(placeholder);
      }

      const rect = targetItem.getBoundingClientRect();
      const mouseY = event.clientY;
      const aboveTarget = mouseY < rect.top + rect.height / 2;

      if (
        previousTargetItem !== targetItem ||
        (!aboveTarget && targetItem === previousTargetItem.nextSibling)
      ) {
        if (aboveTarget) {
          taskList.insertBefore(placeholder, targetItem);
        } else {
          taskList.insertBefore(placeholder, targetItem.nextSibling);
        }
      }

      previousTargetItem = targetItem;
    });
    taskList.addEventListener("drop", (event) => {
      event.preventDefault();
      const targetItem = event.target.closest("li");
      if (targetItem && targetItem !== draggedItem) {
        if (placeholder.parentNode === taskList) {
          taskList.removeChild(placeholder);
        }
        const rect = targetItem.getBoundingClientRect();
        const mouseY = event.clientY;
        const aboveTarget = mouseY < rect.top + rect.height / 2;

        if (aboveTarget) {
          taskList.insertBefore(draggedItem, targetItem);
        } else {
          taskList.insertBefore(draggedItem, targetItem.nextSibling);
        }
      }
      draggedItem.classList.remove("none");

      // Update itemsArray after drop
      const updatedItems = Array.from(taskList.children).map(
        (item) => item.innerText
      );
      itemsArray = updatedItems;
      localStorage.setItem(`task${index}items`, itemsArray.join("|~|"));
    });

    taskList.addEventListener("dragend", () => {
      if (placeholder.parentNode === taskList) {
        taskList.removeChild(placeholder);
      }
      draggedItem.classList.remove("none");
      draggedItem = null;
    });

    list.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-trash")) {
        const listItem = e.target.closest("li");
        const itemText = listItem.getAttribute("data-item");
        listItem.remove();
        itemsArray = itemsArray.filter((item) => item !== itemText);
        localStorage.setItem(`task${index}items`, itemsArray.join("|~|"));
        checkNoTask(itemsArray);
      } else if (e.target.classList.contains("fa-pen")) {
        const taskList = document.getElementById("list");
        const taskItem = e.target.closest("li");
        let ogItem = taskItem.innerText;
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
            this.innerHTML = "";
            this.innerHTML = taskText2;
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

            taskItem.appendChild(remove);
            taskItem.appendChild(edit);
            taskItem.appendChild(complete);
            taskList.appendChild(taskItem);
            taskItem.setAttribute("draggable", true);
            itemsArray[itemsArray.indexOf(ogItem)] = taskText2;
            localStorage.setItem(`task${index}items`, itemsArray.join("|~|"));
          }
        });
        taskItem.addEventListener("keypress", function (e) {
          if (taskItem.classList.contains("editing") && e.key === "Enter") {
            taskItem.setAttribute("contenteditable", false);
            const taskText2 = this.innerText;
            this.innerHTML = "";
            this.innerHTML = taskText2;
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

            taskItem.appendChild(remove);
            taskItem.appendChild(edit);
            taskItem.appendChild(complete);
            taskList.appendChild(taskItem);
            taskItem.setAttribute("draggable", true);
            itemsArray[itemsArray.indexOf(ogItem)] = taskText2;
            localStorage.setItem(`task${index}items`, itemsArray.join("|~|"));
          }
        });
      }
    });
  }
});
