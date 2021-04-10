const config = require('config');
const jwt = require('jsonwebtoken')

module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) res.status(401).send('Access denied. No token provided.')

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.')
    }
}