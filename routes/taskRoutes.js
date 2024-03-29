import * as dotenv from 'dotenv';
dotenv.config();

import Express from 'express';
import cors from 'cors';
import {TaskController} from '../controller/taskController.js';
import {corsConfig} from '../common/constants.js';

const router = Express.Router();

const taskCorsConfig = corsConfig;
taskCorsConfig.methods = 'POST, GET, PUT, DELETE';

router.options('/', cors(taskCorsConfig));
router.get('/', cors(taskCorsConfig), TaskController.get_all_tasks);
router.post('/', cors(taskCorsConfig), TaskController.add_new_task);
router.options('/:id', cors(taskCorsConfig));
router.get('/:id', cors(taskCorsConfig), TaskController.get_one_task);
router.put('/:id', cors(taskCorsConfig), TaskController.update_task);
router.delete('/:id', cors(taskCorsConfig), TaskController.delete_task);
export {router};
