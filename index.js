const mongoose = require('mongoose')
const express = require('express')
const app = express();



mongoose.connect('mongodb://localhost/book')
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Could not connect to mongoDB'))

const port = process.env.PORT || 3000;
app.listen(port, async () => console.log(`Listening on port ${port}`))
