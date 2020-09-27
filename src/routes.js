import express from 'express';
import Auth from './middlewares/Auth.js';
import UserController from './controllers/UserController.js';

const routes = express.Router();

routes.post('/login', UserController.login);
routes.post('/refresh-token', Auth.authorize, Auth.refresToken);
routes.get('/users', Auth.authorize, Auth.authorizeByRole(['admin', 'credit']), UserController.getAll);

export default routes;
