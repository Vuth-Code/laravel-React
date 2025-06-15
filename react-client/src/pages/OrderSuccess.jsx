import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ShopContext } from '../contexts/ShopContext';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orders, clearCart } = useContext(CartContext);
  const { currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState(null);

  // Get the latest order from context or from location state
  const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  useEffect(() => {
    console.log("OrderSuccess page mounted");
    console.log("Location state:", location.state);
    console.log("Latest order from context:", latestOrder);

    // Only clear cart if it hasn't been cleared already
    // Check if we have the orderCompleted flag in location state
    if (!location.state?.orderCompleted) {
      console.log("Cart not yet cleared, clearing now");
      // Clear cart only if not already cleared
      if (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).length > 0) {
        clearCart();
      }
    } else {
      console.log("Cart already cleared, skipping clearCart");
    }

    // Check if we have order data from navigation state
    if (location.state?.orderId) {
      // If we have state data but no latestOrder, we can use this
      console.log("Using order data from navigation state");
      setOrderData({
        id: location.state.orderId,
        total: location.state.orderTotal,
        // Add other needed fields with defaults
        date: new Date().toISOString(),
        items: [],
        paymentMethod: location.state.paymentMethod || "paypal"
      });
    } else if (!latestOrder) {
      console.log("No order data found, redirecting to home");
      navigate('/');
    }
  }, [latestOrder, navigate, clearCart, location.state]);

  // Use either the latest order from context or the order data from state
  const orderToDisplay = orderData || latestOrder;

  if (!orderToDisplay) {
    return null;
  }

  return (
    <div className="container py-5 my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-check-lg" style={{ fontSize: '40px' }}></i>
                </div>
                <h2 className="h3 mb-2">Order Placed Successfully!</h2>
                <p className="text-muted">Thank you for your purchase</p>
              </div>

              <div className="border-top border-bottom py-4 mb-4">
                <h5 className="mb-3">Order Summary</h5>
                <div className="row">
                  <div className="col-6">
                    <p className="text-muted mb-1">Order ID</p>
                    <p className="fw-bold">{orderToDisplay.id}</p>
                  </div>
                  <div className="col-6 text-end">
                    <p className="text-muted mb-1">Order Date</p>
                    <p className="fw-bold">{new Date(orderToDisplay.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Only render items if they exist */}
              {orderToDisplay.items && orderToDisplay.items.length > 0 ? (
                <>
                  <h5 className="mb-3">Items Ordered</h5>
                  {orderToDisplay.items.map((item, index) => (
                    <div key={index} className="d-flex mb-3 align-items-center">
                      <img
                        src={`http://localhost:8000/storage/${item.image}`}
                        alt={item.title || item.product_name}
                        className="img-fluid rounded"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                      <div className="ms-3 flex-grow-1">
                        <h6 className="mb-1">{item.title || item.product_name}</h6>
                        <p className="text-muted small mb-0">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-end">
                        <p className="fw-bold mb-0">{currency}{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="alert alert-info">
                  Your order has been placed successfully. Order details will be available in your account.
                </div>
              )}

              <div className="border-top pt-4 mt-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span className="fw-bold">{currency}{orderToDisplay.total.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Payment Method:</span>
                  <span>{orderToDisplay.paymentMethod}</span>
                </div>
                <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                  <span className="h5">Total:</span>
                  <span className="h5">{currency}{orderToDisplay.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-5">
                <Link to="/" className="btn btn-outline-secondary">
                  Continue Shopping
                </Link>
                <Link to="/account/orders" className="btn btn-primary">
                  View All Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
