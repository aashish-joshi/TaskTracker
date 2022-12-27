import {storageAvailable, getTaskList} from './Common/functions.js';
import {Task} from './Task.js';
import {v4 as uuidv4} from 'uuid';
import { VERSION, taskForm } from './Common/constants.js';

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

    function markdone(id){
        const elem = document.getElementById(`task-${id}`);
        elem.classList.toggle('strike');
    }
    

})