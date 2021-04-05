const express = require('express');
const router = express.Router();

router.get('/me', async (req, res) => {
    res.send(user);
});

router.post('/', async (req, res) => {});

module.exports = router;
