const auth = require('../routes/auth');
const categories = require('../routes/categories');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
require('express-async-errors');
const express = require('express');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/categories', categories);
    app.use('/api/rentals', rentals);
    app.use('/api/auth', auth);
    app.use('/api/users', users);
};
