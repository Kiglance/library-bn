import express from 'express';
import BookController from '../../controllers/book.controller';
import upload from '../../helpers/multer';
import {
  checkBookCheckedOut,
  checkBookExist,
  checkBookNotCheckedOut,
  checkBookNotExist,
  checkBookReserved
} from '../../middlewares/book.middleware';
import {
  checkCheckedOutCounts,
  checkLoggedIn,
  checkMemberShipActive,
  checkReservationsCounts,
  isLibrarian,
  isMember
} from '../../middlewares/user.middleware';
import {
  createBookValidation,
  updateBookValidation
} from '../../validations/book.validation';

const routes = express.Router();

routes.get('/', upload.none(), async (req, res) => {
  await new BookController().getAllBooks(req, res);
});

routes.get('/:id', upload.none(), checkLoggedIn, async (req, res) => {
  await new BookController().getBook(req, res);
});

routes.post(
  '/',
  upload.single('cover'),
  checkLoggedIn,
  isLibrarian,
  createBookValidation,
  checkBookExist,
  async (req, res) => {
    await new BookController().addBook(req, res);
  }
);

routes.patch(
  '/:id',
  upload.single('cover'),
  checkLoggedIn,
  isLibrarian,
  updateBookValidation,
  checkBookNotExist,
  async (req, res) => {
    await new BookController().updateBook(req, res);
  }
);

routes.delete(
  '/:id',
  checkLoggedIn,
  isLibrarian,
  checkBookNotExist,
  async (req, res) => {
    await new BookController().deleteBook(req, res);
  }
);

routes.post(
  '/check-out/:id',
  checkLoggedIn,
  isMember,
  checkMemberShipActive,
  checkBookNotExist,
  checkCheckedOutCounts,
  checkBookCheckedOut,
  async (req, res) => {
    await new BookController().checkOutBook(req, res);
  }
);

routes.post(
  '/reserve/:id',
  checkLoggedIn,
  isMember,
  checkMemberShipActive,
  checkBookNotExist,
  checkReservationsCounts,
  checkBookReserved,
  checkBookNotCheckedOut,
  async (req, res) => {
    await new BookController().reserveBook(req, res);
  }
);

routes.patch(
  '/extend/:id',
  checkLoggedIn,
  isMember,
  checkMemberShipActive,
  checkBookNotExist,
  checkBookNotCheckedOut,
  async (req, res) => {
    await new BookController().extendBookDeadline(req, res);
  }
);

routes.patch(
  '/return/:id',
  checkLoggedIn,
  isMember,
  checkBookNotExist,
  checkBookNotCheckedOut,
  async (req, res) => {
    await new BookController().returnBook(req, res);
  }
);

export default routes;
