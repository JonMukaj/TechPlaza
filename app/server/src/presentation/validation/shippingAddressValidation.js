const Joi = require('joi');

const shippingSchema = Joi.object({
    userId:Joi.number().allow(null),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    zipcode: Joi.string().allow(null),
  });
  
  module.exports=shippingSchema;