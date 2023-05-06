const Joi = require('joi');

const userSchema = Joi.object({
    firstname: Joi.string().allow(),
    lastname: Joi.string().allow(null),
    address: Joi.string().allow(null),
    city: Joi.string().allow(null) ,
    gender: Joi.string().allow(null),
    birthday: Joi.date().allow(null),
    username:Joi.string().required() ,
    email:Joi.string().required() ,
    phoneNumber: Joi.string().allow(null) ,
    image: Joi.string().allow(null),
  });
  
  module.exports=userSchema;