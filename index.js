
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/video-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))


const config = require('config');
const debug = require ('debug')('app:startup');
const express = require('express');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

// Routes

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const users = require('./routes/users');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const home = require('./routes/home');
const auth = require('./routes/auth');

const logger = require('./middleware/logger');
const morgan = require('morgan');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


app.set('view engine', 'pug');

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(logger);
app.use(auth);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/users', users);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/auth', auth);

app.use('/', home);

// Configuration

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));