import apiClient from './apiClient';

// Product functions - try authenticated first, fall back to public
export const getProducts = async () => {
  try {
    // Try to get products with authentication first
    try {
      return await apiClient.authenticated.get('products');
    } catch (authError) {
      // If authentication fails, try public access
      console.log('Falling back to public access for products');
      return await apiClient.public.get('products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    // Try to get product with authentication first
    try {
      return await apiClient.authenticated.get(`products/${id}`);
    } catch (authError) {
      // If authentication fails, try public access
      console.log('Falling back to public access for product details');
      return await apiClient.public.get(`products/${id}`);
    }
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const getProductImage = (id) => {
  return `/api/products/${id}/image`;
};

// Admin product functions - require authentication
export const createProduct = async (productData) => {
  try {
    return await apiClient.authenticated.post('products', productData);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    return await apiClient.authenticated.put(`products/${id}`, productData);
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    return await apiClient.authenticated.delete(`products/${id}`);
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};