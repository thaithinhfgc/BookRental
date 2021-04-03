const Joi = require('joi')
const mongoose = require('mongoose')
const { categorySchema } = require('./category')

const Book = mongoose.model('Books', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    category: {
        type: categorySchema,
        required: true
    },

    author: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },

    currentAvailable: {
        type: Number,
        require: true,
        min: 0
    },

    totalBook: {
        type: Number,
        require: true,
        min: 0
    },

    publishDay: {
        type: Date,
        required: true
    },
}))

function validateBook(book) {
    const schema = {
        title: Joi.string(),
        bookId: Joi.objectId().required(),
        author: Joi.string().required(),
        currentAvailable: Joi.number().min(0).required(),
        totalBook: Joi.number().min(0).required(),
        publishDay: Joi.date().required()
    }
    return Joi.validate(book, schema)
}

exports.Book = Book;
exports.validate = validateBook;