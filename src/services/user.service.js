/* eslint-disable no-unused-vars */
import { CheckOut, Librarian, Member, Reservation } from '../database/models';
import { hashPassword } from '../helpers/user.helpers';

export default class UserService {
  async createMember(data) {
    return Member.create({ ...data, isVerified: true });
  }

  async updateMember(req) {
    const {
      firstName,
      lastName,
      userName,
      password,
      phone,
      gender,
      occupation,
      birthDate
    } = req.body;
    const { id } = req.user;

    const member = await Member.findByPk(id);

    member.name = firstName
      ? [firstName, member.name.split(' ')[1]].join(' ')
      : member.name;
    member.name = lastName
      ? [member.name.split(' ')[0], lastName].join(' ')
      : member.name;
    member.userName = userName || member.userName;
    member.password = password ? hashPassword(password) : member.password;
    member.phone = phone || member.phone;
    member.gender = gender || member.gender;
    member.occupation = occupation || member.occupation;
    member.birthDate = birthDate || member.birthDate;

    return member.save();
  }

  async memberLogin(userName) {
    return Member.findOne({
      where: { userName }
    });
  }

  async updateMemberParts(updates, where) {
    return Member.update(updates, where);
  }

  async getMember(id) {
    return Member.findByPk(id, {
      include: [
        'card',
        {
          model: CheckOut,
          as: 'check_out_members',
          include: ['check_out_books', 'missed_book'],
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
          include: ['check_out_books', 'missed_book'],
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
