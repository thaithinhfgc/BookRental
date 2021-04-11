const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Book, validate } = require('../models/book')
const { Category } = require('../models/category');
const { Author } = require('../models/author');
const auth = require('../../middleware/auth');
const { ObjectId } = require("mongodb")

router.get('/', async (req, res) => {
    const books = await Book.find();
    res.send(books);
});

router.get('/:id', async (req, res) => {
    const isValidId = ObjectId.isValid(req.params.id)
    if (!isValidId) return res.status(400).send('Book Id is invalid');
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('The book with given Id is invalid.');
    res.send(book);
})

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send('Invalid category');

    const author = await Author.findById(req.body.authorId);
    if (!author) return res.status(400).send('Invalid author');

    const book = new Book({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        author: {
            _id: author._id,
            name: author.name
        },
        currentAvailable: req.body.currentAvailable,
        totalBook: req.body.totalBook,
        publishDay: req.body.publishDay
    });
    await book.save();
    res.send(book);
});

router.put('/:id', auth, async (req, res) => {
    const isValidId = ObjectId.isValid(req.params.id)
    if (!isValidId) return res.status(400).send('Book Id is invalid')
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send('Invalid category');

    const author = await Author.findById(req.body.authorId);
    if (!author) return res.status(400).send('Invalid author');

    const book = await Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        author: {
            _id: author._id,
            name: author.name
        },
        currentAvailable: req.body.currentAvailable,
        totalBook: req.body.totalBook,
        publishDay: req.body.publishDay,
    }, { new: true }
    )

    if (!book) return res.status(404).send('The book with given id not exist');
    res.send(book);
});

router.delete('/:id', auth, async (req, res) => {
    const isValidId = ObjectId.isValid(req.params.id)
    if (!isValidId) return res.status(400).send('book Id is invalid')
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) return res.status(404).send('The book with given id not exist');
    res.send(book);
})

module.exports = router;