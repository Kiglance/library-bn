/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const addPaymentValidation = (req, res, next) => {
  const paymentSchema = Joi.object({
    amount: Joi.number().required().empty(),
    cardNumber: Joi.string().required().empty(),
    expireDate: Joi.string().required().empty(),
    cardHolder: Joi.string().required().empty(),
    ccv: Joi.string().required().empty()
  });

  const result = paymentSchema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, '')
    });
  } else {
    return next();
  }
};
