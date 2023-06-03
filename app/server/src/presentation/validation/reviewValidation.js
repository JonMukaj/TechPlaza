const Joi = require('joi');

const reviewValidator = Joi.object({
    rating: Joi.number().required(),
    comment:Joi.string().allow(null),
    productId:Joi.number().required()
  });
  
  module.exports=reviewValidator;