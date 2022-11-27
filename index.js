require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
// const debug = require ('debug')('app:startup');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

require('./startup/routes')(app);

winston.handleExceptions(new winston.transports.File({ filename: 'unhandleExceptions.log'}))
winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost:27017/video-app' }));

// Connect to Mongodb

mongoose.connect('mongodb://localhost/video-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))

// Check env variable

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
    }

// app.set('view engine', 'pug');

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));