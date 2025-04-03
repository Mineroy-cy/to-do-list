document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    loadTheme();
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskDate = document.getElementById("taskDate").value;
    let taskText = taskInput.value.trim();

    if (taskText === "" || taskDate === "") {
        alert("Please enter a task and select a date!");
        return;
    }

    let task = { text: taskText, date: taskDate, completed: false };
    saveTaskToLocalStorage(task);

    renderTask(task);
    taskInput.value = "";
}

function renderTask(task) {
    let li = document.createElement("li");
    li.draggable = true;
    li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}" onclick="toggleComplete(this)">${task.text} - <small>${task.date}</small></span>
        <button class="edit-btn" onclick="editTask(this)">Edit</button>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    document.getElementById("taskList").appendChild(li);
}

// Toggle task completion
function toggleComplete(taskElement) {
    taskElement.classList.toggle("completed");
    updateLocalStorage();
}

// Edit a task
function editTask(editBtn) {
    let taskElement = editBtn.parentElement.querySelector("span");
    let newText = prompt("Edit task:", taskElement.innerText.split(" - ")[0]);
    
    if (newText !== null && newText.trim() !== "") {
        taskElement.innerHTML = `${newText} - <small>${taskElement.innerHTML.split(" - ")[1]}</small>`;
        updateLocalStorage();
    }
}

// Delete a task with confirmation
function deleteTask(deleteBtn) {
    if (confirm("Are you sure you want to delete this task?")) {
        deleteBtn.parentElement.remove();
        updateLocalStorage();
    }
}

// Save tasks to localStorage
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(renderTask);
}

// Update localStorage
function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let text = li.querySelector("span").innerText.split(" - ")[0];
        let date = li.querySelector("small").innerText;
        let completed = li.querySelector("span").classList.contains("completed");
        tasks.push({ text, date, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Dark Mode Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
}
