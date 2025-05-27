import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create an axios instance with error interceptors
const api = axios.create({
  baseURL: API_URL
});

// Set auth token for API calls
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Add request interceptor to include token in all requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Auto logout if 401 response returned from API
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const register = (userData) => api.post('/auth/register', userData);
export const login = (userData) => api.post('/auth/login', userData);
export const getMe = () => api.get('/auth/me');
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setAuthToken(null);
  return api.get('/auth/logout');
};

// Employee API calls
export const getEmployees = () => api.get('/employees');
export const getEmployeeById = (id) => api.get(`/employees/${id}`);
export const createEmployee = (data) => api.post('/employees', data);
export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

// Department API calls
export const getDepartments = () => api.get('/departments');
export const getDepartmentById = (id) => api.get(`/departments/${id}`);
export const createDepartment = (data) => api.post('/departments', data);
export const updateDepartment = (id, data) => api.put(`/departments/${id}`, data);
export const deleteDepartment = (id) => api.delete(`/departments/${id}`);

// Salary API calls
export const getSalaries = () => api.get('/salaries');
export const getSalariesByEmployee = (id) => api.get(`/salaries/employee/${id}`);
export const createSalary = (data) => api.post('/salaries', data);
export const getPayrollReport = (month) => api.get(`/salaries/report${month ? `?month=${month}` : ''}`);