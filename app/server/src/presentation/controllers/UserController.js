const UserService = require('../../services/UserService');
const asyncHandler = require('express-async-handler');
const { NotFound, BadRequest } = require('../../errors/errorHandler');
const ServiceManager=require("../../services/ServiceManager");
const validator=require("../validation/userValidation");




class UserController {
  constructor() {
   // this.userService = new UserService();
  this.serviceManager=new ServiceManager();
  }

  createUser = asyncHandler(async (req, res) => {
    const {error,value}=validator.validate(req.body);
    if(error)
    throw new BadRequest(error.message);

    const user = await this.serviceManager.userService.createUserAsync(value);
    res.json(user);
  });

  getUserByEmail = asyncHandler(async (req, res) => {
    const user = await this.serviceManager.userService.getUserByEmail(req.params.email);
    res.json(user);
  });

  getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user=await this.serviceManager.userService.getUserByIdAsync(id);
     res.json(user);
  });

  updateUser = asyncHandler(async (req, res) => {
    const {error , value}=validator.userUpdate.validate(req.body);
    if(error) throw new BadRequest(error.message);

    console.log(value);
    const user = await this.serviceManager.userService.updateUserAsync(req.params.id, value);
    res.json(user);
  });

  deleteUser = asyncHandler(async (req, res) => {
    await this.serviceManager.userService.deleteUserAsync(req.params.id);
    res.sendStatus(204);
  });

  getUsers = asyncHandler(async (req, res) => {
    const users = await this.serviceManager.userService.getUsersAsync();
    res.json(users);
  });
}

module.exports = UserController;
