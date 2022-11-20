const User = require('../models/user');
const validityErr = require('../errors/validityErr');
const NotFound = require('../errors/NotFound');

module.exports.getUser = (req, res) => {
  User.find({})
    .orFail(() => {
      throw new NotFound(`Пользователь ${req.user._id} не найден`);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => validityErr(res, err));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => validityErr(res, err));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .orFail(() => {
      throw new NotFound(`Пользователь ${req.user._id} не найден`);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => validityErr(res, err));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound(`Пользователь ${req.user._id} не найден`);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => validityErr(res, err));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound(`Пользователь ${req.user._id} не найден`);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => validityErr(res, err));
};
