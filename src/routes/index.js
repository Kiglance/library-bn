import express from 'express';
import upload from '../helpers/multer';
import bookRoutes from './api/book.route';
import paymentRoutes from './api/payment.route';
import userRoutes from './api/user.route';

const routes = express.Router();

routes.use('/users', upload.none(), userRoutes);
routes.use('/books', bookRoutes);
routes.use('/payments', upload.none(), paymentRoutes);

export default routes;
