import { sub } from 'date-fns';
import Joi from 'joi';
import { GenderEnum } from '../utils/enums.util';

const loginMemberValidation = (req, res, next) => {
  const memberSchema = Joi.object({
    userName: Joi.string().required().empty(),
    password: Joi.string()
      .required()
      .empty()
      .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}$/)
      .messages({
        'any.required': '{{#label}} field is required',
        'string.base': '{{#label}} must be of type string',
        'string.empty': '{{#label}} can not be empty',
        'string.pattern.base':
          '{{#label}} must contain atleast a number, upper-case letter, longer than 8 characters, and no space'
      })
  });

  const result = memberSchema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, '')
    });
  } else {
    next();
  }
};

const registerMemberValidation = (req, res, next) => {
  const memberSchema = Joi.object({
    userName: Joi.string().required().empty(),
    firstName: Joi.string().required().empty(),
    lastName: Joi.string().required().empty(),
    password: Joi.string()
      .required()
      .empty()
      .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}$/)
      .messages({
        'any.required': '{{#label}} field is required',
        'string.base': '{{#label}} must be of type string',
        'string.empty': '{{#label}} can not be empty',
        'string.pattern.base':
          '{{#label}} must contain atleast a number, upper-case letter, longer than 8 characters, and no space'
      }),
    email: Joi.string().email().required().empty(),
    phone: Joi.string().required().empty(),
    gender: Joi.any()
      .valid(...GenderEnum)
      .required()
      .empty(),
    occupation: Joi.string().required().empty(),
    birthDate: Joi.date()
      .greater(sub(new Date(), { years: 100 }))
      .message("You can't be 100+ years older")
      .less(new Date())
      .message("Birth Day can't be after today")
      .required()
      .empty()
  });

  const result = memberSchema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, '')
    });
  } else {
    return next();
  }
};

const updateMemberValidation = (req, res, next) => {
  const memberSchema = Joi.object({
    userName: Joi.string().empty(),
    firstName: Joi.string().empty(),
    lastName: Joi.string().empty(),
    password: Joi.string()
      .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}$/)
      .messages({
        'string.base': '{{#label}} must be of type string',
        'string.pattern.base':
          '{{#label}} must contain atleast a number, upper-case letter, longer than 8 characters, and no space'
      }),
    phone: Joi.string().empty(),
    gender: Joi.any()
      .valid(...GenderEnum)
      .empty()
      .messages({
        'any.only': 'Gender can be only male or female'
      }),
    occupation: Joi.string().empty(),
    birthDate: Joi.date()
      .greater(sub(new Date(), { years: 100 }))
      .message("You can't be 100+ years older")
      .less(new Date())
      .message("Birth Day can't be after today")
      .empty()
  });

  const result = memberSchema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, '')
    });
  } else {
    return next();
  }
};

const loginLibrarianValidation = (req, res, next) => {
  const librarianSchema = Joi.object({
    userName: Joi.string().required().empty(),
    password: Joi.string()
      .required()
      .empty()
      .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}$/)
      .messages({
        'any.required': '{{#label}} field is required',
        'string.base': '{{#label}} must be of type string',
        'string.empty': '{{#label}} can not be empty',
        'string.pattern.base':
          '{{#label}} must contain atleast a number, upper-case letter, longer than 8 characters, and no space'
      })
  });

  const result = librarianSchema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, '')
    });
  } else {
    return next();
  }
};

const updateCardStatusValidation = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string()
      .required()
      .empty()
      .valid('active', 'canceled')
      .messages({
        'any.only': 'Status can only be active or canceled'
      })
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, '')
    });
  } else {
    return next();
  }
};

export {
  loginMemberValidation,
  registerMemberValidation,
  loginLibrarianValidation,
  updateCardStatusValidation,
  updateMemberValidation
};
