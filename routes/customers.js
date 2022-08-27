const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

// GET customers Route

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
})

// GET customer Route

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) res.status(404).send("The customer with the given ID was not find");
    res.send(customer);
})

// POST customer Route

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let customer = new Customer({ 
        name: req.body.name, 
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
})

// PUT customer Route

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let customer = await Customer.findByIdAndUpdate(req.params.id, { 
        name: req.body.name, 
        phone: req.body.phone,
        isGold: req.body.isGold 
    }, 
    {
        new: true
    });

    if (!customer) return res.status(404).send("The customer with the given ID was not find");
    res.send(customer);
})

// DELETE customer Route

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send("The customer with the given ID was not find");
    res.send(customer);
})

// Validate with Joi

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    });

    return schema.validate(customer);
};

module.exports = router;