# Employee Payroll Management System (EPMS)

A complete MERN Stack application for managing employee payroll information.

## Features

- Employee Management (CRUD operations)
- Department Management (CRUD operations)
- Salary Management (Create and Read operations)
- Payroll Reports with filtering by month

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Additional Libraries**: Axios, React Router DOM

## Project Structure

```
Firstname_Lastname_National_Practical_Exam_2025/
├── backend-project/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend-project/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── tailwind.config.js
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/employeePayrollSystem
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Employees
- GET /api/employees - Get all employees
- GET /api/employees/:id - Get employee by ID
- POST /api/employees - Create new employee
- PUT /api/employees/:id - Update employee
- DELETE /api/employees/:id - Delete employee

### Departments
- GET /api/departments - Get all departments
- GET /api/departments/:id - Get department by ID
- POST /api/departments - Create new department
- PUT /api/departments/:id - Update department
- DELETE /api/departments/:id - Delete department

### Salaries
- GET /api/salaries - Get all salary records
- GET /api/salaries/employee/:id - Get salaries by employee
- POST /api/salaries - Create new salary record
- GET /api/salaries/report - Get payroll report

## Features

1. **Employee Management**
   - Add, edit, and delete employee information
   - View employee list with details
   - Assign employees to departments

2. **Department Management**
   - Add, edit, and delete departments
   - Set gross salary for each department
   - View department list with details

3. **Salary Management**
   - Add salary records for employees
   - View salary history
   - Calculate net salary based on deductions

4. **Payroll Reports**
   - Generate monthly payroll reports
   - Filter reports by month
   - View detailed salary breakdown

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 