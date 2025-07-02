const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

addBtn.addEventListener("click", addTask);

// Adding a Task
function addTask() {
    if (inputBox.value === "") {
        alert("Enter a task.");
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

// Adding a Task with Enter Key
inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Completed - Incompleted
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

// Edit
taskList.addEventListener("dblclick", function (e) {
    const taskItem = e.target.closest(".task-item");
    const taskTextSpan = taskItem.querySelector(".task-text");

    if (taskItem.querySelector("input.edit-input")) return;

    const oldText = taskTextSpan.textContent;
    const input = document.createElement("input");

    input.type = "text";
    input.value = oldText;
    input.className = "edit-input";
    input.style.flex = "1";

    taskItem.replaceChild(input, taskTextSpan);
    input.focus();

    function replaceInputWithSpan() {
        const newText = input.value.trim();
        const newSpan = document.createElement("span");

        newSpan.className = "task-text";
        newSpan.textContent = newText || oldText; // If input is empty, keep old text
        taskItem.replaceChild(newSpan, input);
    }

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            replaceInputWithSpan();
        }
    });

    input.addEventListener("blur", replaceInputWithSpan);
});

// Save Tasks
function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

// Show Tasks
function showTask() {
    taskList.innerHTML = localStorage.getItem("data");
}

showTask();
