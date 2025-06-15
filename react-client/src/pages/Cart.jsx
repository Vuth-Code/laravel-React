import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ShopContext } from '../contexts/ShopContext';
import { getToken } from '../services/authService';
import { getImageUrl } from '../utils/imageUtils';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartCount, getCartAmount } = useContext(CartContext);
  const { currency } = useContext(ShopContext);
  const navigate = useNavigate();
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, parseInt(newQuantity));
  };
  const handleCheckout = () => {
    const token = getToken();
    if (!token) {
      navigate('/login', { state: { from: '/place-order' } });
      return;
    }
    navigate('/place-order');
  };

  // Helper function to ensure price is a number
  const formatPrice = (price) => {
    // Convert to number, default to 0 if invalid
    const numPrice = Number(price) || 0;
    return numPrice.toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="container py-5 mt-4">
        <div className="text-center">
          <h2>Your cart is empty</h2>
          <p className="mb-4">Add some products to your cart to continue shopping</p>
          <Link to="/shop" className="btn btn-dark px-4 py-2">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">Your Cart</h2>

      <div className="row">
        <div className="col-lg-8 pe-lg-4">
          {cart.map(item => (
            <div key={item.id} className="card mb-3 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="img-fluid"
                      style={{ maxHeight: '100px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <h5 className="card-title fw-bold">{item.product_name || item.title}</h5>
                    <p className="card-text text-muted">{currency}{formatPrice(item.price)}</p>
                  </div>
                  <div className="col-md-3">
                    <div className="input-group">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        style={{ width: '40px' }}
                      >-</button>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        min="1"
                        style={{ maxWidth: '60px' }}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        style={{ width: '40px' }}
                      >+</button>
                    </div>
                  </div>
                  <div className="col-md-2 text-end">
                    <p className="fw-bold fs-25">{currency}{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <div className="col-md-1 text-center">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                      style={{ borderRadius: '4px' }}
                    >
                    -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card border border-1 shadow-sm" style={{ borderRadius: '4px' }}>
            <div className="card-body p-4">
              <h5 className="card-title fw-bold mb-4">Order Summary</h5>

              <div className="d-flex justify-content-between mb-3">
                <p className="card-text mb-0">Items ({getCartCount()}):</p>
                <p className="card-text mb-0 fw-medium">{currency}{getCartAmount().toFixed(2)}</p>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <p className="card-text mb-0">Shipping:</p>
                <p className="card-text mb-0 text-success">Free</p>
              </div>

              <hr className="my-4" />

              <div className="d-flex justify-content-between mb-4">
                <p className="card-text mb-0 fw-bold">Total:</p>
                <p className="card-text mb-0 fw-bold">{currency}{getCartAmount().toFixed(2)}</p>
              </div>

              <button
                className="btn w-100 mb-3 py-3 fw-medium text-uppercase"
                onClick={handleCheckout}
                style={{
                  backgroundColor: '#5c9dc0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  letterSpacing: '1px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#4a89a7';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#5c9dc0';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="btn w-100 py-3 fw-medium text-uppercase"
                style={{
                  backgroundColor: '#222',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  letterSpacing: '1px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#222';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
