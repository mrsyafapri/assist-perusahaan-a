const jwt = require('jsonwebtoken');
require('dotenv').config();
const { responseError } = require('../utils/responseHandler');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return responseError(res, 'Access denied! No token provided', 401);

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        responseError(res, 'Invalid token', 400);
    }
};

module.exports = auth;
