const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const { responseSuccess, responseError } = require('../utils/responseHandler');
require('dotenv').config();

const register = async (req, res) => {
    const { name, position, email, password, isAdmin } = req.body;

    try {
        // Check if the email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return responseError(res, 'Email already exists', 400);
        }

        // Create the new employee
        const employee = new Employee({
            name,
            position,
            email,
            password,
            isAdmin
        });

        // Save the employee to the database
        const savedEmployee = await employee.save();

        responseSuccess(res, savedEmployee, 'Employee registered successfully', 201);
    } catch (err) {
        responseError(res, err.message, 400);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (employee && await bcrypt.compare(password, employee.password)) {
        const token = jwt.sign({ id: employee._id }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        responseSuccess(res, { token }, 'Logged in successfully', 200);
    } else {
        return responseError(res, 'Incorrect email or password', 400);
    }
};

module.exports = {
    register,
    login
};
