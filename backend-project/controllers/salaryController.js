const Salary = require('../models/Salary');
const Employee = require('../models/Employee');
const Department = require('../models/Department');

// @desc    Get all salaries
// @route   GET /api/salaries
// @access  Public
const getSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find({});
    res.json(salaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get salaries by employee
// @route   GET /api/salaries/employee/:id
// @access  Public
const getSalariesByEmployee = async (req, res) => {
  try {
    const salaries = await Salary.find({ employeeNumber: req.params.id });
    if (salaries.length > 0) {
      res.json(salaries);
    } else {
      res.status(404).json({ message: 'Salaries not found for this employee' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a salary
// @route   POST /api/salaries
// @access  Public
const createSalary = async (req, res) => {
  try {
    // Check if employee exists
    const employee = await Employee.findOne({ employeeNumber: req.body.employeeNumber });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Get department details
    const department = await Department.findOne({ departmentCode: employee.departmentCode });
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Create salary record with calculated net salary
    const salaryData = {
      ...req.body,
      grossSalary: department.grossSalary,
      netSalary: department.grossSalary - req.body.totalDeduction
    };
    
    const salary = new Salary(salaryData);
    const createdSalary = await salary.save();
    res.status(201).json(createdSalary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get payroll report (for all employees or specific month)
// @route   GET /api/salaries/report
// @access  Public
const getPayrollReport = async (req, res) => {
  try {
    let query = {};
    
    // Filter by month if provided
    if (req.query.month) {
      const month = new Date(req.query.month);
      const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
      const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
      
      query.month = {
        $gte: startOfMonth,
        $lte: endOfMonth
      };
    }
    
    // Get salary data
    const salaryData = await Salary.find(query);
    
    // Fetch employee details for each salary record
    const payrollReport = await Promise.all(
      salaryData.map(async (salary) => {
        const employee = await Employee.findOne({ employeeNumber: salary.employeeNumber });
        const department = await Department.findOne({ departmentCode: employee.departmentCode });
        
        return {
          employeeNumber: salary.employeeNumber,
          employeeName: `${employee.firstName} ${employee.lastName}`,
          department: department.departmentName,
          grossSalary: salary.grossSalary,
          totalDeduction: salary.totalDeduction,
          netSalary: salary.netSalary,
          month: salary.month
        };
      })
    );
    
    res.json(payrollReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSalaries,
  getSalariesByEmployee,
  createSalary,
  getPayrollReport
}; 