require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const home = require('./routes/home');
const auth = require('./routes/auth');
const debug = require ('debug')('app:startup');

const express = require('express');
const app = express();

winston.handleExceptions(new winston.transports.File({ filename: 'unhandleExceptions.log'}))
winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost:27017/video-app' }));

// Connect to Mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/video-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))

// Check env variable

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
    }

// app.set('view engine', 'pug');

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(auth);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/users', users);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/auth', auth);
app.use('/', home);
app.use(error);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));