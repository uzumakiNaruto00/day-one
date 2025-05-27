const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/employeePayrollSystem')
  .then(async () => {
    console.log('MongoDB connected successfully');
    
    try {
      // Check if admin user already exists
      const adminExists = await User.findOne({ email: 'admin@example.com' });
      
      if (adminExists) {
        console.log('Admin user already exists');
      } else {
        // Create admin user
        const admin = await User.create({
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'admin123',
          role: 'admin'
        });
        
        console.log('Admin user created successfully:', admin);
      }
      
      // Create a regular test user if needed
      const userExists = await User.findOne({ email: 'user@example.com' });
      
      if (userExists) {
        console.log('Regular test user already exists');
      } else {
        // Create regular user
        const user = await User.create({
          name: 'Test User',
          email: 'user@example.com',
          password: 'user123',
          role: 'user'
        });
        
        console.log('Regular test user created successfully:', user);
      }
      
      process.exit(0);
    } catch (error) {
      console.error('Error creating users:', error);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
