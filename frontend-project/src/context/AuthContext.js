import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, register, getMe, setAuthToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Load user from local storage and verify with backend
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      console.log('Checking authentication status with stored token:', !!token);
      
      if (token) {
        // Set token in axios headers
        setAuthToken(token);
        
        try {
          // Verify token with backend
          console.log('Fetching user data from backend...');
          const res = await getMe();
          
          console.log('User data response:', res.data);
          
          if (res.data && res.data.data) {
            setUser(res.data.data);
            setIsAuthenticated(true);
            console.log('User authenticated successfully');
          } else {
            console.warn('Backend returned unexpected user data format:', res.data);
            throw new Error('Invalid user data received from server');
          }
        } catch (err) {
          console.error('Auth verification failed:', err);
          
          // If API call failed but we have stored user data, use it temporarily
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              setUser(parsedUser);
              setIsAuthenticated(true);
              console.log('Using cached user data due to API failure');
            } catch (parseErr) {
              console.error('Failed to parse stored user data:', parseErr);
              // Clear invalid data
              localStorage.removeItem('user');
            }
          } else {
            // Clear auth state if no fallback data available
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setAuthToken(null);
            setUser(null);
            setIsAuthenticated(false);
            setError('Your session has expired. Please log in again.');
          }
        }
      } else {
        console.log('No authentication token found');
      }
      
      setLoading(false);
    };

    loadUser();
  }, []);
  // Login user
  const loginUser = async (userData) => {
    setError(null);
    try {
      console.log('Attempting login with:', { email: userData.email });
      const res = await login(userData);
      
      console.log('Login response:', res.data);
      
      if (res.data && res.data.token) {
        // Store token and user data
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        // Set auth token for API calls
        setAuthToken(res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        return true;
      } else {
        console.error('Login response missing token:', res.data);
        throw new Error('No token received from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = 
        err.response?.data?.message || 
        'Login failed. Please check your credentials.';
      
      console.error('Authentication error:', errorMessage);
      setError(errorMessage);
      return false;
    }
  };

  // Register user
  const registerUser = async (userData) => {
    setError(null);
    try {
      const res = await register(userData);
      
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        setAuthToken(res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      return false;
    }
  };

  // Logout user
  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        loginUser,
        registerUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
