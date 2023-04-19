const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiration } = require("./jwtConfig");

const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    firstname: user.firstname
    ,lastname: user.lastname
    ,address: user.address
    ,city: user.city
    ,gender: user.gender, birthday: user.birthday
    ,username: user.username
    ,email: user.email
    ,image: user.image
  }, jwtSecret, { expiresIn: jwtExpiration });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  generateToken,
  verifyToken,
};