const express = require('express');
const router = express.Router();
const { Movie, validate } = require('..models/movie');

// GET genres Route

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

