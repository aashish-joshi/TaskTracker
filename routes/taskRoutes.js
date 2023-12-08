import * as dotenv from 'dotenv';
dotenv.config();


import Express from 'express';
import {TaskController} from '../controller/taskController.js';


const router = Express.Router();

router.get('/', TaskController.get_all_tasks);
router.post('/', TaskController.add_new_task);
router.get('/:id', TaskController.get_one_task);
router.put('/:task_id', TaskController.update_task);
router.delete('/:task_id', TaskController.delete_task);
export {router};
