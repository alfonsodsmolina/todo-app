function addTask(taskTextFromLoad = null) {
  const input = document.getElementById("todoInput");
  const taskText = taskTextFromLoad || input.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  // Mark task as complete on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);
  document.getElementById("todoList").appendChild(li);

  // Clear input if added manually
  if (!taskTextFromLoad) {
    input.value = "";
  }

  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#todoList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("todoList", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("todoList") || "[]");
  saved.forEach(task => {
    addTask(task.text);
    const lastLi = document.querySelector("#todoList li:last-child");
    if (task.completed) {
      lastLi.classList.add("completed");
    }
  });
}

// Event: click Add button
document.getElementById("addButton").addEventListener("click", () => addTask());

// Event: press Enter in input
document.getElementById("todoInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Load tasks when page is opened
loadTasks();

// Toggle dark mode
const themeToggle = document.getElementById("themeToggle");

function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Load theme on page load
const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme === "dark");

// Toggle button click
themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");
  setTheme(isDark);
});
