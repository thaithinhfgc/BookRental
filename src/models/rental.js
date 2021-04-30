const mongoose = require('mongoose');
const { bookSchema } = require('./book');
const { userSchema } = require('./user');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
    book: {
        type: new mongoose.Schema({

            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            }
        }),
        required: true
    },
    user: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Date,
        min: 0
    }
})

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        bookId: Joi.objectId().min(5).max(50).required(),
        userId: Joi.objectId().min(5).max(50).required()
    };
    return Joi.validate(rental, schema);
};

exports.Rental = Rental;
exports.validate = validateRental;