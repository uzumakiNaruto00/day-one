const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentCode: {
    type: String,
    required: true,
    unique: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
  grossSalary: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department; 