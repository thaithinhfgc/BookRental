const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');
});

module.exports = router;
