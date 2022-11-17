const express = require('express');
const mongoose = require('mongoose');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

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




