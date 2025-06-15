/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { CartContext } from "../contexts/CartContext";
import PayPalComponent from "../components/Paypal";
import PaypalFallback from "../components/PaypalFallback";
import { paypal } from "../assets/index";
import { visa } from "../assets/index";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { getToken } from "../services/authService";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("paypal"); // Set PayPal as default
  const { token, user } = useContext(ShopContext);
  const { cart, getCartAmount, placeOrder, clearCart } = useContext(CartContext);
  // Make sure clearCart is available and working
  const [cartTotal, setCartTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });


  useEffect(() => {
    if (user) {
      const nameParts = user.name ? user.name.split(' ') : ['', ''];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      setShippingDetails(prev => ({
        ...prev,
        firstName,
        lastName,
        email: user.email || prev.email,
        phone: user.profile?.phone || prev.phone,
        address: user.profile?.address || prev.address
      }));
    }
  }, [user]);
  useEffect(() => {
    checkFormValidity();
  }, [shippingDetails]);

  useEffect(() => {
    // Get token directly from localStorage using our helper
    const authToken = getToken();

    if (!authToken) {
      toast.error("Please login to proceed with checkout");
      navigate("/login", { state: { from: '/place-order' } });
      return;
    }

    // Redirect if cart is empty
    if (cart.length === 0) {
      toast.info("Your cart is empty");
      navigate("/shop");
      return;
    }

    setCartTotal(getCartAmount());

    // Log the payment method for debugging
    console.log("Current payment method:", method);
  }, [navigate, cart, getCartAmount, method]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));

    e.target.classList.remove('is-invalid');
  };

  const checkFormValidity = useCallback(() => {
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode', 'country', 'phone'];
    const missingFields = requiredFields.filter(field => !shippingDetails[field]);

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingDetails.email);

    // Update form validity state
    setFormIsValid(missingFields.length === 0 && emailIsValid);
  }, [shippingDetails]);

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode', 'country', 'phone'];
    const missingFields = requiredFields.filter(field => !shippingDetails[field]);

    if (missingFields.length > 0) {
      // Format field names for display (camelCase to Title Case)
      const formattedFields = missingFields.map(field =>
        field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
      );

      toast.error(`Please fill in all required fields: ${formattedFields.join(', ')}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Add error class to all missing fields
      missingFields.forEach(field => {
        const inputField = document.querySelector(`[name="${field}"]`);
        if (inputField) {
          inputField.classList.add('is-invalid');
        }
      });

      // Focus the first empty field
      if (missingFields.length > 0) {
        const firstEmptyField = document.querySelector(`[name="${missingFields[0]}"]`);
        if (firstEmptyField) {
          firstEmptyField.focus();
        }
      }

      return false;
    }

    if (!validateEmail(shippingDetails.email)) {
      toast.error("Please enter a valid email address", {
        position: "top-center",
        autoClose: 5000,
      });
      document.querySelector('[name="email"]').classList.add('is-invalid');
      document.querySelector('[name="email"]').focus();
      return false;
    }

    // No phone number format validation

    return true;
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };



  const handleApprove = async (details) => {
    try {
      console.log("handleApprove called with details:", details);
      setIsProcessing(true);

      // Validate form before proceeding
      if (!validateForm()) {
        setIsProcessing(false);
        return;
      }

      // Get token directly from localStorage
      const authToken = getToken();
      if (!authToken) {
        toast.error("Authentication required. Please login again.");
        navigate("/login", { state: { from: '/place-order' } });
        return;
      }

      // Extract payment details from PayPal response
      const paymentDetails = {
        transaction_id: details.id,
        payer_id: details.payer.payer_id,
        payer_email: details.payer.email_address,
        payment_source: 'paypal',
        payment_status: details.status,
        payment_amount: details.purchase_units[0].amount.value,
        payment_currency: details.purchase_units[0].amount.currency_code,
        payment_time: details.create_time
      };

      console.log("Created payment details for API:", paymentDetails);
      console.log("Using auth token:", authToken.substring(0, 10) + '...');
      console.log("Shipping details:", shippingDetails);

      // Call API to create order
      console.log("Calling placeOrder API with PayPal payment...");
      const orderResult = await placeOrder(
        "paypal",
        shippingDetails,
        authToken,
        paymentDetails // Pass payment details to order creation
      );

      console.log("Order result:", orderResult);

      if (orderResult.success) {
        console.log("Order successful, clearing cart...");

        try {
          // Clear the cart only once after successful order
          clearCart();

          console.log("Cart cleared, redirecting to success page...");
          toast.success(`Transaction completed by ${details.payer.name?.given_name || 'customer'}`);

          // Add a small delay to ensure state updates before redirect
          setTimeout(() => {
            // Redirect to order confirmation with orderCompleted flag
            navigate("/order-success", {
              replace: true,
              state: {
                orderId: orderResult.order?.id || 'N/A',
                orderTotal: orderResult.order?.total_amount || 0,
                orderCompleted: true, // Add flag to prevent additional cart clearing
                paymentMethod: 'paypal'
              }
            });
          }, 500);
        } catch (clearError) {
          console.error("Error clearing cart:", clearError);
          // Still redirect even if cart clearing fails
          navigate("/order-success", {
            replace: true,
            state: {
              orderId: orderResult.order?.id || 'N/A',
              orderTotal: orderResult.order?.total_amount || 0,
              orderCompleted: true
            }
          });
        }
      } else {
        console.error("PayPal order failed:", orderResult.error);
        toast.error(orderResult.error || "Failed to complete order");
      }
    } catch (error) {
      console.error("Error in handleApprove:", error);
      toast.error(error.message || "An error occurred during PayPal checkout");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    try {
      setIsProcessing(true);

      // Get token directly from localStorage
      const authToken = getToken();
      if (!authToken) {
        toast.error("Authentication required. Please login again.");
        navigate("/login", { state: { from: '/place-order' } });
        return;
      }

      console.log("Placing order with payment method:", method);
      console.log("Shipping details:", shippingDetails);
      console.log("Using auth token:", authToken.substring(0, 10) + '...');

      const orderResult = await placeOrder(
        method,
        shippingDetails,
        authToken
      );

      console.log("Order result:", orderResult);

      if (orderResult.success) {
        console.log("Order successful, clearing cart...");

        try {
          // Clear the cart after successful order
          clearCart();

          toast.success("Order placed successfully!");

          // Add a small delay to ensure state updates before redirect
          setTimeout(() => {
            navigate("/order-success", {
              replace: true,
              state: {
                orderId: orderResult.order?.id || 'N/A',
                orderTotal: orderResult.order?.total_amount || 0,
                orderCompleted: true, // Add flag to prevent additional cart clearing
                paymentMethod: method
              }
            });
          }, 500);
        } catch (clearError) {
          console.error("Error clearing cart:", clearError);
          // Still redirect even if cart clearing fails
          navigate("/order-success", {
            replace: true,
            state: {
              orderId: orderResult.order?.id || 'N/A',
              orderTotal: orderResult.order?.total_amount || 0,
              orderCompleted: true
            }
          });
        }
      } else {
        console.error("Order failed:", orderResult.error);
        toast.error(orderResult.error || "Failed to place order");
      }
    } catch (error) {
      console.error("Error in handlePlaceOrder:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  // This function is not used, but kept for reference
  // Cash on delivery is handled by the handlePlaceOrder function
  /*
  const handleCashOnDelivery = async () => {
    try {
      setIsProcessing(true);

      // Validate form before proceeding
      if (!validateForm()) {
        setIsProcessing(false);
        return;
      }

      // Create order data
      const orderData = {
        // Your order data...
        payment_method: 'cash_on_delivery',
        payment_status: 'pending'
      };

      // Process the order using placeOrder from CartContext
      const orderResult = await placeOrder(
        'cash_on_delivery',
        shippingDetails,
        getToken()
      );

      if (orderResult.success) {
        // Clear cart only once
        clearCart();

        // Use setTimeout to ensure state updates before redirect
        setTimeout(() => {
          navigate("/order-success", {
            replace: true,
            state: {
              orderId: orderResult.order?.id || 'N/A',
              orderTotal: orderResult.order?.total_amount || 0,
              orderCompleted: true, // Pass flag to prevent additional operations
              paymentMethod: 'cash_on_delivery'
            }
          });
        }, 500);
      } else {
        toast.error(orderResult.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error in handleCashOnDelivery:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };
  */

  // Check token directly from localStorage
  const authToken = getToken();
  if (!authToken || cart.length === 0) {
    return null; // The useEffect will handle redirects
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 mb-4">
          <h2 className="fw-bold text-center">Checkout</h2>
          {!formIsValid && (
            <div className="alert alert-warning text-center mt-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Please complete all required fields before proceeding with payment.
            </div>
          )}
        </div>
        <div className="col-lg-7">
          {/* Delivery Information */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h4 className="mb-0 py-2">Delivery Information</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={e => e.preventDefault()} id="checkout-form">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={shippingDetails.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={shippingDetails.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Email*</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={shippingDetails.email}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Street Address*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleInputChange}
                      placeholder="Street"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={shippingDetails.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">State/Province*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={shippingDetails.state}
                      onChange={handleInputChange}
                      placeholder="State or Province"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">ZIP/Postal Code*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="zipCode"
                      value={shippingDetails.zipCode}
                      onChange={handleInputChange}
                      placeholder="Postal or ZIP code"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Country*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      value={shippingDetails.country}
                      onChange={handleInputChange}
                      placeholder="Country"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Phone*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={shippingDetails.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Order Summary and Payment */}
        <div className="col-lg-5">
          {/* Order Summary */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h4 className="mb-0 py-2">Order Summary</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <p className="mb-0">Items ({cart.length}):</p>
                <p className="mb-0 fw-bold">${getCartAmount().toFixed(2)}</p>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <p className="mb-0">Shipping:</p>
                <p className="mb-0">Free</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-0">
                <p className="fw-bold mb-0">Total:</p>
                <p className="fw-bold mb-0">${getCartAmount().toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h4 className="mb-0 py-2">Payment Method</h4>
            </div>
            <div className="card-body">
              {/* Payment Options */}
              <div className="mb-4">
                {/* PayPal Option */}
                <div className="form-check custom-radio mb-2 p-0">
                  <div
                    className={`border rounded p-3 d-flex align-items-center ${method === "paypal" ? "border-primary" : ""}`}
                    onClick={() => setMethod("paypal")}
                  >
                    <input
                      type="radio"
                      name="payment"
                      id="paypal"
                      checked={method === "paypal"}
                      onChange={() => setMethod("paypal")}
                      className="form-check-input me-3"
                    />
                    <label className="form-check-label w-100" htmlFor="paypal">
                      <div className="d-flex align-items-center">
                        <img
                          src={paypal}
                          alt="PayPal"
                          className="img-fluid me-3"
                          style={{ height: "24px" }}
                        />
                        <span>PayPal</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Visa Option */}
                <div className="form-check custom-radio mb-2 p-0">
                  <div
                    className={`border rounded p-3 d-flex align-items-center ${method === "visa" ? "border-primary" : ""}`}
                    onClick={() => setMethod("visa")}
                  >
                    <input
                      type="radio"
                      name="payment"
                      id="visa"
                      checked={method === "visa"}
                      onChange={() => setMethod("visa")}
                      className="form-check-input me-3"
                    />
                    <label className="form-check-label w-100" htmlFor="visa">
                      <div className="d-flex align-items-center">
                        <img
                          src={visa}
                          alt="Visa"
                          className="img-fluid me-3"
                          style={{ height: "24px" }}
                        />
                        <span>Credit Card</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Cash on Delivery Option */}
                <div className="form-check custom-radio mb-2 p-0">
                  <div
                    className={`border rounded p-3 d-flex align-items-center ${method === "cod" ? "border-primary" : ""}`}
                    onClick={() => setMethod("cod")}
                  >
                    <input
                      type="radio"
                      name="payment"
                      id="cod"
                      checked={method === "cod"}
                      onChange={() => setMethod("cod")}
                      className="form-check-input me-3"
                    />
                    <label className="form-check-label w-100" htmlFor="cod">
                      <span>Cash on Delivery</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Place Order or PayPal Button */}
              <div className="mt-4">
                {method === "paypal" ? (
                  <div className="paypal-container">
                    <PayPalComponent
                      total={cartTotal}
                      onApprove={handleApprove}
                      disabled={isProcessing || !formIsValid}
                    />
                    <div className="mt-3 text-center">
                      <button
                        onClick={() => navigate("/shop")}
                        className="btn btn-outline-secondary"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-primary w-100 mb-3"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing || !formIsValid}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </button>
                    <button
                      onClick={() => navigate("/shop")}
                      className="btn btn-outline-secondary w-100"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
        .custom-radio input[type="radio"] {
          width: 20px;
          height: 20px;
        }
        .card-header {
          border-bottom: 1px solid rgba(0,0,0,0.125);
        }
        .paypal-container {
          min-height: 150px;
        }
        .is-invalid {
          border-color: #dc3545;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right calc(0.375em + 0.1875rem) center;
          background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
        }
      `}</style>
    </div>
  );
};

export default PlaceOrder;
