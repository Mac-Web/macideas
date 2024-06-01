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
  const header = document.getElementById("header");
  const pageTitle = document.getElementById("title");
  if (localStorage.header !== undefined) {
    header.innerHTML = localStorage.header;
  }
  header.addEventListener("dblclick", function () {
    header.contentEditable = true;
    header.focus();
    header.style.borderBottom = "2px solid white";
  });
  header.addEventListener("blur", function () {
    header.contentEditable = false;
    header.style.borderBottom = "none";
    const textContent = header.innerText;
    const sanitizedContent = textContent.replace(/<br>/g, "");
    localStorage.setItem("header", sanitizedContent);
  });
  if (localStorage.title !== undefined) {
    let thing123 = localStorage.title;
    let thing321 = localStorage.descriptions;
    let main = document.getElementById("wrap");
    let anotherarray = thing321.split(",");
    let anarray = thing123.split(",");
    let someindex = anarray.length - 1;
    anarray.splice(someindex, 1);
    anarray.forEach(function (title, index) {
      let go = document.createElement("div");
      let group = document.createElement("div");
      let titlebruh = document.createElement("span");
      let description = document.createElement("span");
      let edit = document.createElement("button");
      let remove = document.createElement("button");
      edit.classList.add("edit");
      remove.classList.add("edit");
      go.id = "item";
      group.id = "group";
      titlebruh.id = "item-t";
      description.id = "item-d";
      edit.id = "edit";
      remove.id = "remove";
      go.classList.add("item");
      titlebruh.classList.add("title");
      description.classList.add("des");
      titlebruh.innerHTML = title;
      description.innerHTML = anotherarray[index];
      edit.innerHTML = "Edit";
      remove.innerHTML = "Delete";
      main.insertBefore(go, main.firstChild);
      go.appendChild(titlebruh);
      go.appendChild(description);
      go.appendChild(group);
      group.appendChild(edit);
      group.appendChild(remove);
    });
  }
  const thing = document.getElementById("item");
  const button = document.getElementById("edit");
  const create = document.getElementById("add");
  const wrap = document.getElementById("wrap");
  create.addEventListener("click", go);
  document.addEventListener("click", function (event) {
    let go = event.target.parentElement.parentElement;
    let title = go.querySelector("#item-t");
    let description = go.querySelector("#item-d");
    let editButton = go.querySelector("#edit");
    if (event.target === editButton) {
      title.contentEditable = "true";
      description.contentEditable = "true";
      description.focus();
      title.classList.add("editing");
      description.classList.add("editing");
    } else if (event.target === wrap) {
      save();
      title.classList.remove("editing");
      description.classList.remove("editing");
      title.contentEditable = "false";
      description.contentEditable = "false";
    }
    let main = document.getElementById("wrap");
    let removeButton = go.querySelector("#remove");
    if (event.target === removeButton) {
      main.removeChild(event.target.parentElement.parentElement);
      save();
    }
  });
  function save() {
    const test = document.querySelectorAll(".title");
    let all = "";
    test.forEach(function (title) {
      all += title.innerHTML + ",";
    });
    localStorage.setItem("title", all);
    const desc = document.querySelectorAll(".des");
    let whole = "";
    desc.forEach(function (asdf) {
      whole += asdf.innerHTML + ",";
    });
    localStorage.setItem("descriptions", whole);
  }
  function go() {
    let main = document.getElementById("wrap");
    let go = document.createElement("div");
    let group = document.createElement("div");
    let title = document.createElement("span");
    let description = document.createElement("span");
    let edit = document.createElement("button");
    let remove = document.createElement("button");
    edit.classList.add("edit");
    remove.classList.add("edit");
    go.id = "item";
    group.id = "group";
    title.id = "item-t";
    description.id = "item-d";
    edit.id = "edit";
    remove.id = "remove";
    go.classList.add("item");
    title.classList.add("title");
    description.classList.add("des");
    title.innerHTML = "Insert Title Here";
    description.innerHTML = "Insert Description for the List Item Here";
    edit.innerHTML = "Edit";
    remove.innerHTML = "Delete";
    main.insertBefore(go, main.firstChild);
    go.appendChild(title);
    go.appendChild(description);
    go.appendChild(group);
    group.appendChild(edit);
    group.appendChild(remove);
    title.contentEditable = "true";
    description.contentEditable = "true";
    title.focus();
    title.classList.add("editing");
    description.classList.add("editing");
    title.addEventListener("blur", function () {
      title.classList.remove("editing");
      description.classList.remove("editing");
      title.contentEditable = "false";
      description.contentEditable = "false";
    });
  }
});
