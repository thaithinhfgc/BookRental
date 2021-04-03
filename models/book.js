const mongoose = require('mongoose')
const

const Book = mongoose.model('Books', new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}))