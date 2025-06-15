/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout as logoutService, getUserProfile as fetchUserProfileService, getToken } from "../services/authService";
import { getProducts as fetchProductsService } from "../services/productService";

// Corrected context name to ShopContext
export const ShopContext = createContext();

// Corrected provider name to ShopContextProvider
const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(null);
  const currency = "$";
  const delivery_free = 10; // Note: Typo in variable name, should be delivery_fee
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchProductsService();
        setProducts(data.list || []);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      if (token) {
        await logoutService(token);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear token regardless of API success
      setToken(null);
      setUser(null);
      const tokenName = import.meta.env.VITE_AUTH_TOKEN_NAME || 'auth_token';
      localStorage.removeItem(tokenName);
      toast.success('Logged out successfully');
      navigate('/');
    }
  }, [token, navigate]);

  // Fetch user profile when token changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
        // Use the service function instead of direct fetch
        const userData = await fetchUserProfileService(token);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);

        // If we get an authentication error, clear the token
        if (error.message.includes('Unauthenticated') ||
            error.message.includes('401') ||
            error.message.includes('403')) {
          handleLogout();
        }

        // For development - mock a user if the profile can't be loaded
        if (import.meta.env.MODE !== 'production') {
          console.warn('Using mock user profile for development');
          setUser({
            id: 1,
            name: 'Mock User',
            email: 'user@example.com',
            profile: {
              phone: '123-456-7890',
              address: '123 Main Street',
              type: 'customer'
            }
          });
        }
      }
    };

    fetchUserProfile();
  }, [token, handleLogout]);

  const value = {
    products,
    loading,
    error,
    currency,
    delivery_free, // Consider renaming to delivery_fee
    search,
    setSearch,
    showSearch,
    setShowSearch,
    token,
    setToken,
    user,
    setUser,
    logout: handleLogout,
    navigate,
    isAuthenticated: !!token,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
