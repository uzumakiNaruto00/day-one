const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      // Or from cookie if present
      token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
      console.log('Auth failed: No token provided');
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required. Please log in.' 
      });
    }

    try {
      // Verify token using the same secret as when creating tokens
      const secret = process.env.JWT_SECRET || 'blackclovers';
      
      // Decode the token
      const decoded = jwt.verify(token, secret);
      
      // Find the user by ID
      const user = await User.findById(decoded.id);
      
      if (!user) {
        console.log(`Auth failed: User not found for token ID: ${decoded.id}`);
        return res.status(401).json({
          success: false,
          message: 'User no longer exists'
        });
      }
      
      // Add user to request object
      req.user = user;
      req.user.role = decoded.role; // Ensure role is available from token
      
      next();
    } catch (jwtError) {
      console.log('JWT verification failed:', jwtError.message);
      return res.status(401).json({
        success: false,
        message: 'Authentication invalid. Please log in again.'
      });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};
