const Joi = require('joi');

const recordSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  
  module.exports = {
    validateRecord(req, res, next) {
      const { error } = recordSchema.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      next();
    },
  };