const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
const TOKEN_NAME = import.meta.env.VITE_AUTH_TOKEN_NAME || 'auth_token';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      // Remove credentials: 'include' to avoid CORS issues
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    // Map the backend response to the expected format
    return {
      token: data.access_token,
      user: data.user
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    // Create FormData object
    const formData = new FormData();
    
    // Add user data to FormData
    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key]);
    });
    
    // Create a valid 1x1 transparent PNG as placeholder
    // This is a base64 encoded 1x1 transparent PNG
    const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    const byteString = atob(base64Image);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    
    const blob = new Blob([uint8Array], { type: 'image/png' });
    formData.append('image', blob, 'placeholder.png');

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
        // Don't set Content-Type when using FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    // Map the backend response to the expected format
    return {
      token: data.access_token,
      user: data.user || data
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logout = async (token) => {
  try {
    // If no token, just return success (client-side logout)
    if (!token) {
      return true;
    }

    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      // Remove credentials: 'include' to avoid CORS issues
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Logout failed');
    }

    return true;
  } catch (error) {
    console.error('Logout error:', error);
    // Even if server logout fails, we'll clear local storage
    return true;
  }
};

export const getUserProfile = async (token) => {
  try {
    if (!token) {
      throw new Error('No authentication token provided');
    }
    const response = await fetch(`${API_URL}/user/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Token management functions
export const getToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_NAME, token);
  }
  return token;
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_NAME);
};
