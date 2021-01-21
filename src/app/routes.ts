import { Router, Request, Response } from 'express';
import AuthController from './controller/AuthController';
import UserController from './controller/UserController';
import AuthMidlleware from './middlewares/auth';

const routes = Router();

const authController = new AuthController();
const userController = new UserController();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World to Micro Service 1!' })
});

routes.post('/users', userController.store);
routes.post('/login', authController.login);

routes.use(AuthMidlleware);

routes.get('/users', userController.show);

export default routes;
