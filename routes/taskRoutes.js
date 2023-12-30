import * as dotenv from 'dotenv';
dotenv.config();

import Express from 'express';
import cors from 'cors';
import {TaskController} from '../controller/taskController.js';
import {corsConfig} from '../common/constants.js';

const router = Express.Router();

const taskCorsConfig = corsConfig;
taskCorsConfig.methods = 'POST, GET, PUT, DELETE';

router.get('/', cors(taskCorsConfig), TaskController.get_all_tasks);
router.post('/', cors(taskCorsConfig), TaskController.add_new_task);
router.get('/:id', cors(taskCorsConfig), TaskController.get_one_task);
router.put('/:task_id', cors(taskCorsConfig), TaskController.update_task);
router.delete('/:task_id', cors(taskCorsConfig), TaskController.delete_task);
export {router};
