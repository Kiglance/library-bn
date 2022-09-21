/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const createBookValidation = (req, res, next) => {
  const bookSchema = Joi.object({
    ISBN: Joi.string().required().empty(),
    publisher: Joi.string().required().empty(),
    title: Joi.string().required().empty(),
    language: Joi.string().required().empty().lowercase(),
    pages: Joi.number().required().empty(),
    author: Joi.string().required().empty(),
    category: Joi.string().required().empty().lowercase(),
    about: Joi.string().required().empty()
  });

  const result = bookSchema.validate(req.body, { convert: true });
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, '')
    });
  } else {
    return next();
  }
};

export const updateBookValidation = (req, res, next) => {
  const bookSchema = Joi.object({
    ISBN: Joi.string().empty(),
    publisher: Joi.string().empty(),
    title: Joi.string().empty(),
    language: Joi.string().empty().lowercase(),
    pages: Joi.number().empty(),
    author: Joi.string().empty(),
    category: Joi.string().empty().lowercase(),
    about: Joi.string().empty()
  });

  const result = bookSchema.validate(req.body, { convert: true });
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, '')
    });
  } else {
    return next();
  }
};
