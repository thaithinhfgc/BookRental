const mongoose = require('mongoose');
const Joi = require('joi')
const jwt = require('jsonwebtoken');
const config = require('config');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50,
    },

    email: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },

    isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(225).required(),
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
