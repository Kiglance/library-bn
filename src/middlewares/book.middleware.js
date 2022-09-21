/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { Op } from 'sequelize';
import { Book, CheckOut, Reservation } from '../database/models';

export const checkBookExist = async (req, res, next) => {
  try {
    const { ISBN } = req.body;

    const book = await Book.findOne({
      where: { ISBN }
    });

    if (book) {
      return res.status(409).json({
        message: `Book with ISBN ${ISBN} already exist.`
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      message: 'An Unexpected error occurred',
      error
    });
  }
};

export const checkBookNotExist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({
      where: { id },
      include: ['check_out_books']
    });

    if (!book) {
      return res.status(409).json({
        message: `Book with id ${id} doesn't exist.`
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      message: 'An Unexpected error occurred',
      error
    });
  }
};

export const checkBookCheckedOut = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({
      where: { id },
      include: {
        model: CheckOut,
        as: 'check_out_books',
        where: {
          // return a relation where the book_id is id and returned_date is null
          // meaning that this book will be checked_out
          [Op.and]: [{ book_id: id }, { returned_date: { [Op.is]: null } }]
        }
      }
    });

    if (book) {
      return res.status(409).json({
        message: `Book with id ${id} is not available for check out.`
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      message: 'An Unexpected error occurred',
      error
    });
  }
};

export const checkBookNotCheckedOut = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({
      where: { id },
      include: [
        'book_reservations',
        {
          model: CheckOut,
          as: 'check_out_books',
          where: {
            // return a relation where the book_id is id and returned_date is null
            // meaning that this book will be checked_out
            [Op.and]: [{ book_id: id }, { returned_date: { [Op.is]: null } }]
          }
        }
      ]
    });

    if (!book) {
      return res.status(409).json({
        message: `Book with id ${id} is available for check out, you can check it out`
      });
    }

    // make this book available to all other middlewares
    req.book = book;

    return next();
  } catch (error) {
    return res.status(500).json({
      message: 'An Unexpected error occurred',
      error
    });
  }
};

export const checkBookReserved = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({
      where: { id },
      include: {
        model: Reservation,
        as: 'book_reservations',
        where: {
          book_id: id
        }
      }
    });

    if (book) {
      return res.status(409).json({
        message: `Book with id ${id} is not available for reservation.`
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      message: 'An Unexpected error occurred',
      error
    });
  }
};
