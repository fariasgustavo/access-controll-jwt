import express from 'express';
import Auth from './middlewares/Auth.js';
import AuthController from './controllers/AuthController.js';
import UserController from './controllers/UserController.js';

const routes = express.Router();

routes.post('/token', AuthController.token);
routes.get(
  '/users/all',
  Auth.authorize,
  Auth.authorizeByRole(['admin', 'credit']),
  UserController.all,
);

export default routes;
