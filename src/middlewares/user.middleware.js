import 'dotenv/config';
import { Op } from 'sequelize';
import { CheckOut, Librarian, Member, Reservation } from '../database/models';
import { verifyToken } from '../helpers/user.helpers';

export const checkEmailExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailExist = await Member.findOne({
      where: {
        email
      }
    });
    if (emailExist) {
      return res
        .status(409)
        .json({ message: `User with email ${email} already exist` });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      message: 'An Unexpected error occurred',
      error
    });
  }
};

export const checkVerifiedMember = async (req, res, next) => {
  try {
    const { userName } = req.body;
    const user = await Member.findOne({
      where: {
        userName
      }
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (!user.isVerified) {
      return res.status(400).json({
        message: 'Please verify your email'
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

export const checkLoggedIn = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not logged in' });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return res.status(401).json({
        message: 'Invalid Token'
      });
    }

    req.decoded = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Access denied' });
  }
};

export const isMember = async (req, res, next) => {
  try {
    const { type, id } = req.decoded;

    if (type !== 'member') {
      return res.status(400).json({
        message: 'Only members can perfom this action'
      });
    }

    const user = await Member.findOne({
      where: { id },
      include: ['card']
    });

    req.user = user;

    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Access denied' });
  }
};

export const isLibrarian = async (req, res, next) => {
  try {
    const { type, id } = req.decoded;

    if (type !== 'librarian') {
      return res.status(400).json({
        message: 'Only Librarians can perform this action'
      });
    }

    const user = await Librarian.findOne({
      where: { id }
    });

    req.user = user;

    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Access denied' });
  }
};

export const checkCheckedOutCounts = async (req, res, next) => {
  try {
    const { id } = req.user;

    const book = await Member.findOne({
      where: { id },
      include: {
        model: CheckOut,
        as: 'check_out_members',
        where: {
          // returns all the check outs made that haven't yet been returned
          [Op.and]: [{ member_id: id }, { returned_date: { [Op.is]: null } }]
        },
        required: false
      }
    });

    if (book && book.check_out_members.length >= 5) {
      return res.status(403).json({
        message: `You have reached the maximum number (5) of check outs you are allowed`
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

export const checkMemberShipActive = async (req, res, next) => {
  try {
    const {
      card: { status }
    } = req.user;

    if (status !== 'active') {
      return res.status(400).json({
        message: `This action requires you to have a membership`
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

export const checkReservationsCounts = async (req, res, next) => {
  try {
    const { id } = req.user;

    const book = await Member.findOne({
      where: { id },
      include: {
        model: Reservation,
        as: 'member_reservations',
        where: {
          member_id: id
        },
        required: false
      }
    });

    if (book && book.member_reservations.length >= 3) {
      return res.status(403).json({
        message: `You have reached the maximum number (3) of reservations you are allowed to make`
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

export const checkMemberExist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const member = await Member.findByPk(id, { include: ['card'] });

    if (!member) {
      return res.status(400).json({
        message: `Member with id ${id} doesn't exist`
      });
    }

    req.member = member;

    return next();
  } catch (error) {
    return res.status(500).json({
      message: 'An Unexpected error occurred',
      error
    });
  }
};
