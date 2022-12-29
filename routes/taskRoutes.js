import * as dotenv from "dotenv";
dotenv.config();

import Express from "express";
import { TaskController } from '../controller/taskController.js';
import { expressjwt } from "express-jwt";

const router = Express.Router();

router.get('/', expressjwt({ secret: process.env.JWT_SECRET, algorithms: [process.env.JWT_ALGO]}), TaskController.get_all_tasks);
router.get('/:id', TaskController.get_one_task);
router.post('/', TaskController.add_new_task);
router.post('/:id', TaskController.update_task);
export {router};
