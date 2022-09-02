const mongoose = require('mongoose');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }
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