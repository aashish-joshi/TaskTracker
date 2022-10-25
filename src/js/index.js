import {storageAvailable, getTaskList} from './functions.js';
import {Task} from './Task.js';
import {v4 as uuidv4} from 'uuid';

const VERSION = 1.0;
console.info(`TaskTracker version ${VERSION}`);

window.addEventListener('load', () => {

    getTaskList();

    if(!storageAvailable('localStorage')){

        console.error('Unable to access localStorage');
        const errMsg = document.createElement('p');
        errMsg.innerText = 'Unable to access localStorage';
        errMsg.classList.add("text-danger");
        return;
    }

    const taskForm = document.getElementById('addTask');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const uuid = uuidv4();
        const submittedData = new FormData(taskForm);
        const task = submittedData.get('addtask');

        const taskItem = new Task(uuid,'default');
        taskItem.storeTask(task);
        taskItem.createNode();

        taskForm.reset();
        return false;
    })
    

})
