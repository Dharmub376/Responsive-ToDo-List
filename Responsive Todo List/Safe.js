document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');
        const newTask = document.createElement('li');
        newTask.className = 'task-item';

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.className = 'checkbox';
        taskCheckbox.addEventListener('change', toggleTask);

        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = taskText;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';

        const deleteButton = document.createElement('i');
        deleteButton.className = 'fas fa-trash-alt'; // Font Awesome trash icon
        deleteButton.addEventListener('click', deleteTask);

        const editButton = document.createElement('i');
        editButton.className = 'fas fa-edit'; // Font Awesome edit icon
        editButton.addEventListener('click', editTask);

        buttonsDiv.appendChild(deleteButton);
        buttonsDiv.appendChild(editButton);

        newTask.appendChild(taskCheckbox);
        newTask.appendChild(taskTextElement);
        newTask.appendChild(buttonsDiv);

        taskList.appendChild(newTask);

        saveTasks();
        taskInput.value = '';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

function toggleTask(event) {
    const taskText = event.target.nextSibling;
    taskText.classList.toggle('completed');
    playBeep(); // Play beep sound on checkbox click
    saveTasks();
}

function deleteTask(event) {
    const taskItem = event.target.parentNode.parentNode;
    taskItem.parentNode.removeChild(taskItem);
    saveTasks();
}

function editTask(event) {
    const taskTextElement = event.target.parentNode.parentNode.children[1];
    const updatedText = prompt('Edit task:', taskTextElement.textContent);

    if (updatedText !== null) {
        taskTextElement.textContent = updatedText;
        saveTasks();
    }
}

function clearHistory() {
    const confirmation = confirm('Are you sure you want to clear all tasks?');

    if (confirmation) {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = ''; // Clear the task list
        localStorage.removeItem('tasks'); // Remove tasks from local storage
    }
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
    const taskList = document.getElementById('task-list');
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {
        taskList.innerHTML = savedTasks;
        
        // Attach event listeners to the loaded tasks
        const checkboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', toggleTask);
        });

        const deleteButtons = document.querySelectorAll('.task-item i:nth-child(3)');
        deleteButtons.forEach((button) => {
            button.addEventListener('click', deleteTask);
        });

        const editButtons = document.querySelectorAll('.task-item i:nth-child(4)');
        editButtons.forEach((button) => {
            button.addEventListener('click', editTask);
        });
    }
}

function playBeep() {
    const beepSound = document.getElementById('beep');
    beepSound.currentTime = 0; // Reset audio to the beginning
    beepSound.play();
}
