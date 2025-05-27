const express = require('express');
const router = express.Router();
const {
  getSalaries,
  getSalariesByEmployee,
  createSalary,
  getPayrollReport
} = require('../controllers/salaryController');

router.route('/').get(getSalaries).post(createSalary);
router.route('/employee/:id').get(getSalariesByEmployee);
router.route('/report').get(getPayrollReport);

module.exports = router; 