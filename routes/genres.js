const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Dummy genre coz no DB
const genres = [
    {id: 1, name: 'Action' },
    {id: 2, name: 'Horror' },
    {id: 3, name: 'Romance' },
];

// GET genres Route

router.get('/', (req, res) => {
    res.send(genres);
});

// Get genre route

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) res.status(404).send("The genre with the given ID was not find");
    res.send(genre);
});

// POST genre route

router.post('/', (req, res) => {
    const result = validateGenre(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name,
    };

    genres.push(genre);
    res.send(genre);
});

// PUT genre route

router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The genre with the given ID was not find");

    const result = validateGenre(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

// DELETE genre route

router.delete('/:id', (req, res) => {
const genre = genres.find(c => c.id === parseInt(req.params.id));
if (!genre) return res.status(404).send('The genre with the given ID was not find');

const index = genres.indexOf(genre);
genres.splice(index, 1);
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