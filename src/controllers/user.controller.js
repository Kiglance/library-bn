/* eslint-disable no-unused-vars */
import { config } from 'dotenv';
import {
  comparePassword,
  generateToken,
  hashPassword,
  verifyToken
} from '../helpers/user.helpers';
import CardService from '../services/card.service';
import UserService from '../services/user.service';

config();

export default class UserController {
  constructor() {
    this.userService = new UserService();
    this.cardService = new CardService();
  }

  async createMember(req, res) {
    try {
      const {
        firstName,
        lastName,
        userName,
        email,
        password,
        phone,
        gender,
        occupation,
        birthDate
      } = req.body;
      const name = `${firstName.trim()} ${lastName.trim()}`;

      // save the new member
      const member = await this.userService.createMember({
        name,
        email,
        password: hashPassword(password),
        userName,
        phone,
        gender,
        occupation,
        birthDate
      });

      // create a card for the new member
      await this.cardService.createCard({ member_id: member.id });

      return res.status(201).json({
        message: 'User registered successfully'
      });
    } catch (error) {
      console.log(error, 'error, ............................');
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  async updateMember(req, res) {
    try {
      const member = await this.userService.updateMember(req);

      return res.status(201).json({
        message: 'User Updated successfully'
      });
    } catch (error) {
      console.log(error, 'error, ............................');
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  async memberLogin(req, res) {
    try {
      const member = await this.userService.memberLogin(req.body.userName);
      const validation = await comparePassword(
        req.body.password,
        member.password
      );
      if (validation) {
        const token = generateToken(
          {
            id: member.id,
            type: member.type
          },
          '7d'
        );
        return res.status(201).header('authenticate', token).json({
          message: 'Logged in successfully',
          data: { token, member }
        });
      }
      return res.status(400).json({ message: 'Invalid credentials' });
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  async verifyMember(req, res) {
    try {
      const { token } = req.params;

      let userInfo;
      try {
        userInfo = verifyToken(token);
      } catch (error) {
        return res.status(400).json({
          message: 'Invalid Token'
        });
      }

      const member = await this.userService.getMember(userInfo.id);

      await this.userService.updateMemberParts(
        { isVerified: true },
        { where: { id: member.id } }
      );

      return res.status(200).send('<h1>Email successfully verified</h1>');
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  async getMember(req, res) {
    try {
      const member = await this.userService.getMember(req.user.id);
      return res.status(200).json({
        message: 'Fetched member successfully',
        data: { member }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  async getAllMembers(req, res) {
    try {
      const members = await this.userService.getAllMembers();
      return res.status(200).json({
        message: 'Fetched members successfully',
        data: { members }
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  async librarianLogin(req, res) {
    try {
      const { userName, password } = req.body;

      const librarian = await this.userService.librarianLogin(userName);

      // Check the librarian userName is in the database
      if (!librarian) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password provided is the one in the database
      const validation = comparePassword(password, librarian.password);
      if (validation) {
        const token = generateToken(
          { id: librarian.id, type: librarian.type },
          '7d'
        );

        return res.status(201).header('authenticate', token).json({
          message: 'Logged in successfully',
          data: { token, librarian }
        });
      }
      return res.status(400).json({ message: 'Invalid credentials' });
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  async getLibrarian(req, res) {
    try {
      const librarian = await this.userService.getLibrarian(req.user.id);

      return res.status(200).json({
        message: 'Fetched librarian successfully',
        data: { librarian }
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An Unexpected error occurred',
        error
      });
    }
  }

  async updateCardStatus(req, res) {
    try {
      const { status } = req.body;
      const {
        card: { id: cardId }
      } = req.member;

      const updatedCard = await this.cardService.updateCard(status, cardId);

      return res.status(201).json(
        updatedCard[0] <= 0
          ? {
              message: 'Status not updated'
            }
          : {
              message: 'Status updated successfully',
              data: { card: updatedCard[1][0] }
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
