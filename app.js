const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const { PORT = 3000 } = process.env;
const NotFound = require('./errors/NotFound');
const {login, createUser} = require('./controllers/user')
const auth = require('./middlewares/auth')
const { celebrate, Joi } = require('celebrate');
const { patternUrl } = require('./constant');
 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cookieParser());
app.post('/signin', login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(patternUrl)
  })
}),createUser);
app.use(auth); 
app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use((req, res, next) => {
  const error = new NotFound('Такой страницы нет');
  res.status(error.statusCode).send({ message: error.message });
});
app.use(require('./errors/centralizedErrorHandling'))

app.listen(PORT);
