import express from 'express';
import PaymentController from '../../controllers/payment.controller';
import {
  checkLoggedIn,
  isLibrarian,
  isMember
} from '../../middlewares/user.middleware';
import { addPaymentValidation } from '../../validations/payment.validation';

const routes = express.Router();

routes.post(
  '/',
  checkLoggedIn,
  isMember,
  addPaymentValidation,
  async (req, res) => {
    await new PaymentController().addPayment(req, res);
  }
);
routes.get('/', checkLoggedIn, isLibrarian, async (req, res) => {
  await new PaymentController().getAllPayments(req, res);
});
routes.get('/fine', checkLoggedIn, isMember, async (req, res) => {
  await new PaymentController().getFine(req, res);
});

export default routes;
