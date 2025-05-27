const express = require('express');
const router = express.Router();
const {
  getSalaries,
  getSalariesByEmployee,
  createSalary,
  getPayrollReport
} = require('../controllers/salaryController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getSalaries)
  .post(authorize('admin'), createSalary);

router.route('/employee/:id')
  .get(getSalariesByEmployee);

router.route('/report')
  .get(authorize('admin'), getPayrollReport);

module.exports = router;