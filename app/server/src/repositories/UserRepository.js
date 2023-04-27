const { Op } = require('sequelize');
const User = require('../models/entities/Users');

class UserRepository {

  async CreateUser(user) {
    await User.create(user);
    return;
  }

  async GetUserByEmail(email) {
    return await User.findOne({
      where: {
        email: {
          [Op.eq]: email
        }
      }
    });
  }


  async GetUserById(id) {
    return await User.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }


  async UpdateUser(id, user) {
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
      return null;
    }

    await existingUser.update(user.dataValues);
    return;
  }
  



  async DeleteUser(id) {
    return await User.destroy({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }

  async GetUsers() {
    return await User.findAll();
  }
}

module.exports = UserRepository;
