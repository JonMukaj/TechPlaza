const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/UserRepository');
const { BadRequest, NotFound } = require("../errors/errorHandler");
const RepositoryManager=require("../repositories/RepositoryManager");
const {UserDTO}=require("../shared/DTO/mapper");
const { generateToken } = require("../config/jwt");
const User = require('../models/entities/Users');

class UserService {
  constructor() {
   this.repositoryManager=new RepositoryManager();
  }

  async createUserAsync(user) {
   // const hashedPassword = await bcrypt.hash(user.password, 10);
   // console.log(hashedPassword.toString());
    const userToCreate = {
      ...user,
   //   passwordhash: hashedPassword !=null?hashedPassword.toString(): ""
    };
    return await this.repositoryManager.userRepository.CreateUser(userToCreate);
  }

  async getUserByEmailAsync(email) {
   return await this.repositoryManager.userRepository.GetUserByEmail(email);
  }

  async getUserByIdAsync(id) {
    const user = await this.repositoryManager.userRepository.GetUserById(id);

    if (!user) {
      throw new NotFound(`User with ID ${id} not found`);
    }
    return new UserDTO(user);
  }


  async updateUserAsync(id, user) {
    return await this.repositoryManager.userRepository.UpdateUser(id, user);
  }

  async deleteUserAsync(id) {
    return await this.repositoryManager.userRepository.DeleteUser(id);
  }

  async getUsersAsync() {
    const users= await this.repositoryManager.userRepository.GetUsers();
    const usersDto = users.map(user => new UserDTO(user)); // map each user to a UserDTO object
    return usersDto;
  }


  async registerUser(request) {
    const user = await this.repositoryManager.userRepository.GetUserById(id);
    if (!user) throw new NotFound(`User with ID ${id} not found`);

    const hashedPassword = await bcrypt.hash(user.password, "long!@#!asd15Hash");
    const userToCreate = {
      ...user,
      passwordhash: hashedPassword !=null?hashedPassword.toString(): ""
    };
    return await this.repositoryManager.userRepository.CreateUser(userToCreate);

  }


  async signUp(request)
  {
    const user = await this.repositoryManager.userRepository.GetUserByEmail(request.email);
    if (user) throw new NotFound(`User with email ${request.email} already exists`);

    if(request.password != request.confirmPassword)
    throw new BadRequest(`Password doesnt match!`);

    // Generate a salt
    const salt = bcrypt.genSaltSync(10);
    
    // Hash the password with the salt
    const hashedPassword= bcrypt.hashSync(request.password, salt);

    const userToCreate = {
      ...request,
      passwordHash: hashedPassword !=null?hashedPassword.toString(): ""
    };

    console.log(userToCreate);
    return await this.repositoryManager.userRepository.CreateUser(userToCreate);
    
  }

  async login(request) {
    const user = await this.repositoryManager.userRepository.GetUserByEmail(request.email);
    if (!user) throw new NotFound(`User with email ${request.email} not found`);

    const isValid = await bcrypt.compare(request.password, user.passwordHash);
    if (!isValid)
      throw new BadRequest("Wrong password , try again");

    var token = generateToken(user);
    user.tokenHash = token;
    await this.repositoryManager.userRepository.UpdateUser(user.id, user);
   
    return token;
  }
}

module.exports = UserService;
