const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

const Employee = require('../models/employee');
const { responseSuccess, responseError, handleAxiosError } = require('../utils/responseHandler');

const { ABSENSI_SERVICE, SECRET_TOKEN, JWT_EXPIRES_IN } = process.env;

const register = async (req, res) => {
    const { name, position, email, password, isAdmin } = req.body;

    try {
        const existingEmployee = await Employee.exists({ email });
        if (existingEmployee) {
            return responseError(res, 'Email already exists', 400);
        }

        const employee = new Employee({ name, position, email, password, isAdmin });
        const savedEmployee = await employee.save();
        responseSuccess(res, savedEmployee, 'Employee registered successfully', 201);
    } catch (err) {
        responseError(res, "Invalid data", 400);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const employee = await Employee.findOne({ email }).select('+password');
        if (employee && await bcrypt.compare(password, employee.password)) {
            const expiresIn = JWT_EXPIRES_IN;
            const token = jwt.sign({ id: employee._id }, SECRET_TOKEN, { expiresIn });
            responseSuccess(res, { token, expiresIn }, 'Logged in successfully', 200);
        } else {
            responseError(res, 'Incorrect email or password', 400);
        }
    } catch (err) {
        responseError(res, 'Internal server error', 500);
    }
};

const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.employee.id).select('-password');
        if (!employee) {
            return responseError(res, 'Employee not found', 404);
        }
        responseSuccess(res, employee, 'Employee details fetched successfully', 200);
    } catch (err) {
        responseError(res, 'Internal server error', 500);
    }
};

const updateEmployee = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'position', 'password', 'isAdmin'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return responseError(res, 'Invalid data', 400);
    }

    try {
        const employee = await Employee.findByIdAndUpdate(req.employee.id, req.body, { new: true, runValidators: true });
        if (!employee) {
            return responseError(res, 'Employee not found', 404);
        }
        responseSuccess(res, employee, 'Employee updated successfully', 200);
    } catch (err) {
        responseError(res, "Invalid data", 400);
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.employee.id);
        if (!employee) {
            return responseError(res, 'Employee not found', 404);
        }
        responseSuccess(res, null, 'Employee deleted successfully', 204);
    } catch (err) {
        responseError(res, 'Internal server error', 500);
    }
};

const markAttendance = async (req, res) => {
    const { date, status } = req.body;
    const authToken = req.headers.authorization.split(' ')[1];

    try {
        const response = await axios.post(`${ABSENSI_SERVICE}/mark`, {
            date, status
        }, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        responseSuccess(res, response.data.data, response.data.message, response.status);
    } catch (error) {
        handleAxiosError(error, res);
    }
};

const requestLeave = async (req, res) => {
    const { startDate, endDate, reason } = req.body;
    const authToken = req.headers.authorization.split(' ')[1];

    try {
        const response = await axios.post(`${ABSENSI_SERVICE}/leave`, {
            startDate, endDate, reason
        }, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        responseSuccess(res, response.data.data, response.data.message, response.status);
    } catch (error) {
        handleAxiosError(error, res);
    }
};

const statusLeave = async (req, res) => {
    const { status } = req.body;
    const { id: leaveId } = req.params;
    const authToken = req.headers.authorization.split(' ')[1];

    try {
        const response = await axios.put(`${ABSENSI_SERVICE}/leave/${leaveId}/status`, {
            status
        }, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        responseSuccess(res, response.data.data, response.data.message, response.status);
    } catch (error) {
        handleAxiosError(error, res);
    }
};

const generateReport = async (req, res) => {
    const { startDate, endDate } = req.query;
    const authToken = req.headers.authorization.split(' ')[1];

    try {
        const response = await axios.get(`${ABSENSI_SERVICE}/report`, {
            params: { startDate, endDate },
            headers: { Authorization: `Bearer ${authToken}` }
        });
        responseSuccess(res, response.data.data, response.data.message, response.status);
    } catch (error) {
        handleAxiosError(error, res);
    }
};

module.exports = {
    register,
    login,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    markAttendance,
    requestLeave,
    statusLeave,
    generateReport
};
