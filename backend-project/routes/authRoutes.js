const express = require('express');
const { register, login, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Auth check endpoint for debugging
router.get('/status', (req, res) => {
  // This route doesn't require authentication and can be used to check API status
  res.status(200).json({
    success: true,
    message: 'Authentication service is running',
    timestamp: new Date().toISOString()
  });
});

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);

module.exports = router;
