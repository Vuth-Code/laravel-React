import { useContext } from 'react';
import { ShopContext } from "../contexts/ShopContext";
import {CartContext} from "../contexts/CartContext";
import { Link, useLocation } from "react-router-dom";
import { logo } from "../assets/index";
import PropTypes from 'prop-types';

const Header = ({ toggleCart }) => {
  const { setShowSearch, navigate, token, user, logout } = useContext(ShopContext);
  const { getCartCount } = useContext(CartContext);
  const location = useLocation();
  
  const handleSearchClick = () => {
    setShowSearch(true);
    navigate("/shop");
  };

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Style for active nav item
  const activeStyle = {
    color: '#5c9dc0',
    fontWeight: '700',
    position: 'relative'
  };

  // Style for the active indicator line
  const activeLineStyle = {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: '0',
    width: '100%',
    height: '2px',
    backgroundColor: '#5c9dc0'
  };
  
  return (
    <header id="header">
      <div id="header-wrap">
        <nav className="secondary-nav border-bottom">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-md-4 header-contact">
                <p>
                  Let&apos;s talk with mee! <strong>+855 61764600</strong>
                </p>
              </div>
              <div className="col-md-4 shipping-purchase text-center">
                <p>Free shipping on a purchase value of $2</p>
              </div>
              <div className="wrap-icon-header flex-w flex-r-m">
                <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                  <i className="icon icon-search" onClick={handleSearchClick}></i>
                </div>
                <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                     data-notify={getCartCount()}
                     onClick={toggleCart}
                >
                  <Link to="/cart" style={isActive('/cart') ? {color: '#5c9dc0'} : {}}>
                    <i className="icon icon-shopping-cart"></i>
                  </Link>
                </div>
                <a
                  href="#"
                  className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                  data-notify="0"
                >
                  <i className="icon icon-heart"></i>
                </a>
              </div>
            </div>
          </div>
        </nav>

        <nav className="primary-nav padding-small">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-lg-2 col-md-2">
                <div className="main-logo">
                  <Link to="/">
                    <img src={logo} alt="logo" />{" "}
                  </Link>
                </div>
              </div>

              <div className="col-lg-10 col-md-10">
                <div className="navbar">
                  <div id="main-nav" className="stellarnav d-flex justify-content-end right">
                    <ul className="menu-list">
                      <li className={`menu-item ${isActive('/') ? 'active' : ''}`}>
                        <Link 
                          to="/" 
                          className="item-anchor d-flex align-item-center" 
                          data-effect="Home"
                          style={isActive('/') ? activeStyle : {}}
                        >
                          Home
                          {isActive('/') && <span style={activeLineStyle}></span>}
                        </Link>
                      </li>
                      <li className={`menu-item ${isActive('/shop') ? 'active' : ''}`}>
                        <Link 
                          to="/shop" 
                          className="item-anchor" 
                          data-effect="Shop"
                          style={isActive('/shop') ? activeStyle : {}}
                        >
                          Shop
                          {isActive('/shop') && <span style={activeLineStyle}></span>}
                        </Link>
                      </li>
                      <li className={`menu-item ${isActive('/blog') ? 'active' : ''}`}>
                        <Link 
                          to="/blog" 
                          className="item-anchor" 
                          data-effect="Blog"
                          style={isActive('/blog') ? activeStyle : {}}
                        >
                          Blog
                          {isActive('/blog') && <span style={activeLineStyle}></span>}
                        </Link>
                      </li>
                      <li className={`menu-item ${isActive('/contact') ? 'active' : ''}`}>
                        <Link 
                          to="/contact" 
                          className="item-anchor" 
                          data-effect="Contact"
                          style={isActive('/contact') ? activeStyle : {}}
                        >
                          Contact
                          {isActive('/contact') && <span style={activeLineStyle}></span>}
                        </Link>
                      </li>
                      <li className={`menu-item ${isActive('/about') ? 'active' : ''}`}>
                        <Link 
                          to="/about" 
                          className="item-anchor" 
                          data-effect="About Us"
                          style={isActive('/about') ? activeStyle : {}}
                        >
                          About Us
                          {isActive('/about') && <span style={activeLineStyle}></span>}
                        </Link>
                      </li>
                      <li className="menu-item">
                        {token ? (
                          <div className="dropdown">
                            <a 
                              className="item-anchor dropdown-toggle" 
                              href="#" 
                              role="button" 
                              id="userDropdown" 
                              data-bs-toggle="dropdown" 
                              aria-expanded="false"
                            >
                              {user?.name || 'Account'}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="userDropdown">
                              <li>
                                <Link 
                                  className={`dropdown-item ${isActive('/profile') ? 'active' : ''}`} 
                                  to="/profile"
                                  style={isActive('/profile') ? {color: '#5c9dc0', fontWeight: 'bold'} : {}}
                                >
                                  My Profile
                                </Link>
                              </li>
                              <li>
                                <Link 
                                  className={`dropdown-item ${isActive('/orders') ? 'active' : ''}`} 
                                  to="/orders"
                                  style={isActive('/orders') ? {color: '#5c9dc0', fontWeight: 'bold'} : {}}
                                >
                                  My Orders
                                </Link>
                              </li>
                              <li><hr className="dropdown-divider" /></li>
                              <li>
                                <button 
                                  className="dropdown-item" 
                                  onClick={logout}
                                >
                                  Logout
                                </button>
                              </li>
                            </ul>
                          </div>
                        ) : (
                          <div className="d-flex gap-3">
                            <Link 
                              to="/login" 
                              className="item-anchor" 
                              data-effect="Login"
                              style={isActive('/login') ? activeStyle : {}}
                            >
                              Login
                              {isActive('/login') && <span style={activeLineStyle}></span>}
                            </Link>
                            <Link 
                              to="/register" 
                              className="item-anchor" 
                              data-effect="Register"
                              style={isActive('/register') ? activeStyle : {}}
                            >
                              Register
                              {isActive('/register') && <span style={activeLineStyle}></span>}
                            </Link>
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  toggleCart: PropTypes.func.isRequired
};

export default Header;