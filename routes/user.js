const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { patternUrl } = require('../constant');
const {
  getUsers, getUserId, getCurrentUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getCurrentUser)
router.get('/:id', getUserId);


router.patch('/me', updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(patternUrl)
  })
}),
updateUserAvatar);

module.exports = router;
