const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { patternUrl } = require('../constant');
const {
  getUsers, getUserId, getCurrentUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getCurrentUser)
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}),
getUserId);


router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}),updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(patternUrl)
  })
}),
updateUserAvatar);

module.exports = router;
