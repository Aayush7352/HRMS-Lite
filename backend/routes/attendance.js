const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

/* ============================
   GET ATTENDANCE (FILTER + MONTH)
   GET /api/attendance
============================ */
router.get('/', async (req, res) => {
  try {
    const { employeeId, startDate, endDate } = req.query;
    const filter = {};

    if (employeeId) filter.employeeId = employeeId;

    if (startDate && endDate) {
      filter.date = {
        $gte: startDate,
        $lte: endDate
      };
    }

    const records = await Attendance.find(filter).sort({ date: 1 });

    const enriched = await Promise.all(
      records.map(async (r) => {
        const emp = await Employee.findOne({ employeeId: r.employeeId });
        return {
          _id: r._id,
          employeeId: r.employeeId,
          employeeName: emp ? emp.fullName : 'Unknown',
          department: emp ? emp.department : 'N/A',
          date: r.date,
          status: r.status
        };
      })
    );

    res.json({
      success: true,
      data: enriched
    });
  } catch (err) {
    console.error('GET ATTENDANCE ERROR:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to load attendance records'
    });
  }
});

/* ============================
   MARK ATTENDANCE
   POST /api/attendance
============================ */
router.post('/', async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const emp = await Employee.findOne({ employeeId });
    if (!emp) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const exists = await Attendance.findOne({ employeeId, date });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Attendance already marked for this date'
      });
    }

    const attendance = await Attendance.create({
      employeeId,
      date,
      status
    });

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: attendance
    });
  } catch (err) {
    console.error('MARK ATTENDANCE ERROR:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to mark attendance'
    });
  }
});

/* ============================
   ATTENDANCE SUMMARY
   GET /api/attendance/summary/:employeeId
============================ */
router.get('/summary/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;

    const emp = await Employee.findOne({ employeeId });
    if (!emp) {
      return res.json({
        success: true,
        data: {
          employeeId,
          employeeName: 'Unknown',
          totalPresent: 0,
          totalAbsent: 0
        }
      });
    }

    const records = await Attendance.find({ employeeId });

    const totalPresent = records.filter(r => r.status === 'Present').length;
    const totalAbsent = records.filter(r => r.status === 'Absent').length;

    res.json({
      success: true,
      data: {
        employeeId,
        employeeName: emp.fullName,
        totalPresent,
        totalAbsent
      }
    });
  } catch (err) {
    console.error('SUMMARY ERROR:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attendance summary'
    });
  }
});

module.exports = router;