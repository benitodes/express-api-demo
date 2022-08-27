
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/video-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))


const debug = require ('debug')('app:startup');
const config = require('config');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
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
app.use('/api/genres', genres);
app.use('/', home);

// Configuration

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));