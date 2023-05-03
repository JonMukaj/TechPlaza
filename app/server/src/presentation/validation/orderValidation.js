const Joi = require('joi');

const orderValidation = Joi.object({
    total: Joi.number().required(),
    userId:Joi.number().allow(null),
  });
  
  module.exports=orderValidation;