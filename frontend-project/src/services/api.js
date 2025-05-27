import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Employee API calls
export const getEmployees = () => axios.get(`${API_URL}/employees`);
export const getEmployeeById = (id) => axios.get(`${API_URL}/employees/${id}`);
export const createEmployee = (data) => axios.post(`${API_URL}/employees`, data);
export const updateEmployee = (id, data) => axios.put(`${API_URL}/employees/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/employees/${id}`);

// Department API calls
export const getDepartments = () => axios.get(`${API_URL}/departments`);
export const getDepartmentById = (id) => axios.get(`${API_URL}/departments/${id}`);
export const createDepartment = (data) => axios.post(`${API_URL}/departments`, data);
export const updateDepartment = (id, data) => axios.put(`${API_URL}/departments/${id}`, data);
export const deleteDepartment = (id) => axios.delete(`${API_URL}/departments/${id}`);

// Salary API calls
export const getSalaries = () => axios.get(`${API_URL}/salaries`);
export const getSalariesByEmployee = (id) => axios.get(`${API_URL}/salaries/employee/${id}`);
export const createSalary = (data) => axios.post(`${API_URL}/salaries`, data);
export const getPayrollReport = (month) => axios.get(`${API_URL}/salaries/report${month ? `?month=${month}` : ''}`); 