import React, { useState, useEffect } from 'react';
import { getEmployees } from '../services/api';

const SalaryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    employeeNumber: '',
    totalDeduction: '',
    month: '',
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="employeeNumber" className="block text-sm font-medium text-gray-700">
            Employee
          </label>
          <select
            name="employeeNumber"
            id="employeeNumber"
            value={formData.employeeNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.employeeNumber} value={employee.employeeNumber}>
                {employee.firstName} {employee.lastName} ({employee.employeeNumber})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="totalDeduction" className="block text-sm font-medium text-gray-700">
            Total Deduction
          </label>
          <input
            type="number"
            name="totalDeduction"
            id="totalDeduction"
            value={formData.totalDeduction}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">
            Month
          </label>
          <input
            type="month"
            name="month"
            id="month"
            value={formData.month}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Salary Record
        </button>
      </div>
    </form>
  );
};

export default SalaryForm; 