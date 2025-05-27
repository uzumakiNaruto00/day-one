const Employee = require('../models/Employee');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Public
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeNumber: req.params.id });
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a employee
// @route   POST /api/employees
// @access  Public
const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const createdEmployee = await employee.save();
    res.status(201).json(createdEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a employee
// @route   PUT /api/employees/:id
// @access  Public
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeNumber: req.params.id });
    
    if (employee) {
      Object.keys(req.body).forEach(key => {
        employee[key] = req.body[key];
      });
      
      const updatedEmployee = await employee.save();
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a employee
// @route   DELETE /api/employees/:id
// @access  Public
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeNumber: req.params.id });
    
    if (employee) {
      await employee.deleteOne();
      res.json({ message: 'Employee removed' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
}; 