const Joi = require('joi');

const loginSchema = Joi.object({
    email:Joi.string().required() ,
    password:Joi.string().required()
  });


  const signUpSchema=Joi.object({
    email:Joi.string().required() ,
    password:Joi.string().required(),
    confirmPassword:Joi.string().required()
  });


  const refreshSchema=Joi.object({
    accessToken:Joi.string().required() ,
    refreshToken:Joi.string().required()
  });
  
  module.exports={loginSchema,signUpSchema,refreshSchema};