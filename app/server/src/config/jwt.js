const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiration } = require("./jwtConfig");

const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    roleId:user.roleId,
    firstname: user.firstname
    ,lastname: user.lastname
    ,address: user.address
    ,city: user.city
    ,gender: user.gender, birthday: user.birthday
    ,username: user.username
    ,email: user.email
    ,image: user.image
  }, jwtSecret
  , { expiresIn: jwtExpiration });
};


function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded.id; // Access the 'id' property from the decoded token and assign it to the 'user' property of the request object
    next();
  });
}


module.exports = {
  generateToken,
  verifyToken,
};