const Card = require('../models/card');
const { NOT_FOUND, NOT_VALID, SERVER_ERROR } = require('../errors/constatnts');
const NotFound = require('../errors/NotFound');

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(SERVER_ERROR.statusCode).send({ message: SERVER_ERROR.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(NOT_VALID.statusCode).send({ message: NOT_VALID.message });
        return;
      }
      res.status(SERVER_ERROR.statusCode).send({ message: SERVER_ERROR.message });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFound(`Карточка ${req.user._id} не найден`);
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(NOT_FOUND.statusCode).send({ message: err.message });
        return;
      } if (err.name === 'CastError') {
        res.status(NOT_VALID.statusCode).send({ message: NOT_VALID.message });
        return;
      }
      res.status(SERVER_ERROR.statusCode).send({ message: SERVER_ERROR.message });
    });
};

module.exports.putCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new NotFound(`Карточка ${req.user._id} не найден`);
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(NOT_FOUND.statusCode).send({ message: err.message });
        return;
      } if (err.name === 'CastError') {
        res.status(NOT_VALID.statusCode).send({ message: NOT_VALID.message });
        return;
      }
      res.status(SERVER_ERROR.statusCode).send({ message: SERVER_ERROR.message });
    });
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
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(NOT_FOUND.statusCode).send({ message: err.message });
        return;
      } if (err.name === 'CastError') {
        res.status(NOT_VALID.statusCode).send({ message: NOT_VALID.message });
        return;
      }
      res.status(SERVER_ERROR.statusCode).send({ message: SERVER_ERROR.message });
    });
};
