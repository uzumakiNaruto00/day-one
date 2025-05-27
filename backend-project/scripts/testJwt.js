const jwt = require('jsonwebtoken');
require('dotenv').config();

// Test token verification
const testTokenVerification = () => {
  try {
    // Example user payload
    const payload = {
      id: '123456789abcdef',
      role: 'admin'
    };

    // Secret key from .env or fallback
    const secret = process.env.JWT_SECRET || 'blackclovers';
    
    console.log('Using JWT secret:', secret);

    // Create token
    const token = jwt.sign(
      payload,
      secret,
      { expiresIn: '30d' }
    );
    
    console.log('Generated test token:', token);

    // Verify the token
    const decoded = jwt.verify(token, secret);
    
    console.log('Token verified successfully!');
    console.log('Decoded payload:', decoded);
    
    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

// Run the test
const result = testTokenVerification();

if (result) {
  console.log('✅ Token verification is working correctly');
} else {
  console.error('❌ Token verification test failed');
}

process.exit(result ? 0 : 1);
