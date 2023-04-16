const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/UserRepository');
const { BadRequest, NotFound } = require("../errors/errorHandler");
const RepositoryManager=require("../repositories/RepositoryManager");
const {UserDTO}=require("../shared/DTO/mapper");

class UserService {
  constructor() {
   this.repositoryManager=new RepositoryManager();
  }

  async createUserAsync(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
   // console.log(hashedPassword.toString());
    const userToCreate = {
      ...user,
      passwordhash: hashedPassword.toString()
    };
    return await this.repositoryManager.userRepository.CreateUser(userToCreate);
  }

  async getUserByEmailAsync(email) {
   return await this.repositoryManager.userRepository.GetUserByEmail(email);
  }

  async getUserByIdAsync(id) {
    console.log("here");
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
}

module.exports = UserService;
