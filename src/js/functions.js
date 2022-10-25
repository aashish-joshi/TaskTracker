import { Task } from "./Task";

export function storageAvailable(type) {
    /**
     * Check if localstorage is available for use.
     * Based on: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage
     */
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // e.code replaced with other e.name errors.
            e.name === 'NotAllowedError' ||
            e.name === 'UnknownError' ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            (storage && storage.length !== 0);
    }
}

export function getTaskList() {
    /**
     * If the localStorage has the tasklist, fetch all the tasks from it and display on the UI
     */

    const taskList = window.localStorage.getItem('task-list');
    if(taskList){
        const taskArr = Array.from(taskList.split(','));
        console.log(taskArr);
        for (const item in taskArr) {
            const task = JSON.parse(window.localStorage.getItem(taskArr[item]));
            const taskItem = new Task(task.taskId, task.task);
            taskItem.createNode();
        }
    }else{
        console.log('No pending tasks');
    }
}