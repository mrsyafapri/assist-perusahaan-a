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

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, getEmployee);
router.put("/profile", auth, updateEmployee);
router.delete("/profile", auth, deleteEmployee);
router.post("/mark", auth, markAttendance);
router.post("/leave", auth, requestLeave);
router.put("/leave/:id/status", auth, requireAdmin, statusLeave);
router.get("/report", auth, generateReport);

module.exports = router;
