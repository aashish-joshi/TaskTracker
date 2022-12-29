import Express from "express";
import { TaskController } from '../controller/taskController.js';

const router = Express.Router();

router.get('/', TaskController.get_all_tasks);
router.get('/:id', TaskController.get_one_task);
router.post('/', TaskController.add_new_task);
router.post('/:id', TaskController.update_task);
export {router};
