/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import { add, differenceInDays } from 'date-fns';
import { Book, CheckOut, MissedBook, Reservation } from '../database/models';

export default class BookService {
  async getAllBooks() {
    return Book.findAll({
      attributes: ['cover', 'title', 'author', 'id', 'ISBN', 'category']
    });
  }

  async getBook(bookId, userType) {
    return Book.findByPk(bookId, {
      include:
        userType === 'member'
          ? [
              {
                model: CheckOut,
                as: 'check_out_books',
                where: { returned_date: null },
                required: false
              },
              'book_reservations'
            ]
          : []
    });
  }

  async addBook(data) {
    return Book.create(data);
  }

  async updateBook(data, bookId) {
    const dataKeys = Object.keys(data);

    for (let i = 0; i < dataKeys.length; i++) {
      // removing all the null fields from the request
      if (!data[dataKeys[0]]) {
        delete data[dataKeys[0]];
      }
    }

    return Book.update(data, { where: { id: bookId }, returning: true });
  }

  async deleteBook(bookId) {
    return Book.destroy({ where: { id: bookId } });
  }

  async checkOutBook(book_id, member_id) {
    return CheckOut.create({ book_id, member_id });
  }

  async reserveBook(book_id, member_id) {
    return Reservation.create({ book_id, member_id });
  }

  async deleteBookReservation(book_id, member_id) {
    return Reservation.destroy({ where: { book_id, member_id } });
  }

  async extendBookDeadline(oldDeadline, book_id, member_id) {
    return CheckOut.update(
      { deadline: add(oldDeadline, { days: 4 }) },
      { where: { book_id, member_id, returned_date: null }, returning: true }
    );
  }

  async returnBook(book_id, member_id) {
    return CheckOut.update(
      { returned_date: new Date() },
      { where: { book_id, member_id, returned_date: null }, returning: true }
    );
  }

  async recordMissedBook(check_out) {
    return MissedBook.create({
      period: Math.abs(
        differenceInDays(check_out.returned_date, check_out.deadline)
      ),
      check_out_id: check_out.id
    });
  }
}
