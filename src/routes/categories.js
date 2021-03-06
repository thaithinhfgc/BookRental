const { Category, validate } = require('../models/category')
const validateObjectId = require('../../middleware/validateObjectId');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');


router.get('/', async (req, res) => {
    const categories = await Category.find()
    res.send(categories);
})

router.get('/:id', validateObjectId, async (req, res) => {

    const category = await Category.findById(req.params.id)
    if (!category) return res.status(404).send('category not exist')
    res.send(category);
})

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let category = new Category({ name: req.body.name })
    category = await category.save()
    res.send(category)
})

router.put('/:id', auth, validateObjectId, async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(errors.details[0].message)

    const category = Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!category) return res.status(404).send('category with given id not exist')
    res.send(category)
})

router.delete('/:id', [auth, admin], validateObjectId, async (req, res) => {

    const category = await Category.findByIdAndRemove(req.params.id)
    if (!category) return res.status(404).send('category with given id not exist')
    res.send(category)
})

module.exports = router