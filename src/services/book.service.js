/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import { add } from 'date-fns';
import { Book, CheckOut, Reservation } from '../database/models';

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
      if (!data[dataKeys[0]]) {
        delete data[dataKeys[0]];
      }
    }

    return Book.update(data, { where: { id: bookId }, returning: true });
  }

  async deleteBook(bookId) {
    return Book.destroy({ where: { id: bookId } });
  }

  async chechOutBook(book_id, member_id) {
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
      { where: { book_id, member_id }, returning: true }
    );
  }

  async returnBook(book_id, member_id) {
    return CheckOut.update(
      { returned_date: new Date() },
      { where: { book_id, member_id }, returning: true }
    );
  }
}
