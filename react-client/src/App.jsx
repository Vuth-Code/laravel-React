import { Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Feature from "./pages/Feature";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import ShippingInformation from "./components/ShippingInformation";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  
  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };
  
  return (
    <>
      <ToastContainer />
      <Header toggleCart={toggleCart} />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/blog' element={<Blog/>} />
        <Route path='/contact' element={<Contact />}/>
        <Route path='/about' element={<About/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        {/* Protected Routes - Require Authentication */}
        <Route path='/feature' element={
          <ProtectedRoute>
            <Feature />
          </ProtectedRoute>
        } />
        <Route path='/place-order' element={
          <ProtectedRoute>
            <PlaceOrder />
          </ProtectedRoute>
        } />
        <Route path='/order-success' element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute>
            <div className="container py-5">
              <h2>My Profile</h2>
              <p>Profile page coming soon...</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path='/orders' element={
          <ProtectedRoute>
            <div className="container py-5">
              <h2>My Orders</h2>
              <p>Order history page coming soon...</p>
            </div>
          </ProtectedRoute>
        } />
        
        {/* 404 Route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      <ShippingInformation/>
      <Footer/>
    </>
  )
}

export default App;
