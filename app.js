const express = require('express');
const mongoose = require('mongoose');
// Слушаем 3000 порт
const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
    req.user = {
      _id: '637112dec59fba40de4c5844' // вставьте сюда _id созданного в предыдущем пункте пользователя
    };
    next();
  }); 

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.listen(PORT, () => {
    console.log(`App listening on port`)
})




