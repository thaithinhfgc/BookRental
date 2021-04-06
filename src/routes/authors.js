const express = require('express');
const { ObjectId } = require("mongodb")
const { Author, validate } = require('../models/author')
const router = express.Router();

router.get('/', async (req, res) => {
    const authors = await Author.find();
    res.send(authors);
})

router.get('/:id', async (req, res) => {
    const isValidId = ObjectId.isValid(req.params.id)
    if (!isValidId) return res.status(400).send('Id is invalid')
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).send('The author with given id is not exist')
    res.send(author);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let author = new Author({ name: req.body.name });
    author = await author.save()
    res.send(author);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const isValidId = ObjectId.isValid(req.params.id)
    if (!isValidId) return res.status(400).send('Id is invalid')
    const author = Author.findByIdAndUpdate(res.params.id, { name: req.body.name }, { new: true });
    if (!author) return res.status(404).send('The author with given is is not exist')
});

router.delete('/:id', async (req, res) => {
    const isValidId = ObjectId.isValid(req.params.id)
    if (!isValidId) return res.status(400).send('Id is invalid')
    const author = await Author.findByIdAndRemove(req.params.id);
    if (!author) return res.status(404).send('The author with given is is not exist');
    res.send(author)
})
module.exports = router;