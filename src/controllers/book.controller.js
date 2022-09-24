/* eslint-disable camelcase */
import { differenceInDays } from 'date-fns';
import { Book, Member, Reservation } from '../database/models';
import { deleteImage, uploadImage } from '../helpers/cloudinary.helpers';
import BookService from '../services/book.service';

export default class BookController {
  constructor() {
    this.bookService = new BookService();
  }

  async getAllBooks(req, res) {
    try {
      const books = await this.bookService.getAllBooks();
      return res.status(200).json({
        message: 'Fetched all books successfully',
        data: { books }
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  async getBook(req, res) {
    try {
      const bookId = req.params.id;
      const userType = req.decoded.type;

      const book = await this.bookService.getBook(bookId, userType);
      return res.status(200).json({
        message: 'Fetched book successfully',
        data: { book }
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  async addBook(req, res) {
    try {
      // Upload image to cloudinary
      let cover;
      try {
        if (req.file) {
          cover = await uploadImage(req.file.path);
        } else {
          // return res.status(400).json({
          //   message: 'Cover image is required'
          // });
        }
      } catch (error) {
        return res.status(400).json({
          message: 'Unable to upload the cover image'
        });
      }

      const book = await this.bookService.addBook({ cover, ...req.body });
      return res.status(201).json({
        message: 'Added book successfully',
        data: { book }
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  async updateBook(req, res) {
    try {
      const { id: bookId } = req.params;

      // Upload image to cloudinary
      let cover;
      try {
        if (req.file) {
          cover = await uploadImage(req.file.path);
        }
      } catch (error) {
        return res.status(400).json({
          message: 'Unable to upload the cover image'
        });
      }

      const book = await this.bookService.updateBook(
        { cover, ...req.body },
        bookId
      );

      return res.status(201).json(
        book[0] <= 0
          ? {
              message: 'Book not updated'
            }
          : {
              message: 'Updated book successfully',
              data: { book: book[1][0] }
            }
      );
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  async deleteBook(req, res) {
    try {
      const { id: bookId } = req.params;

      const book = await Book.findByPk(bookId);

      // delete image on cloudinary
      await deleteImage(book.cover);

      await this.bookService.deleteBook(bookId);

      return res.status(200).json({
        message: 'Deleted book successfully'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  // Check outs controllers
  async checkOutBook(req, res) {
    try {
      const { id: bookId } = req.params;

      const bookCheckOut = await this.bookService.checkOutBook(
        parseInt(bookId, 10),
        req.user.id
      );

      return res.status(200).json({
        message: 'Checked Out the book successfully',
        data: { bookCheckOut }
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  // reservation controllers
  async reserveBook(req, res) {
    try {
      const { id: bookId } = req.params;

      const bookReservation = await this.bookService.reserveBook(
        parseInt(bookId, 10),
        req.user.id
      );

      return res.status(200).json({
        message: 'Reserved book successfully',
        data: { bookReservation }
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  // extend book deadline controllers
  async extendBookDeadline(req, res) {
    try {
      const { id: bookId } = req.params;

      const reserv = await Reservation.findOne({ where: { book_id: bookId } });

      if (reserv) {
        return res.status(400).json({
          message: 'Request refused, The book is already reserved'
        });
      }

      const bookExtended = await this.bookService.extendBookDeadline(
        req.book.check_out_books[0].deadline,
        parseInt(bookId, 10),
        req.user.id
      );

      return res.status(200).json(
        bookExtended[0] <= 0
          ? {
              message: 'Deadline not Extended'
            }
          : {
              message: 'Extended deadline successfully',
              data: { checkOut: bookExtended[1][0] }
            }
      );
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  // return book apis
  async returnBook(req, res) {
    try {
      const { id: bookId } = req.params;
      const { book_reservations } = req.book;

      const CheckOutReturned = await this.bookService.returnBook(
        bookId,
        req.user.id
      );

      if (CheckOutReturned[0] > 0) {
        if (book_reservations[0]) {
          /// check if  there is a reservation and check it out
          const deletedResev = await this.bookService.deleteBookReservation(
            bookId,
            req.user.id
          );
          if (deletedResev === 1) {
            await this.bookService.checkOutBook(
              bookId,
              book_reservations[0].member_id
            );
          }
        }

        // Check if a book deadline was missed and caclulate fine and save the record
        if (
          differenceInDays(
            CheckOutReturned[1][0].returned_date,
            CheckOutReturned[1][0].deadline
          ) > 0
        ) {
          await Member.update(
            { fine: req.user.fine + 10 },
            { where: { id: req.user.id } }
          );
          await this.bookService.recordMissedBook(CheckOutReturned[1][0]);
        }
      }

      return res.status(200).json(
        CheckOutReturned[0] <= 0
          ? {
              message: 'Book not returned'
            }
          : {
              message: 'Book returned successfully',
              data: { checkOut: CheckOutReturned[1][0] }
            }
      );
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }
}
