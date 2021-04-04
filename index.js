const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const app = express();
const auth = require('./routes/auth')
const categories = require('./routes/categories')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const app = express()

mongoose.connect('mongodb://localhost/book')
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Could not connect to mongoDB'))

app.use(express.json())
app.use('/api/categories', categories)
app.use('/api/rentals', rentals)
app.use('/api/auth', auth)
app.use('/api/users', users)
app.use(error)

const port = process.env.PORT || 3000;
app.listen(port, async () => console.log(`Listening on port ${port}`))
