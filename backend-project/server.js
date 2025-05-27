const express = require('express');
const app = express();
const cors = require('cors');
const   mongoose  = require('mongoose');
require('dotenv').config()

// Route files
const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const salaryRoutes = require('./routes/salaryRoutes');
const authRoutes = require('./routes/authRoutes');


// Middleware Connections
app.use(cors({
  origin: 'http://localhost:3000', // React dev server
  credentials: true
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

app.use(express.json())

const PORT = process.env.PORT || 5000
// Mongo DB Connections
mongoose.connect('mongodb://localhost:27017/employeePayrollSystem')
.then(response=>{
  console.log('MongoDB Connection Succeeded.')
  app.listen(PORT, ()=>{
    console.log('App running in port: '+PORT)
})
}).catch(error=>{
  console.log('Error in DB connection: ' + error)
});


// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/salaries', salaryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

