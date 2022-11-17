const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true, 
        minlength: 2, 
        maxlength: 30,
    },
    link:{
        type: String, 
        required: true, 
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
    },
    likes:{
        type: String, 
        default: {},
        required: true, 
        minlength: 2, 
        maxlength: 30,
    },
    createdAt:{
        type: Date, 
        default: Date.now,
        required: true, 
        minlength: 2, 
        maxlength: 30,
    },
})
module.exports = mongoose.model('card', cardSchema);