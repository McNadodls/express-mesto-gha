const mongoose = require('mongoose');
const { patternUrl, patternEmail } = require('../constant');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    match: patternUrl,
  },
  email: {
    type: String,
    required: true,
    match: patternEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
module.exports = mongoose.model('user', userSchema);
