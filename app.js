const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const { PORT = 3000 } = process.env;
const { celebrate, Joi } = require('celebrate');
const NotFound = require('./errors/NotFound');
const { login, createUser, logout } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { patternUrl } = require('./constant');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');

const options = {
origin: [
'http://localhost:3000',
'https://mesto.mcnad.nomoredomains.club',
],
methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
preflightContinue: false,
optionsSuccessStatus: 204,
allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
credentials: true,
};

app.use('*', cors(options)); // ПЕРВЫМ!

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cookieParser());
app.use(requestLogger);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
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
app.get('/logout', logout);
app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));
app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFound('Такой страницы нет'));
});
app.use(require('./errors/centralizedErrorHandling'));

app.listen(PORT);
