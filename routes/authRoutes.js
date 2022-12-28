import Express from "express";
const router = Express.Router();

import { AuthController } from '../controller/authController.js';

router.post('/signup', AuthController.signup);
router.post('/token', AuthController.get_token);

export { router };
