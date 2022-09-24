import { Op } from 'sequelize';
import { CheckOut, Member, MissedBook } from '../database/models';
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

      // update all missed books to payed
      const misseds = await MissedBook.findAll({
        where: {
          payed: false,
          '$missed_book.check_out_members.id$': {
            [Op.eq]: req.user.id
          }
        },
        include: {
          model: CheckOut,
          as: 'missed_book',
          include: {
            model: Member,
            as: 'check_out_members',
            required: true
          },
          required: true
        }
      });

      await Promise.all([
        misseds.map(
          (missed) =>
            new Promise((res) => {
              missed.payed = true;
              missed.save().then(() => {
                res();
              });
            })
        )
      ]);

      return res.status(201).json({
        message: 'Paid successfully',
        data: { payment }
      });
    } catch (error) {
      console.log(error);
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
