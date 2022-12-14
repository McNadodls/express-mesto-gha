const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { patternUrl } = require('../constant');
const {
  getCard, createCard, deleteCard, putCardLike, deleteCardLike,
} = require('../controllers/card');

router.get('/', getCard);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(patternUrl),
  }),
}), createCard);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), putCardLike);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), deleteCardLike);

module.exports = router;
