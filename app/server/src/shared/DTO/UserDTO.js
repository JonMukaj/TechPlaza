class UserDTO {
  constructor(user) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
  }
}

module.exports = UserDTO;