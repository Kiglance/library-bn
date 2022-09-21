/* eslint-disable no-unused-vars */
import { sub } from 'date-fns';
import { Op } from 'sequelize';
import { CheckOut, Librarian, Member, Reservation } from '../database/models';

export default class UserService {
  async createMember(data) {
    return Member.create(data);
  }

  async memberLogin(userName) {
    return Member.findOne({
      where: { userName }
    });
  }

  async updateMember(updates, where) {
    return Member.update(updates, where);
  }

  async getMember(id) {
    return Member.findByPk(id, {
      include: [
        'card',
        {
          model: CheckOut,
          as: 'check_out_members',
          where: {
            [Op.or]: [
              {
                returned_date: null
              },
              {
                returned_date: {
                  [Op.gt]: {
                    [Op.col]: 'deadline'
                  }
                }
              }
            ]
          },
          include: 'check_out_books',
          required: false
        },
        {
          model: Reservation,
          as: 'member_reservations',
          include: 'book_reservations',
          required: false
        }
      ]
    });
  }

  async getAllMembers() {
    return Member.findAll({
      include: [
        'card',
        {
          model: Reservation,
          as: 'member_reservations',
          include: 'book_reservations',
          required: false
        },
        {
          model: CheckOut,
          as: 'check_out_members',
          where: {
            // returns all the check outs made that haven't yet been returned or have been returned no later than year
            [Op.or]: [
              { returned_date: { [Op.gte]: sub(new Date(), { years: 1 }) } },
              { returned_date: { [Op.is]: null } }
            ]
          },
          include: 'check_out_books',
          required: false
        }
      ]
    });
  }

  async librarianLogin(userName) {
    return Librarian.findOne({
      where: { userName }
    });
  }

  async getLibrarian(id) {
    return Librarian.findByPk(id);
  }
}
