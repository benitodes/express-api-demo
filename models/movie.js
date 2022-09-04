const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: { 
        genreSchema,
        required: true
    },
    numberInstock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

const Movie = new mongoose.model('Movie', movieSchema);

// Validate with Joi
function validateMovie(movie) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        genreId: Joi.string().required(),
        numberInstock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });

    return schema.validate(movie);
};

exports.Movie = Movie;
exports.validate = validateMovie;