import { getToken } from './authService';
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
const apiClient = {
  public: {
    get: async (endpoint) => {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      try {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
          method: 'GET',
          headers,
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Resource not found: ${endpoint}`);
          }

          try {
            const error = await response.json();
            throw new Error(error.message || `Request failed with status ${response.status}`);
          } catch (e) {
            throw new Error(`Request failed with status ${response.status}`);
          }
        }

        return response.json();
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
      }
    }
  },
  authenticated: {
    get: async (endpoint) => {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      try {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
          method: 'GET',
          headers,
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Authentication expired or invalid');
          }

          try {
            const error = await response.json();
            throw new Error(error.message || `Request failed with status ${response.status}`);
          } catch (e) {
            throw new Error(`Request failed with status ${response.status}`);
          }
        }

        return response.json();
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
      }
    },

    post: async (endpoint, data) => {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      try {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
          method: 'POST',
          headers,
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          try {
            const error = await response.json();
            throw new Error(error.message || `Request failed with status ${response.status}`);
          } catch (e) {
            throw new Error(`Request failed with status ${response.status}`);
          }
        }

        return response.json();
      } catch (error) {
        console.error(`Error posting to ${endpoint}:`, error);
        throw error;
      }
    },

    put: async (endpoint, data) => {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      try {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          try {
            const error = await response.json();
            throw new Error(error.message || `Request failed with status ${response.status}`);
          } catch (e) {
            throw new Error(`Request failed with status ${response.status}`);
          }
        }

        return response.json();
      } catch (error) {
        console.error(`Error updating ${endpoint}:`, error);
        throw error;
      }
    },

    delete: async (endpoint) => {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      try {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
          method: 'DELETE',
          headers,
        });

        if (!response.ok) {
          try {
            const error = await response.json();
            throw new Error(error.message || `Request failed with status ${response.status}`);
          } catch (e) {
            throw new Error(`Request failed with status ${response.status}`);
          }
        }

        return response.json();
      } catch (error) {
        console.error(`Error deleting ${endpoint}:`, error);
        throw error;
      }
    }
  }
};

export default apiClient;