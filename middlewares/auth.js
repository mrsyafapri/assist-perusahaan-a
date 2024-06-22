const jwt = require('jsonwebtoken');
require('dotenv').config();

const Employee = require('../models/employee');
const { responseError } = require('../utils/responseHandler');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return responseError(res, 'Access denied! No token provided', 401);
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        const employee = await Employee.findById(decoded.id);
        if (!employee) {
            return responseError(res, 'Employee not found', 404);
        }
        req.employee = employee;
        next();
    } catch (err) {
        responseError(res, 'Invalid token', 403);
    }
};

module.exports = auth;
