const Joi = require('joi')
const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    }
})

const Author = mongoose.model('Author', authorSchema)

function validateAuthor(author) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(author, schema)
}

exports.authorSchema = authorSchema
exports.Author = Author
exports.validate = validateAuthor