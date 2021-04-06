const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const { User, validate } = require('../models/user');

router.get('/me', async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered')
    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSaltSync(10)
    user.password = await bcrypt.hashSync(user.password, salt)
    await user.save();
    res.send(user)
    //generate token
});

module.exports = router;
