const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./jwtConfig');

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

module.exports = verifyToken;
