const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

addBtn.addEventListener("click", addTask);

function addTask() {
    if (inputBox.value === "") {
        alert("Bir görev giriniz.");
    }
    else {
        let li = document.createElement("li");
        li.className = "task-item";
        taskList.appendChild(li);

        let icon = document.createElement("i");
        icon.className = "fa-regular fa-circle li-circle";
        li.appendChild(icon);

        let span = document.createElement("span");
        span.className = "task-text";
        span.textContent = inputBox.value;
        li.appendChild(span);

        let div = document.createElement("div");
        div.className = "delete-btn";
        li.appendChild(div);

        let deleteIcon = document.createElement("i");
        deleteIcon.className = "fa-solid fa-trash";
        div.appendChild(deleteIcon);
    }

    inputBox.value = "";
    saveData();
}

taskList.addEventListener("click", function (e) {
    const el = e.target;

    if (el.classList.contains("li-circle") || el.classList.contains("li-tick") || el.classList.contains("task-text")) {
        el.parentElement.classList.toggle("checked");

        const icon = el.parentElement.querySelector("i.li-circle, i.li-tick");

        if (icon.classList.contains("fa-circle")) {
            icon.classList.remove("fa-regular", "fa-circle", "li-circle");
            icon.classList.add("fa-solid", "fa-check", "li-tick");
        } 
        else {
            icon.classList.remove("fa-solid", "fa-check", "li-tick");
            icon.classList.add("fa-regular", "fa-circle", "li-circle");
        }
    }

    if (el.classList.contains("delete-btn") || el.parentElement.classList.contains("delete-btn")) {
        el.closest("li").remove();
    }

    saveData();
});


function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

function showTask() {
    taskList.innerHTML = localStorage.getItem("data");
}

showTask();
