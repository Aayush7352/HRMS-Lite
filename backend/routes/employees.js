const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');

/* =========================
   GET ALL EMPLOYEES
========================= */
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    console.error('GET EMPLOYEES ERROR:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching employees'
    });
  }
});

/* =========================
   CREATE EMPLOYEE  🔥 FIXED
========================= */
router.post('/', async (req, res) => {
  try {
    let { employeeId, fullName, email, department } = req.body;

    // ✅ NORMALIZE INPUT (THIS WAS THE ROOT BUG)
    employeeId = employeeId.trim().toUpperCase();
    email = email.trim().toLowerCase();
    fullName = fullName.trim();
    department = department.trim();

    // Duplicate check
    const existingEmployee = await Employee.findOne({
      $or: [{ employeeId }, { email }]
    });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message:
          existingEmployee.employeeId === employeeId
            ? 'Employee ID already exists'
            : 'Email already exists'
      });
    }

    const employee = await Employee.create({
      employeeId,
      fullName,
      email,
      department
    });

    return res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee
    });
  } catch (error) {
    console.error('CREATE EMPLOYEE ERROR:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating employee'
    });
  }
});

/* =========================
   DELETE EMPLOYEE (by _id)
========================= */
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    await Attendance.deleteMany({ employeeId: employee.employeeId });
    await Employee.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    console.error('DELETE EMPLOYEE ERROR:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting employee'
    });
  }
});

module.exports = router;