const Card = require('../models/card');
const validityErr = require('../errors/validityErr');
const NotFound = require('../errors/NotFound');

module.exports.getCard = (req, res) => {
  Card.find({})
    .orFail(() => {
      throw new NotFound(`Пользователь ${req.user._id} не найден`);
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => validityErr(res, err));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => validityErr(res, err));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFound(`Пользователь ${req.user._id} не найден`);
    })
    .then((card) => res.send(card))
    .catch((err) => validityErr(res, err));
};

module.exports.putCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new NotFound(`Пользователь ${req.user._id} не найден`);
    })
    .then((card) => res.send(card))
    .catch((err) => validityErr(res, err));
};

module.exports.deleteCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new NotFound(`Пользователь ${req.user._id} не найден`);
    })
    .then((card) => res.send(card))
    .catch((err) => validityErr(res, err));
};
