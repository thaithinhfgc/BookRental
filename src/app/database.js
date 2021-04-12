const mongoose = require('mongoose');
const winston = require('winston');

mongoose
    .connect('mongodb://localhost/book', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info('Connected to MongoDB'));
