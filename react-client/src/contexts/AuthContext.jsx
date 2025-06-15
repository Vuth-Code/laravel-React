/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getToken, setToken, removeToken, getUserProfile, login as apiLogin, register as apiRegister, logout as apiLogout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const initialTokenRef = useRef(getToken());
  const tokenCheckedRef = useRef(false);
  const isFetchingRef = useRef(false);
  const apiCallCounterRef = useRef(0);
  const lastPathRef = useRef(window.location.pathname);

  const isCheckoutFlow = ['/place-order', '/checkout', '/order-success', '/payment'].some(path =>
    lastPathRef.current.includes(path)
  );

  useEffect(() => {
    if (tokenCheckedRef.current || isFetchingRef.current) return;
    tokenCheckedRef.current = true;

    const checkAuth = async () => {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      if (isCheckoutFlow) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      isFetchingRef.current = true;
      const callCount = ++apiCallCounterRef.current;

      try {
        const userData = await getUserProfile();
        if (callCount === apiCallCounterRef.current) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        if (callCount === apiCallCounterRef.current) {
          removeToken();
          setError('Session expired. Please login again.');
        }
      } finally {
        if (callCount === apiCallCounterRef.current) {
          setIsLoading(false);
          isFetchingRef.current = false;
        }
      }
    };

    checkAuth();
  }, [isCheckoutFlow]);

  useEffect(() => {
    const handlePathChange = () => {
      lastPathRef.current = window.location.pathname;
    };
    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await apiLogin(email, password);
      if (!response?.token) throw new Error('Login failed - no token returned');

      setToken(response.token);
      const userData = response.user || await getUserProfile();
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
      throw error;
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const sanitizedData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone || null,
        address: userData.address || null,
        type: 'customer'
      };

      const response = await apiRegister(sanitizedData);
      if (!response?.token) throw new Error('Registration failed - no token returned');

      setToken(response.token);
      const userProfile = response.user || await getUserProfile();
      setUser(userProfile);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
      throw error;
    }
  };

  const logout = async () => {
    setError(null);
    if (isCheckoutFlow) {
      return true;
    }

    try {
      await apiLogout();
    } catch (error) {
    } finally {
      if (!isCheckoutFlow) {
        removeToken();
        setUser(null);
        setIsAuthenticated(false);
        tokenCheckedRef.current = false;
      }
      return true;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      error,
      login,
      register,
      logout,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;