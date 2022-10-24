const VERSION = 1.0;
console.info(`TaskTracker version ${VERSION}`);

window.addEventListener('load', () => {

    const taskForm = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submittedData = new FormData(taskForm);
        const task = submittedData.get('addtask');

        // Process the task
        const id = Date.now();
        const taskBox = document.createElement('li');
        taskBox.innerHTML = `
        <input class="form-check-input" type="checkbox" value="" id="${id}">
        <label class="form-check-label" for="${id}">
            ${task}
        </label>
        `;
        taskList.appendChild(taskBox);

        taskForm.reset();
        return false;
    })
    

})

