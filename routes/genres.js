const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

const Genre = new mongoose.model('Genre', genreSchema);

// GET genres Route

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

// Get genre route

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) res.status(404).send("The genre with the given ID was not find");
    res.send(genre);
});

// POST genre route

router.post('/', async (req, res) => {
    const result = validateGenre(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    let genre = new Genre({ name: req.body.name});
    genre = await genre.save();
    res.send(genre);
});

// PUT genre route

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).send("The genre with the given ID was not find");
    res.send(genre);
});

// DELETE genre route

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not find');
    res.send(genre);
});

// Validate with Joi
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required()
    });

    return schema.validate(genre);
};

module.exports = router;