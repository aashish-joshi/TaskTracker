import Express from 'express';
import cors from 'cors';
import {sendJsonResponse} from '../common/functions.js';
import {corsConfig} from '../common/constants.js';
import {AuthController} from '../controller/authController.js';

const router = Express.Router();

router.get('/', (req, res, next) => {
  return sendJsonResponse(req, res, next, 405, '', 'method not allowed');
});
router.get('/token', (req, res, next) => {
  return sendJsonResponse(req, res, next, 405, '', 'method not allowed');
});

const authCorsConfig = corsConfig;
authCorsConfig.methods = 'POST';
router.options('/signup', cors(authCorsConfig));
router.post('/signup', cors(authCorsConfig), AuthController.signup);

router.options('/token', cors(authCorsConfig));
router.post('/token', cors(authCorsConfig), AuthController.get_token);

export {router};
