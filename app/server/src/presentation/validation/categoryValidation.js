const Joi = require('joi');

const categoryValidator = Joi.object({
    name: Joi.string().required(),
    description:Joi.string().allow(null),
  });
  
  module.exports=categoryValidator;