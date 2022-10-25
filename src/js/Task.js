export class Task {
    constructor( taskId, taskText = undefined ) {

        this.taskId = taskId;
        this.lastModified = new Date();
        this.taskText = taskText;
    }
    storeTask(taskText) {
        /**
         * Add a new task to the localStorage
         */
        const createdAt = new Date();
        this.taskText = taskText;

        const taskObject = {
            task: taskText,
            taskId: this.taskId,
            createdAt: createdAt,
            lastModified: createdAt,
            status: 'new'
        };

        let taskList = window.localStorage.getItem('task-list');
        if (taskList){
            taskList += `,${this.taskId}`;
        }else{
            taskList = this.taskId;
        }
        window.localStorage.setItem('task-list', taskList);
        console.log('task list set to',taskList);

        window.localStorage.setItem(this.taskId,JSON.stringify(taskObject));
        return;

    }

    deleteTask() {
        /**
         * Remove an existing task.
         */
        
    }

    createNode() {
        /**
         * create an HTML element that will be appended to the task list UI
         */
        const taskList = document.getElementById('taskList');
        const taskBox = document.createElement('li');
        taskBox.innerHTML = `
        <input class="form-check-input" type="checkbox" value="" id="${this.taskId}" onclick=markdone(this.id)>
        <label class="form-check-label" for="${this.taskId}" id="task-${this.taskId}">
            ${this.taskText}
        </label>`;
        taskList.appendChild(taskBox);
        return;
    }

    changeStatus() {
        /**
         * Change the status of an existing task
         */
        return false;
    }

    get_task() {
        /**
         * Fetch the current task from localStorage
         */
        return JSON.parse(window.localStorage.getItem(this.taskId));
    }

    get_taskId(){
        return this.taskId;
    }

    get_taskListId(){
        return this.taskListId;
    }
}
