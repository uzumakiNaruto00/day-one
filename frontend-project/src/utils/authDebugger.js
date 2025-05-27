import { getMe, login } from '../services/api';

/**
 * Utility for debugging authentication state
 */
export const authDebugger = {
  /**
   * Check if a token exists in localStorage
   */
  checkTokenExists: () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    console.log('Token exists:', !!token);
    
    if (token) {
      console.log('Token length:', token.length);
      console.log('Token format valid:', token.split('.').length === 3);
    }
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log('Stored user:', user);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
      }
    } else {
      console.log('No user data stored');
    }
    
    return !!token;
  },
  
  /**
   * Verify token with the backend
   */
  verifyToken: async () => {
    try {
      console.log('Verifying token with backend...');
      const res = await getMe();
      console.log('Token verification successful', res.data);
      return { success: true, data: res.data };
    } catch (error) {
      console.error('Token verification failed', error.response || error);
      return { 
        success: false, 
        error: error.response?.data || error.message
      };
    }
  },
  
  /**
   * Test login with credentials
   */
  testLogin: async (email, password) => {
    try {
      console.log(`Testing login with email: ${email}`);
      const res = await login({ email, password });
      console.log('Login test successful', res.data);
      return { success: true, data: res.data };
    } catch (error) {
      console.error('Login test failed', error.response || error);
      return { 
        success: false, 
        error: error.response?.data || error.message
      };
    }
  },
  
  /**
   * Clear authentication data
   */
  clearAuthData: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('Authentication data cleared');
    return true;
  }
};

export default authDebugger;
