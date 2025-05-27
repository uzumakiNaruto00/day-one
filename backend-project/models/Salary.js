const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  employeeNumber: {
    type: String,
    required: true,
    ref: 'Employee',
  },
  grossSalary: {
    type: Number,
    required: true,
  },
  totalDeduction: {
    type: Number,
    required: true,
  },
  netSalary: {
    type: Number,
    required: true,
  },
  month: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true,
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary; 