// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');

// Add Task Functionality
addTaskButton.addEventListener('click', () => addTask(taskInput.value.trim()));
searchInput.addEventListener('input', filterTasks);

function addTask(taskText) {
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Add task to DOM
  addTaskToDOM(taskText, false);

  // Clear input field
  taskInput.value = '';
}

function addTaskToDOM(taskText, isCompleted) {
  // Create Task Item
  const taskItem = document.createElement('li');
  taskItem.classList.add(
    'flex',
    'items-center',
    'justify-between',
    'bg-gray-50',
    'px-5',
    'py-3',
    'rounded-lg',
    'shadow-md',
    'hover:shadow-lg',
    'transition-shadow',
    'duration-200'
  );

  // Task Text
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  taskSpan.classList.add(
    'flex-1',
    'text-lg',
    'font-medium',
    'text-gray-700',
    'truncate'
  );
  if (isCompleted) {
    taskSpan.classList.add('line-through', 'text-gray-400');
  }

  // Action Buttons
  const actionButtons = document.createElement('div');
  actionButtons.classList.add('flex', 'items-center', 'space-x-3');

  // Complete Button
  const completeButton = document.createElement('button');
  completeButton.innerHTML = isCompleted
    ? '<i class="fas fa-times-circle text-red-500 text-xl"></i>'
    : '<i class="fas fa-check-circle text-green-500 text-xl"></i>';
  completeButton.classList.add(
    'p-2',
    'hover:bg-green-100',
    'rounded-full',
    'transition',
    'duration-200'
  );
  completeButton.addEventListener('click', () => {
    const completed = taskSpan.classList.toggle('line-through');
    taskSpan.classList.toggle('text-gray-400');
    completeButton.innerHTML = completed
      ? '<i class="fas fa-times-circle text-red-500 text-xl"></i>'
      : '<i class="fas fa-check-circle text-green-500 text-xl"></i>';
  });

  // Edit Button
  const editButton = document.createElement('button');
  editButton.innerHTML = '<i class="fas fa-edit text-yellow-500 text-xl"></i>';
  editButton.classList.add(
    'p-2',
    'hover:bg-yellow-100',
    'rounded-full',
    'transition',
    'duration-200'
  );
  editButton.addEventListener('click', () => editTask(taskItem, taskSpan));

  // Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash text-red-500 text-xl"></i>';
  deleteButton.classList.add(
    'p-2',
    'hover:bg-red-100',
    'rounded-full',
    'transition',
    'duration-200'
  );
  deleteButton.addEventListener('click', () => {
    taskItem.remove();
  });

  // Append Buttons to Action Container
  actionButtons.appendChild(completeButton);
  actionButtons.appendChild(editButton);
  actionButtons.appendChild(deleteButton);

  // Append Elements to Task Item
  taskItem.appendChild(taskSpan);
  taskItem.appendChild(actionButtons);

  // Append Task Item to List
  taskList.appendChild(taskItem);
}

function editTask(taskItem, taskSpan) {
  // Replace task text with an input field
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = taskSpan.textContent;
  editInput.classList.add(
    'flex-1',
    'text-lg',
    'font-medium',
    'text-gray-700',
    'bg-gray-100',
    'px-3',
    'py-2',
    'border',
    'rounded-lg',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-400'
  );

  // Replace task span with input field
  taskItem.replaceChild(editInput, taskSpan);

  // Create save button
  const saveButton = document.createElement('button');
  saveButton.innerHTML = '<i class="fas fa-save text-green-500 text-xl"></i>';
  saveButton.classList.add(
    'p-2',
    'hover:bg-green-100',
    'rounded-full',
    'transition',
    'duration-200'
  );

  // Save the updated task text
  saveButton.addEventListener('click', () => {
    taskSpan.textContent = editInput.value.trim() || 'Untitled Task';
    taskItem.replaceChild(taskSpan, editInput);
    actionButtons.replaceChild(editButton, saveButton);
  });

  // Replace edit button with save button
  const actionButtons = taskItem.querySelector('div');
  const editButton = actionButtons.querySelector('button:nth-child(2)');
  actionButtons.replaceChild(saveButton, editButton);
}

// Filter tasks by search
function filterTasks() {
  const query = searchInput.value.toLowerCase();
  const tasks = taskList.querySelectorAll('li');

  tasks.forEach((task) => {
    const taskText = task.querySelector('span').textContent.toLowerCase();
    task.style.display = taskText.includes(query) ? 'flex' : 'none';
  });
}
