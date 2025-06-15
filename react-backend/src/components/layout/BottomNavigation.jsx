import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, ShoppingOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around items-center h-16 z-50 md:hidden">
      <Link 
        to="/" 
        className={`flex flex-col items-center justify-center text-xs ${currentPath === '/' ? 'text-blue-500' : 'text-gray-600'}`}
      >
        <HomeOutlined className="text-xl" />
        <span>Home</span>
      </Link>
      
      <Link 
        to="/products" 
        className={`flex flex-col items-center justify-center text-xs ${currentPath === '/products' ? 'text-blue-500' : 'text-gray-600'}`}
      >
        <ShoppingOutlined className="text-xl" />
        <span>Product</span>
      </Link>
      
      <Link 
        to="/customers" 
        className={`flex flex-col items-center justify-center text-xs ${currentPath === '/customers' ? 'text-blue-500' : 'text-gray-600'}`}
      >
        <PhoneOutlined className="text-xl" />
        <span>Contact</span>
      </Link>
      
      <Link 
        to="/profile" 
        className={`flex flex-col items-center justify-center text-xs ${currentPath === '/profile' ? 'text-blue-500' : 'text-gray-600'}`}
      >
        <UserOutlined className="text-xl" />
        <span>Profile</span>
      </Link>
    </div>
  );
};

export default BottomNavigation; 