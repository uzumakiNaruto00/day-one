import React, { useState, useEffect } from 'react';

const DepartmentForm = ({ department, onSubmit }) => {
  const [formData, setFormData] = useState({
    departmentCode: '',
    departmentName: '',
    grossSalary: '',
  });

  useEffect(() => {
    if (department) {
      setFormData(department);
    }
  }, [department]);

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
          <label htmlFor="departmentCode" className="block text-sm font-medium text-gray-700">
            Department Code
          </label>
          <input
            type="text"
            name="departmentCode"
            id="departmentCode"
            value={formData.departmentCode}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700">
            Department Name
          </label>
          <input
            type="text"
            name="departmentName"
            id="departmentName"
            value={formData.departmentName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="grossSalary" className="block text-sm font-medium text-gray-700">
            Gross Salary
          </label>
          <input
            type="number"
            name="grossSalary"
            id="grossSalary"
            value={formData.grossSalary}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {department ? 'Update Department' : 'Add Department'}
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm; 