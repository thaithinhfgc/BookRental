const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');
const { categorySchema } = require('./category');
const { authorSchema } = require('./author');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    category: {
        type: categorySchema,
        required: true,
    },

    author: {
        type: authorSchema,
        required: true
    },

    currentAvailable: {
        type: Number,
        require: true,
        min: 0,
    },

    totalBook: {
        type: Number,
        require: true,
        min: 0,
    },

    publishDay: {
        type: Date,
        required: true,
    },
});

const Book = mongoose.model('Book', bookSchema);

function validateBook(book) {
    const schema = {
        title: Joi.string().required(),
        categoryId: Joi.objectId().required(),
        authorId: Joi.objectId().required(),
        currentAvailable: Joi.number().min(0).required(),
        totalBook: Joi.number().min(0).required(),
        publishDay: Joi.date().required(),
    };
    return Joi.validate(book, schema);
}

exports.Book = Book;
exports.validate = validateBook;
exports.bookSchema = bookSchema;
