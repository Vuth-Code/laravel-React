const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://52.76.95.241:8000/api";

export const createOrder = async (orderData, token) => {
  try {
    console.log("Creating order with data:", JSON.stringify(orderData));

    // Validate required fields
    if (
      !orderData.items ||
      !orderData.total_amount ||
      !orderData.payment_method
    ) {
      console.error("Missing required order data fields");
      throw new Error("Order data is incomplete");
    }

    if (!token) {
      console.error("Authentication token is missing");
      throw new Error("Authentication required to create an order");
    }

    // Make the API request
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    // Log the raw response for debugging
    console.log("Order API response status:", response.status);

    // Parse the response as JSON
    const data = await response.json();
    console.log("Order API response data:", data);

    // If the response is not ok, throw an error
    if (!response.ok) {
      const errorMessage =
        data.message || `Error: ${response.status} ${response.statusText}`;
      console.error("Order creation failed:", errorMessage);

      if (data.errors) {
        console.error("Validation errors:", data.errors);
      }

      throw new Error(errorMessage);
    }

    // Return the parsed JSON response
    console.log("Order created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getOrders = async (token) => {
  try {
    if (!token) {
      throw new Error("Authentication required to fetch orders");
    }

    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      // Remove credentials: 'include' to avoid CORS issues
    });

    if (!response.ok) {
      let errorMessage = `Failed to fetch orders: ${response.status} ${response.statusText}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        console.error("Could not parse error response:", jsonError);
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
