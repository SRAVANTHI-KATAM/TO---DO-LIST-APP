let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span>${task}</span>
      <div class="task-actions">
        <button class="edit-btn" onclick="editTask(${index})">Edit Task</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete Task</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  let task = taskInput.value.trim();
  if (task !== "") {
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  let updated = prompt("Edit your task:", tasks[index]);
  if (updated !== null && updated.trim() !== "") {
    tasks[index] = updated.trim();
    saveTasks();
    renderTasks();
  }
}

addBtn.addEventListener("click", addTask);
window.addEventListener("load", renderTasks);
