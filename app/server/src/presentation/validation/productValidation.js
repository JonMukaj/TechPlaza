const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    price: Joi.number().allow(null),
    categoryId: Joi.number().integer().required(),
  });
  
  module.exports=productSchema;