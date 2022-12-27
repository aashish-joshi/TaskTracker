import Express from "express";
import {get_all_tasks, get_one_task} from '../controller/taskController.js';

const router = Express.Router();

router.get('/', get_all_tasks);
router.get('/:id', get_one_task);

export {router};
