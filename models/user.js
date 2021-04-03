const mongooses = require("mongoose");
const mongoose = require('mongoose')
const

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },

    email: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50
    },

    isAdmin: Boolean
})

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(225).required()
    }

    return Joi.validate(user, schema);
}

exports.User = User
exports.validate = validateUser