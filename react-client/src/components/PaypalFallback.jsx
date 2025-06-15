import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const PaypalFallback = ({ total = 0, onApprove, onError }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scriptError, setScriptError] = useState(null);

  // Load the PayPal script manually
  useEffect(() => {
    console.log("Attempting to load PayPal script...");

    // First, remove any existing PayPal scripts to avoid conflicts
    const existingScripts = document.querySelectorAll('script[src*="paypal.com/sdk/js"]');
    existingScripts.forEach(script => {
      document.body.removeChild(script);
    });

    // Reset the window.paypal object
    if (window.paypal) {
      window.paypal = undefined;
    }

    const script = document.createElement('script');
    // Use sandbox client ID and explicitly include buttons component
    script.src = 'https://www.paypal.com/sdk/js?client-id=ATdyQLhtH8ByRKGWfrCSVd13AJhyE9RT0oSvF2fn6oo0Zm4LbBLjL-_hha7DqCvN3dNVOJTqw8jhvb3u&currency=USD&intent=capture&components=buttons';
    script.async = true;

    script.onload = () => {
      console.log("PayPal script loaded successfully");
      console.log("PayPal object:", window.paypal);
      console.log("PayPal Buttons available:", window.paypal && window.paypal.Buttons ? "Yes" : "No");
      setScriptLoaded(true);
    };

    script.onerror = (err) => {
      console.error("Error loading PayPal script:", err);
      setScriptLoaded(false);
      setScriptError("Please refresh and try again.");
      // Call onError if provided
      if (onError) {
        onError(err);
      }
    };

    document.body.appendChild(script);
    console.log("PayPal script added to document body");

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [onError]);

  // Render PayPal buttons when script is loaded
  useEffect(() => {
    if (!scriptLoaded) {
      console.log("Script not loaded yet, waiting...");
      return;
    }

    if (!window.paypal) {
      console.error("PayPal script loaded but window.paypal is not defined");
      setScriptError("Please refresh and try again.");
      return;
    }

    if (!window.paypal.Buttons) {
      console.error("PayPal script loaded but window.paypal.Buttons is not defined");
      setScriptError("Please refresh and try again.");
      return;
    }

    const buttonContainer = document.getElementById('paypal-button-container');
    if (!buttonContainer) {
      console.error("PayPal button container not found in DOM");
      return;
    }

    console.log("Rendering PayPal buttons...");

    // Clear any existing buttons
    buttonContainer.innerHTML = '';

    try {
      const buttons = window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal'
        },

        // Create order
        createOrder: (data, actions) => {
          console.log("Creating PayPal order...");
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: total.toFixed(2)
              }
            }]
          });
        },

        // Handle approval
        onApprove: async (data, actions) => {
          try {
            console.log("Payment approved, capturing funds...");
            setIsProcessing(true);

            // Capture the funds
            const captureResult = await actions.order.capture();
            console.log("Transaction completed:", captureResult);

            // Call the onApprove callback
            if (onApprove) {
              await onApprove(captureResult);
            }

            return true;
          } catch (error) {
            console.error("PayPal transaction failed:", error);
            // Call onError if provided
            if (onError) {
              onError(error);
            }
            return false;
          } finally {
            setIsProcessing(false);
          }
        },

        // Handle errors
        onError: (err) => {
          console.error("PayPal Error:", err);
          setScriptError("Please refresh and try again.");
          // Call onError if provided
          if (onError) {
            onError(err);
          }
        }
      });

      console.log("PayPal buttons created, rendering to container...");
      buttons.render(buttonContainer).catch(err => {
        console.error("Error rendering PayPal buttons:", err);
        setScriptError("Please refresh and try again.");
        // Call onError if provided
        if (onError) {
          onError(err);
        }
      });
    } catch (error) {
      console.error("Error setting up PayPal buttons:", error);
      setScriptError("Please refresh and try again.");
      // Call onError if provided
      if (onError) {
        onError(error);
      }
    }
  }, [scriptLoaded, total, onApprove, onError]);

  return (
    <div className="paypal-fallback-container">
      <div
        id="paypal-button-container"
        style={{
          minHeight: '150px',
          border: scriptLoaded && !scriptError ? 'none' : '1px dashed #ccc',
          padding: '10px',
          marginBottom: '10px'
        }}
      ></div>

      {!scriptLoaded && !scriptError && (
        <div className="alert alert-info text-center">
          <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
          Loading PayPal...
        </div>
      )}

      {scriptError && (
        <div className="alert alert-danger text-center">
          <button
            className="btn btn-primary mt-2"
            onClick={() => window.location.reload()}
          >
            REFRESH PAGE
          </button>
        </div>
      )}

      {isProcessing && (
        <div className="alert alert-info text-center">
          <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
          Processing your payment...
        </div>
      )}
    </div>
  );
};

PaypalFallback.propTypes = {
  total: PropTypes.number,
  onApprove: PropTypes.func.isRequired,
  onError: PropTypes.func
};

export default PaypalFallback;





