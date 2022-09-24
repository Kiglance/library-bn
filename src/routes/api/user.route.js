import express from 'express';
import UserController from '../../controllers/user.controller';
import {
  checkEmailExist,
  checkLoggedIn,
  checkMemberExist,
  checkVerifiedMember,
  isLibrarian,
  isMember
} from '../../middlewares/user.middleware';
import {
  loginLibrarianValidation,
  loginMemberValidation,
  registerMemberValidation,
  updateCardStatusValidation,
  updateMemberValidation
} from '../../validations/user.validation';

const routes = express.Router();

routes.post(
  '/members/login',
  loginMemberValidation,
  checkVerifiedMember,
  async (req, res) => {
    await new UserController().memberLogin(req, res);
  }
);

routes.post(
  '/members/register',
  registerMemberValidation,
  checkEmailExist,
  async (req, res) => {
    await new UserController().createMember(req, res);
  }
);

routes.post(
  '/members/register/librarian',
  checkLoggedIn,
  isLibrarian,
  registerMemberValidation,
  checkEmailExist,
  async (req, res) => {
    await new UserController().createMember(req, res);
  }
);

routes.patch(
  '/members/update',
  updateMemberValidation,
  checkLoggedIn,
  isMember,
  async (req, res) => {
    await new UserController().updateMember(req, res);
  }
);

routes.get('/verify-email/:token', async (req, res) => {
  await new UserController().verifyMember(req, res);
});

routes.get('/members', checkLoggedIn, isMember, async (req, res) => {
  await new UserController().getMember(req, res);
});

routes.get('/members/all', checkLoggedIn, isLibrarian, async (req, res) => {
  await new UserController().getAllMembers(req, res);
});

routes.patch(
  '/members/:id/status',
  checkLoggedIn,
  isLibrarian,
  checkMemberExist,
  updateCardStatusValidation,
  async (req, res) => {
    await new UserController().updateCardStatus(req, res);
  }
);

routes.post('/librarians/login', loginLibrarianValidation, async (req, res) => {
  await new UserController().librarianLogin(req, res);
});

routes.get('/librarians', checkLoggedIn, isLibrarian, async (req, res) => {
  await new UserController().getLibrarian(req, res);
});

export default routes;
