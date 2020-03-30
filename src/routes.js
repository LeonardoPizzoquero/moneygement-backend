import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import FacebookUserController from './app/controllers/FacebookUserController';
import SessionController from './app/controllers/SessionController';
import SessionFacebookController from './app/controllers/SessionFacebookController';
import BalanceController from './app/controllers/BalanceController';
import CreditCardController from './app/controllers/CreditCardController';
import TicketController from './app/controllers/TicketController';
import FileController from './app/controllers/FileController';

const upload = multer(multerConfig);

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.post('/facebook_users', FacebookUserController.store);
routes.post('/facebook_sessions', SessionFacebookController.store);

routes.use(authMiddleware);

routes.put('/balances', BalanceController.update);

routes.get('/credit_cards', CreditCardController.index);
routes.post('/credit_cards', CreditCardController.store);

routes.get('/tickets', TicketController.index);
routes.post('/tickets', TicketController.store);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
