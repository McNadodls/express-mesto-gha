const { getCard, createCard, deleteCard, putCardLike, deleteCardLike} = require('../controllers/card');
const router = require('./user');

router.get('/', getCard);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', putCardLike)
router.delete('/:cardId/likes', deleteCardLike)

module.exports = router;