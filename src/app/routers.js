const auth = require('../routes/auth');
const categories = require('../routes/categories')
const authors = require('../routes/authors');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const books = require('../routes/books');
const error = require('../../middleware/error');
require('express-async-errors');
const express = require('express');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/categories', categories);
    app.use('/api/authors', authors);
    app.use('/api/rentals', rentals);
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    app.use('/api/books', books);
    app.use (error);
};
