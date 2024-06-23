const express = require("express");

const {
    register,
    login,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    markAttendance,
    requestLeave,
    statusLeave,
    generateReport,
} = require("../controllers/employee");
const auth = require("../middlewares/auth");
const requireAdmin = require('../middlewares/requireAdmin');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Employee's name
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: Employee's email
 *           example: "john.doe@example.com"
 *         position:
 *           type: string
 *           description: Employee's position
 *           example: "Software Engineer"
 *         password:
 *           type: string
 *           description: Employee's password
 *           example: "$2a$10$0XFBWN.RMF6QeX9G9pK/E.qnmdyeU/AFqwXXjHN7vVoqy91/FXjUm"
 *         isAdmin:
 *           type: boolean
 *           description: Whether the employee is an admin
 *           example: false
 *         _id:
 *           type: string
 *           description: Employee ID
 *           example: "66765c46b8ac015b25bf932b"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Record creation timestamp
 *           example: "2024-06-22T09:17:57.246Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Record update timestamp
 *           example: "2024-06-22T09:17:57.246Z"
 *         __v:
 *           type: integer
 *           description: Version key
 *           example: 0
 *     Attendance:
 *       type: object
 *       properties:
 *         employee:
 *           type: string
 *           description: Employee ID
 *           example: "66765c46b8ac015b25bf932b"
 *         date:
 *           type: string
 *           format: date
 *           description: Date of attendance
 *           example: "2024-06-22T00:00:00.000Z"
 *         status:
 *           type: string
 *           enum: [present, absent, late]
 *           description: Attendance status
 *           example: "present"
 *         _id:
 *           type: string
 *           description: ID of the attendance record
 *           example: "667696c51fa40a273e7be9b2"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Record creation timestamp
 *           example: "2024-06-22T09:17:57.246Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Record update timestamp
 *           example: "2024-06-22T09:17:57.246Z"
 *         __v:
 *           type: integer
 *           description: Version key
 *           example: 0
 *     LeaveRequest:
 *       type: object
 *       properties:
 *         employee:
 *           type: string
 *           description: Employee ID
 *           example: "66765c46b8ac015b25bf932b"
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of leave
 *           example: "2024-11-22T12:00:00.000Z"
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of leave
 *           example: "2024-11-25T00:00:00.000Z"
 *         reason:
 *           type: string
 *           description: Reason for leave
 *           example: "liburan ke bali"
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           description: Status of the leave request
 *           example: "pending"
 *         _id:
 *           type: string
 *           description: ID of the leave request
 *           example: "667698661fa40a273e7be9c3"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Record creation timestamp
 *           example: "2024-06-22T09:24:54.321Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Record update timestamp
 *           example: "2024-06-22T09:24:54.321Z"
 *         __v:
 *           type: integer
 *           description: Version key
 *           example: 0
 */

/**
 * @swagger
 * /employee/register:
 *   post:
 *     summary: Register a new employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               position:
 *                 type: string
 *                 example: "Software Engineer"
 *               email:
 *                 type: string
 *                 example: "john.doe@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               isAdmin:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Employee registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Employee registered successfully
 *                 data:
 *                   $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid data or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid data | Email already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post("/register", register);

/**
 * @swagger
 * /employee/login:
 *   post:
 *     summary: Log in an employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Logged in successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     expiresIn:
 *                       type: string
 *       400:
 *         description: Incorrect email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Incorrect email or password
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post("/login", login);

/**
 * @swagger
 * /employee/profile:
 *   get:
 *     summary: Get employee profile
 *     tags: [Employee]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Employee details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Employee details fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Employee not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/profile", auth, getEmployee);

/**
 * @swagger
 * /employee/profile:
 *   put:
 *     summary: Update employee profile
 *     tags: [Employee]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               position:
 *                 type: string
 *                 example: "Software Engineer"
 *               email:
 *                 type: string
 *                 example: "john.doe@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               isAdmin:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Employee updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid data
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Employee not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.put("/profile", auth, updateEmployee);

/**
 * @swagger
 * /employee/profile:
 *   delete:
 *     summary: Delete employee profile
 *     tags: [Employee]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Employee not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.delete("/profile", auth, deleteEmployee);

/**
 * @swagger
 * /employee/mark:
 *   post:
 *     summary: Mark attendance for employee [present, absent, late]
 *     tags: [Employee]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [present, absent, late]
 *     responses:
 *       201:
 *         description: Attendance marked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Attendance marked successfully
 *                 data:
 *                   $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Invalid data or attendance already marked for this date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid data | Attendance already marked for this date
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post("/mark", auth, markAttendance);

/**
 * @swagger
 * /employee/leave:
 *   post:
 *     summary: Request leave for employee
 *     tags: [Employee]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               reason:
 *                 type: string
 *                 example: "Liburan Keluarga"
 *     responses:
 *       201:
 *         description: Leave request submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Leave request submitted successfully
 *                 data:
 *                   $ref: '#/components/schemas/LeaveRequest'
 *       400:
 *         description: Invalid data or end date cannot be earlier than start date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid data | End date cannot be earlier than start date
 *       409:
 *         description: Leave request conflicts with an existing leave request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: Leave request conflicts with an existing leave request
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post("/leave", auth, requestLeave);

/**
 * @swagger
 * /employee/leave/{id}/status:
 *   put:
 *     summary: Update leave request status by admin [approved or rejected]
 *     tags: [Employee]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The leave request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [approved, rejected]
 *     responses:
 *       200:
 *         description: Leave request status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Leave request status updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/LeaveRequest'
 *       400:
 *         description: Invalid status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid status
 *       403:
 *         description: 'Unauthorized: Only admin can perform this action'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: 'Unauthorized: Only admin can perform this action'
 *       404:
 *         description: Leave request not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Leave request not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.put("/leave/:id/status", auth, requireAdmin, statusLeave);

/**
 * @swagger
 * /employee/report:
 *   get:
 *     summary: Get attendance and leave report for a specific period
 *     tags: [Employee]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the report
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the report
 *     responses:
 *       200:
 *         description: Report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Report generated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     attendance:
 *                       type: object
 *                       properties:
 *                         late:
 *                           type: integer
 *                           example: 2
 *                         absent:
 *                           type: integer
 *                           example: 1
 *                     leave:
 *                       type: object
 *                       properties:
 *                         approved:
 *                           type: integer
 *                           example: 2
 *                         rejected:
 *                           type: integer
 *                           example: 0
 *       400:
 *         description: Invalid data or start date and end date are required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid data | Start date and end date are required
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/report", auth, generateReport);

module.exports = router;
