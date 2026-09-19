// localStorage 使用的鍵值
const STORAGE_KEY = 'todo-list-data';
const THEME_STORAGE_KEY = 'todo-list-theme';

// 取得畫面上的元素
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoListEl = document.getElementById('todo-list');
const emptyMessageEl = document.getElementById('empty-message');
const remainingCountEl = document.getElementById('remaining-count');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');
const filterButtons = document.querySelectorAll('.filter-btn');

// 待辦事項陣列,啟動時從 localStorage 讀取
let todos = loadTodos();
let currentFilter = 'all';

// 從 localStorage 讀取資料,若無資料或格式錯誤則回傳空陣列
function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

// 將目前的待辦事項陣列寫回 localStorage
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 取得使用者手動選擇的主題,沒有選擇時交由 CSS 跟隨作業系統設定
function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    document.documentElement.dataset.theme = savedTheme;
  }
  updateThemeButton();
}

// 更新主題按鈕文字與圖示
function updateThemeButton() {
  const isDark = document.documentElement.dataset.theme === 'dark'
    || (!document.documentElement.dataset.theme
      && window.matchMedia('(prefers-color-scheme: dark)').matches);
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  themeLabel.textContent = isDark ? '淺色模式' : '深色模式';
  themeToggle.setAttribute('aria-label', isDark ? '切換至淺色模式' : '切換至深色模式');
}

// 切換主題並記住使用者的選擇
function toggleTheme() {
  const isDark = document.documentElement.dataset.theme === 'dark'
    || (!document.documentElement.dataset.theme
      && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const nextTheme = isDark ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  updateThemeButton();
}

// 依照目前篩選條件取得要顯示的待辦事項
function getFilteredTodos() {
  if (currentFilter === 'active') {
    return todos.filter((todo) => !todo.completed);
  }
  if (currentFilter === 'completed') {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
}

// 依照目前的資料重新渲染整個清單畫面
function render() {
  todoListEl.innerHTML = '';

  const filteredTodos = getFilteredTodos();
  const emptyMessages = {
    all: '還沒有任何待辦事項,新增一個吧!',
    active: '目前沒有未完成的待辦事項。',
    completed: '目前沒有已完成的待辦事項。',
  };
  emptyMessageEl.textContent = emptyMessages[currentFilter];
  emptyMessageEl.style.display = filteredTodos.length === 0 ? 'block' : 'none';

  filteredTodos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text';
    textSpan.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '刪除';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    li.append(checkbox, textSpan, deleteBtn);
    todoListEl.appendChild(li);
  });

  // 更新底部未完成項目數量
  const remainingCount = todos.filter((todo) => !todo.completed).length;
  remainingCountEl.textContent = `未完成:${remainingCount} 項`;
}

// 切換目前的清單篩選條件
function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
  render();
}

// 新增一筆待辦事項
function addTodo(text) {
  const trimmed = text.trim();
  // 輸入空白內容時不新增
  if (!trimmed) {
    return;
  }

  todos.push({
    id: Date.now().toString(),
    text: trimmed,
    completed: false,
  });

  saveTodos();
  render();
}

// 切換某一筆待辦事項的完成狀態
function toggleTodo(id) {
  const todo = todos.find((item) => item.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    render();
  }
}

// 刪除某一筆待辦事項
function deleteTodo(id) {
  todos = todos.filter((item) => item.id !== id);
  saveTodos();
  render();
}

// 表單送出時新增待辦事項並清空輸入框
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo(todoInput.value);
  todoInput.value = '';
  todoInput.focus();
});

themeToggle.addEventListener('click', toggleTheme);
filterButtons.forEach((button) => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});

loadTheme();

// 初始渲染
render();
