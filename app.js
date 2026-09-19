// localStorage 使用的鍵值
const STORAGE_KEY = 'todo-list-data';

// 取得畫面上的元素
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoListEl = document.getElementById('todo-list');
const emptyMessageEl = document.getElementById('empty-message');
const remainingCountEl = document.getElementById('remaining-count');

// 待辦事項陣列,啟動時從 localStorage 讀取
let todos = loadTodos();

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

// 依照目前的資料重新渲染整個清單畫面
function render() {
  todoListEl.innerHTML = '';

  // 清單為空時顯示提示文字,否則隱藏
  const isEmpty = todos.length === 0;
  emptyMessageEl.style.display = isEmpty ? 'block' : 'none';

  todos.forEach((todo) => {
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

// 初始渲染
render();
