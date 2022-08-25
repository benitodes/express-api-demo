const debug = require ('debug')('app:startup');
const config = require('config');
const Joi = require('joi');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');
const logger = require('./middleware/logger');
const auth = require('./auth');
const morgan = require('morgan');

app.set('view engine', 'pug');

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(logger);
app.use(auth);
app.use('/api/courses', courses);
app.use('/', home);

// Configuration

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
};

// PORT
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));