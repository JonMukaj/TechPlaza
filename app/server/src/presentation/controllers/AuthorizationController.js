const asyncHandler = require('express-async-handler');
const {BadRequest, NotFound } = require('../../errors/errorHandler');
const ServiceManager=require("../../services/ServiceManager");
const validate = require('../validation/loginValidation');


class AuthorizationController{
    constructor(){
        this.serviceManager=new ServiceManager();
    }

loginUser = asyncHandler( async (req,res)=>{
    const {error , value}=validate.loginSchema.validate(req.body);
    if(error) throw new BadRequest(error.message);

    const token=await this.serviceManager.userService.login(value);
    res.json({accessToken:token});
})

signUp=asyncHandler(async (req,res)=>{
    const {error , value}=validate.signUpSchema.validate(req.body);
    if(error) throw new BadRequest(error.message);

    const user=await this.serviceManager.userService.signUp(value);
    res.json(user);
})

}
module.exports=AuthorizationController;