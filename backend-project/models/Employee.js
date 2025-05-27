const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeNumber: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
  },
  position: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  hiredDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  departmentCode: {
    type: String,
    required: true,
    ref: 'Department',
  },
}, {
  timestamps: true,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee; 