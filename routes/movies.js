const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movie');

// GET movie route

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

// POST movie route

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let movie = new Movie({ name: req.body.name, genre: req.body.genre });
    movie = await movie.save();
    res.send(movie);
});

module.exports = router;
