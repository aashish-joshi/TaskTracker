export class Task {
    constructor( taskId, taskListId ) {

        this.taskId = taskId;
        this.taskListId = `tasks_${taskListId}`;
        this.lastModified = new Date();

    }
    storeTask(taskText) {
        /**
         * Add a new task to the localStorage
         */
        const createdAt = new Date();

        const taskObject = {
            task: taskText,
            taskId: this.taskId,
            createdAt: createdAt,
            lastModified: createdAt,
            status: 'new'
        };

        const currentTaskList = window.localStorage.getItem(this.taskListId);

        if (currentTaskList){
            // Add to existing task list
            currentTaskList.push(taskObject);
        }else{
            // Create new task list
            window.localStorage.setItem(this.taskListId,[taskObject])
        }

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
        return false;
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
        return false;
    }

    get_taskId(){
        return this.taskId;
    }

    get_taskListId(){
        return this.taskListId;
    }
}
