const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/book', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Could not connect to mongoDB'));
