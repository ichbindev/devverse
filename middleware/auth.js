const jwt = require('jsonwebtoken');

// require('dotenv').config();
// const s = process.env.shhh
const config = require('config');

// middleware has acces to the request response and what happens 'next'
module.exports = function(req, res, next) {
    // Get token from the header **
    const token = req.header('x-auth-token');
    // Check if !token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('itsASecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}