const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyJwtToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return next(); // Pass through if public or optional
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
  } catch (err) {
    console.warn('[GATEWAY WARN] JWT verification failed:', err.message);
  }
  next();
}

module.exports = {
  verifyJwtToken
};
