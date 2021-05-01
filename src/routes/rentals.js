const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { Book } = require('../models/book');
const { Rental, validate } = require('../models/rental');
const auth = require('../../middleware/auth');


router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send('The rental with the given ID was not found');
    res.send(rental);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id);

    const book = await Book.findById(req.body.bookId);
    if (!book) return res.status(400).send('Invalid book ID');

    let rental = new Rental({
        user: {
            _id: user._id,
            name: user.name
        },
        book: {
            _id: book._id,
            title: book.title,
        }

    });
    await rental.save();
    res.send(rental);

})



module.exports = router;
