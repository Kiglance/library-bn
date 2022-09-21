import PaymentService from '../services/payment.service';

export default class PaymentController {
  constructor() {
    this.paymentService = new PaymentService();
  }

  async addPayment(req, res) {
    try {
      const payment = await this.paymentService.addPayment(
        req.body,
        req.user.id
      );
      await this.paymentService.clearFine(req.user.id);

      return res.status(201).json({
        message: 'Paid successfully',
        data: { payment }
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  async getAllPayments(req, res) {
    try {
      const payments = await this.paymentService.getAllPayments();

      return res.status(200).json({
        message: 'Fetched payments successfully',
        data: { payments }
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  async getFine(req, res) {
    try {
      const user = await this.paymentService.getFine(req.user.id);

      return res.status(200).json({
        message: 'Fetched your fine amount successfully',
        data: { fine: user.fine }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }
}
