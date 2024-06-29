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
    if (event.clientX <= 5 && !bar.classList.contains("movingbar")) {
      bar.classList.add("movingbar");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const listPanel = document.getElementById("list-panel");
  const optionMenu = document.getElementById("opmenu");
  const opEdit = document.getElementById("opedit");
  const opDelete = document.getElementById("opdelete");
  const addListBtn = document.getElementById("add");
  let listNamesArray = [];
  const storedListNames = localStorage.getItem("listname");

  if (storedListNames) {
    listNamesArray = storedListNames.split(",");
    listNamesArray.forEach((listName, index) => {
      appendListPanelItem(listName, index);
    });
  } else {
    const defaultListName = "List #1";
    appendListPanelItem(defaultListName, 0);
    listNamesArray.push(defaultListName);
    localStorage.setItem("listname", listNamesArray.join(","));
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("options")) {
      const option = e.target;
      const parentElement = option.closest("li");
      const parentName = parentElement.querySelector("#name");
      const currentIndex = parentName.getAttribute("data-list-index");
      optionMenu.style.top = e.clientY - 50 + "px";
      optionMenu.style.visibility = "visible";
      opEdit.onclick = () => editListName(parentName, currentIndex);
      opDelete.onclick = () => deleteListItem(parentElement, currentIndex);
    } else {
      optionMenu.style.visibility = "hidden";
    }
  });

  addListBtn.addEventListener("click", () => {
    const newListName = "New List";
    const newIndex = listNamesArray.length;
    appendListPanelItem(newListName, newIndex);
    listNamesArray.push(newListName);
    localStorage.setItem("listname", listNamesArray.join(","));
  });

  function appendListPanelItem(itemName, index) {
    const newListElement = document.createElement("li");
    newListElement.innerHTML = `
      <span class="name" id="name" data-list-index="${index}">${itemName}</span>
      <img src="media/ellipsis-vertical-solid.svg" class="options" id="options" />
    `;
    newListElement.classList.add("side-item");
    listPanel.appendChild(newListElement);
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
      localStorage.setItem("listname", listNamesArray.join(","));
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
      localStorage.setItem("listname", listNamesArray.join(","));
      localStorage.removeItem(`list${index}items`);
    }
  }
});

document.addEventListener("click", (e) => {
  const list = document.getElementById("list");
  if (
    e.target.classList.contains("side-item") ||
    e.target.parentElement.classList.contains("side-item")
  ) {
    const itemIndex = e.target.classList.contains("side-item")
      ? e.target.children[0].getAttribute("data-list-index")
      : e.target.getAttribute("data-list-index");

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
    const storedItems = localStorage.getItem(`list${index}items`);
    if (storedItems) {
      itemsArray = storedItems.split("|~|");
    }

    itemsArray.forEach((item) => appendListItem(item));

    listForm.onsubmit = (e) => {
      e.preventDefault();
      const itemText = listInput.value.trim();
      if (itemText !== "") {
        itemsArray.push(itemText);
        localStorage.setItem(`list${index}items`, itemsArray.join("|~|"));
        appendListItem(itemText);
        listInput.value = "";
      }
    };

    function appendListItem(itemText) {
      const listItem = document.createElement("li");
      const edit = document.createElement("span");
      const remove = document.createElement("span");
      listItem.innerText = itemText;
      listItem.classList.add("list-item");
      listItem.setAttribute("data-item", itemText);
      remove.classList.add("remove");
      remove.innerHTML =
        '<i class="fa-solid fa-trash" style="color: #ffffff;"></i>';
      edit.classList.add("edit");
      edit.innerHTML =
        '<i class="fa-solid fa-pen" style="color: #ffffff;"></i>';
      listItem.appendChild(remove);
      listItem.appendChild(edit);
      list.appendChild(listItem);
    }

    list.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-trash")) {
        const listItem = e.target.closest("li");
        const itemText = listItem.getAttribute("data-item");
        listItem.remove();
        itemsArray = itemsArray.filter((item) => item !== itemText);
        localStorage.setItem(`list${index}items`, itemsArray.join("|~|"));
      }
    });
  }
});
