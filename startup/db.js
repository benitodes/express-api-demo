const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function (app) {
    mongoose.connect('mongodb://localhost/video-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info('Connected to MongoDB...'))
}