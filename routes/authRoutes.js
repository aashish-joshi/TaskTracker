import Express from "express";
import { sendJsonResponse } from "../common/functions.js";
const router = Express.Router();

import { AuthController } from "../controller/authController.js";

router.get("/", (req, res, next) => {
	return sendJsonResponse(req, res, next, 405, "", "method not allowed");
});
router.get("/token", (req, res, next) => {
	return sendJsonResponse(req, res, next, 405, "", "method not allowed");
});

router.post("/signup", AuthController.signup);
router.post("/token", AuthController.get_token);

export { router };
