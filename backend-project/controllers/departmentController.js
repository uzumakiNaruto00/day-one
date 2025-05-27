const Department = require('../models/Department');

// @desc    Get all departments
// @route   GET /api/departments
// @access  Public
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single department
// @route   GET /api/departments/:id
// @access  Public
const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findOne({ departmentCode: req.params.id });
    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a department
// @route   POST /api/departments
// @access  Public
const createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    const createdDepartment = await department.save();
    res.status(201).json(createdDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a department
// @route   PUT /api/departments/:id
// @access  Public
const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findOne({ departmentCode: req.params.id });
    
    if (department) {
      Object.keys(req.body).forEach(key => {
        department[key] = req.body[key];
      });
      
      const updatedDepartment = await department.save();
      res.json(updatedDepartment);
    } else {
      res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a department
// @route   DELETE /api/departments/:id
// @access  Public
const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findOne({ departmentCode: req.params.id });
    
    if (department) {
      await department.deleteOne();
      res.json({ message: 'Department removed' });
    } else {
      res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
}; 