const router = require('express').Router();
const {
  getCard, createCard, deleteCard, putCardLike, deleteCardLike,
} = require('../controllers/card');

router.get('/', getCard);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', putCardLike);
router.delete('/:cardId/likes', deleteCardLike);

module.exports = router;
