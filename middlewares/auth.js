const jwt = require('jsonwebtoken');
const NotFound = require('../errors/NotFound');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new NotFound('Необходимо авторизоваться'));
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, '123456');
  } catch (err) {
    next(new NotFound('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;
  next();
};