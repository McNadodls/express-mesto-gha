const jwt = require('jsonwebtoken');
const NotFound = require('../errors/NotFound');
const { JWT_SECRET, NODE_ENV } = process.env;
const { secretKey } = require('../constant')

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Unauthorized('Необходимо авторизоваться'));
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : secretKey);
  } catch (err) {
    next(new Unauthorized('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;
  next();
};