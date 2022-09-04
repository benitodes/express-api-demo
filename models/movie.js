const mongoose = require('mongoose');
const Joi = require('joi');
const genre = require('Genre')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: genreSchema,
    required: true
})

const Movie = new mongoose.model('Movie', movieSchema);

// Validate with Joi
function validateMovie(movie) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        genre: Joi.string()
    });

    return schema.validate(movie);
};

exports.Movie = Movie;
exports.validate = validateMovie;