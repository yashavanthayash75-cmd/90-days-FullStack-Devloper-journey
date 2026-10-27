// ===================================
// 1. GET HTML ELEMENTS
// ===================================

const taskInput = document.getElementById("task");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const result = document.getElementById("result");

const totalTask = document.getElementById("totalTask");
const completedTask = document.getElementById("completedTask");
const remainingTask = document.getElementById("remainingTask");
const percentage = document.getElementById("percentage");
const progressBar = document.getElementById("progressBar");

const themeBtn = document.getElementById("themeBtn");
const dateElement = document.getElementById("date");
const clockElement = document.getElementById("clock");

const randomQuotes = document.getElementById("randomQuotes");
const quoteBtn = document.getElementById("quoteBtn");


// ===================================
// 2. STORE TASKS
// ===================================

let tasks = [];

try {
    const savedTasks = JSON.parse(
        localStorage.getItem("devHubTasks")
    );

    if (
        Array.isArray(savedTasks) &&
        savedTasks.every(task =>
            task &&
            typeof task.text === "string" &&
            typeof task.completed === "boolean"
        )
    ) {
        tasks = savedTasks;
    }
} catch (error) {
    tasks = [];
}


// ===================================
// 3. SAVE TASKS
// ===================================

function saveTasks() {
    localStorage.setItem("devHubTasks", JSON.stringify(tasks));
}


// ===================================
// 4. DISPLAY TASKS
// ===================================

function displayTasks() {
    taskList.replaceChildren();

    tasks.forEach(function(task, index) {

        const listItem = document.createElement("li");
        const taskContent = document.createElement("div");
        const taskText = document.createElement("span");
        const taskActions = document.createElement("div");

        const completeBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        taskContent.className = "task-content";
        taskText.className = "task-text";
        taskActions.className = "task-actions";

        taskText.textContent = task.text;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        completeBtn.textContent = task.completed
            ? "Undo"
            : "Complete";

        completeBtn.className = "complete-btn";
        completeBtn.type = "button";

        completeBtn.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
            updateProgress();
        });

        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.type = "button";

        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
            updateProgress();

            result.textContent = "Task deleted successfully!";
        });

        taskActions.appendChild(completeBtn);
        taskActions.appendChild(deleteBtn);

        taskContent.appendChild(taskText);
        taskContent.appendChild(taskActions);

        listItem.appendChild(taskContent);
        taskList.appendChild(listItem);
    });
}


// ===================================
// 5. ADD A NEW TASK
// ===================================

addTaskBtn.addEventListener("click", function() {

    const taskValue = taskInput.value.trim();

    if (taskValue === "") {
        result.textContent = "Please enter a task first!";
        taskInput.focus();
        return;
    }

    tasks.push({
        text: taskValue,
        completed: false
    });

    saveTasks();
    displayTasks();
    updateProgress();

    result.textContent = "Task added successfully!";

    taskInput.value = "";
    taskInput.focus();
});


// Allow Enter key to add a task.

taskInput.addEventListener