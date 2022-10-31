const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');

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
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(user, ['_id', 'name', 'email']));

    await user.save();

    res.send( _.pick(user, ['_id', 'name', 'email']));
})

// Validate with Joi

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().required(),
        password: Joi.string().min(5).max(50).required(),
    });

    return schema.validate(user);
};

module.exports = router;