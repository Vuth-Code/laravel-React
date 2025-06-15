/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createOrder } from '../services/orderService';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Add a listener for the cart-clear event
  useEffect(() => {
    const handleCartClear = () => {
      console.log('Cart clear event received');
      setCart([]);
    };

    window.addEventListener('cart-clear', handleCartClear);

    return () => {
      window.removeEventListener('cart-clear', handleCartClear);
    };
  }, []);

  const addToCart = (product) => {
    // Check if item exists before updating state
    const existingItem = cart.find((item) => item.id === product.id);

    setCart((prevCart) => {
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    toast.success(`${product.title || product.name || 'Product'} ${existingItem ? 'quantity increased' : 'added to cart'}`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const removeFromCart = (productId) => {
    const product = cart.find((item) => item.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    if (product) {
      toast.warn(`${product.name || product.title} removed from cart`, {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
    const product = cart.find((item) => item.id === productId);
    if (product) {
      toast.success(`${product.title} quantity updated to ${quantity}`, {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);

  const getCartAmount = () => cart.reduce((total, item) => {
    const itemPrice = typeof item.price === 'string'
      ? parseFloat(item.price.replace(/[^0-9.-]+/g, ''))
      : Number(item.price);
    return total + (itemPrice || 0) * item.quantity;
  }, 0);

  const placeOrder = async (paymentMethod, shippingDetails, token, paymentDetails = null) => {
    try {
      if (!token) {
        toast.error('Please login to checkout', { position: 'top-right', autoClose: 3000 });
        return { success: false, error: 'Authentication required' };
      }

      if (!cart.length) {
        toast.error('Your cart is empty', { position: 'top-right', autoClose: 3000 });
        return { success: false, error: 'Cart is empty' };
      }

      // Format cart items for the API
      const formattedItems = cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      // Create the order data object with the correct format
      const orderData = {
        items: formattedItems,
        total_amount: getCartAmount(),
        payment_method: paymentMethod,
        shipping_details: shippingDetails,
        payment_status: paymentDetails ? 'paid' : 'pending',
        transaction_id: paymentDetails?.transaction_id || null
      };

      console.log('Sending order data to API:', orderData);

      // Call the API to create the order
      const response = await createOrder(orderData, token);
      console.log('API response:', response);

      // Check if the response indicates success
      if (!response.success) {
        throw new Error(response.message || 'Failed to create order');
      }

      // Create a new order object for the local state
      const newOrder = {
        id: response.order?.id || Date.now(),
        items: cart,
        total: getCartAmount(),
        paymentMethod,
        shipping: shippingDetails,
        payment_details: paymentDetails ? {
          transaction_id: paymentDetails.transaction_id,
          payment_status: paymentDetails.payment_status,
          payment_source: paymentMethod,
        } : null,
        date: new Date().toISOString(),
      };

      // Update the local state
      setOrders((prevOrders) => [...prevOrders, newOrder]);

      // Clear the cart immediately
      setCart([]);
      localStorage.removeItem('cart');

      toast.success('Order placed successfully!', { position: 'top-right', autoClose: 2000 });
      return { success: true, order: response.order };
    } catch (error) {
      console.error('Order placement error:', error);

      // Display a user-friendly error message
      let errorMessage = 'Failed to place order: ' + error.message;
      toast.error(errorMessage, { position: 'top-right', autoClose: 5000 });

      return {
        success: false,
        error: errorMessage,
        details: error.message
      };
    }
  };

  const clearCart = () => {
    console.log('Clearing cart...');

    // Check if cart is already empty to prevent unnecessary operations
    const currentCart = localStorage.getItem('cart');
    const isCartEmpty = !currentCart || currentCart === '[]' || JSON.parse(currentCart).length === 0;

    if (isCartEmpty) {
      console.log('Cart is already empty, skipping clear operation');
      return;
    }

    // Clear state first
    setCart([]);

    // Clear localStorage
    try {
      localStorage.removeItem('cart');
      localStorage.setItem('cart', JSON.stringify([]));

      // Notify other components about cart clearing
      window.dispatchEvent(new CustomEvent('cart-clear'));

      console.log('Cart cleared successfully');
      toast.info('Cart cleared', { position: 'top-right', autoClose: 2000 });
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      orders,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartCount,
      getCartAmount,
      placeOrder,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
