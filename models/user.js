const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
        },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
})

const User = new mongoose.model('User', userSchema);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    return token;

}

// Validate with Joi

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(1024).required(),
    });

    return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;