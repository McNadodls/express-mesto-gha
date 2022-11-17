const Card = require('../models/card');

module.exports.getCard = (req, res) => {
    Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }))
}

module.exports.createCard = (req, res) => {
    const { name, link } = req.body;  
    Card.create({ name, link, owner: req.user._id })
      .then(card => res.send({ data: card }))
      .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId).populate('owner')
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: err.message }))
}

module.exports.putCardLike =(req,res) => {
    Card.findByIdAndUpdate(
            req.params.cardId,
            { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
            { new: true },
        ).populate('owner').populate('likes')
        .then(card => res.send(card))
        .catch(err => res.status(500).send({ message: err.message }))
}

module.exports.deleteCardLike =(req,res) => {
    Card.findByIdAndUpdate(
            req.params.cardId,
            { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
            { new: true },
        ).populate('owner').populate('likes')
        .then(card => res.send(card))
        .catch(err => res.status(500).send({ message: err.message }))
}