const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const escape = require('escape-html');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = process.env;
const { secretKey } = require('../constant')

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  console.log(req.user);
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFound('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFound(`Карточка ${req.user._id} не найден`);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Неправильные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ 
      name, 
      about, 
      avatar, 
      email, 
      password: hash
    }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Такой пользователь уже существует'));
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest('Неправильные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound(`Пользователь ${req.user._id} не найден`);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest('Неправильные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound(`Пользователь ${req.user._id} не найден`);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest('Неправильные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { password, email } = req.body;

  User.findOne({email}).select('+password')
    .then((user) => {
      if (!user) {
       return Promise.reject(new Unauthorized(`Неправильные почта или пароль`));
      }
      
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized(`Неправильные почта или пароль`));
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : secretKey, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7, // 7 дней срок
        httpOnly: true, // из js закрыли доступ
        sameSite: true, // посылать если запрос сделан с того же домена
      });
      res.send(user);
        })
      .catch(next);
  // ...
}; 
