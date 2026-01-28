require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const employeeRoutes = require('./routes/employees');
const attendanceRoutes = require('./routes/attendance');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  })
);
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/* ======================
   ROUTES
====================== */
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'HRMS Lite API is running'
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to HRMS Lite API'
  });
});

/* ======================
   ERROR HANDLING
====================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

/* ======================
   DATABASE CONNECTION
====================== */
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI missing in .env file');
  process.exit(1);
}

console.log('MONGO URI =>', process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

/* ======================
   START SERVER
====================== */
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;