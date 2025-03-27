function addTask(taskTextFromLoad = null, priorityFromLoad = null, completedFromLoad = false) {
  const input = document.getElementById("todoInput");
  const prioritySelect = document.getElementById("prioritySelect");

  const taskText = taskTextFromLoad || input.value.trim();
  const priority = priorityFromLoad || (prioritySelect ? prioritySelect.value : "low");

  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;
  li.classList.add(priority); // Add priority class (low, medium, high)

  if (completedFromLoad) {
    li.classList.add("completed");
  }

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);
  document.getElementById("todoList").appendChild(li);

  if (!taskTextFromLoad) {
    input.value = "";
  }

  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#todoList li").forEach(li => {
    const taskText = li.firstChild.textContent.trim();
    const priority = li.classList.contains("high")
      ? "high"
      : li.classList.contains("medium")
      ? "medium"
      : "low";
    const completed = li.classList.contains("completed");

    tasks.push({ text: taskText, priority, completed });
  });
  localStorage.setItem("todoList", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("todoList") || "[]");
  saved.forEach(task => {
    addTask(task.text, task.priority, task.completed);
  });
}

// Event listeners for Add button and Enter key
document.getElementById("addButton").addEventListener("click", () => addTask());

document.getElementById("todoInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Load saved tasks
loadTasks();

// Dark mode toggle
const themeToggle = document.getElementById("themeToggle");

function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");
  setTheme(isDark);
});

// Enable drag-and-drop with SortableJS
new Sortable(document.getElementById("todoList"), {
  animation: 150,
  onEnd: () => saveTasks()
});


document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.getElementById("date");
  const options = { weekday: "long", month: "long", day: "numeric" };
  const today = new Date().toLocaleDateString("en-US", options);
  dateElement.textContent = today;
});
