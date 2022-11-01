const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

// GET users Route

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
})

// POST user Route

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

    res.send(token);

}) 

// Validate with Joi

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(5).max(50).required(),
    });

    return schema.validate(req);
};

module.exports = router;