/* eslint-disable camelcase */
import { Member, Payment } from '../database/models';

export default class PaymentService {
  async addPayment(
    { amount, cardNumber, ccv, cardHolder, expireDate },
    member_id
  ) {
    return Payment.create({
      amount,
      card_number: cardNumber,
      ccv,
      card_holder: cardHolder,
      expire_date: expireDate,
      member_id
    });
  }

  async getAllPayments() {
    return Payment.findAll();
  }

  async getFine(id) {
    return Member.findByPk(id);
  }

  async clearFine(id) {
    return Member.update({ fine: 0 }, { where: { id } });
  }
}
