const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;
const { celebrate, Joi } = require('celebrate');
const NotFound = require('./errors/NotFound');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { patternUrl } = require('./constant');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cookieParser());
app.use(requestLogger);
app.post('/signin', login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(patternUrl),
  }),
}), createUser);
app.use(auth);
app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));
app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFound('Такой страницы нет'));
});
app.use(require('./errors/centralizedErrorHandling'));

app.listen(PORT);
