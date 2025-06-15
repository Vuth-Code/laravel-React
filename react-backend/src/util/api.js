//  axios is a promise-based HTTP client for the browser and Node.js, which is used to make asynchronous HTTP requests to REST endpoints and perform CRUD operations.
import axios from "axios";

// Get API URL from environment or use the remote server URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const request = (url = "", method = "GET", data = {}) => {
  let access_token = localStorage.getItem("access_token");
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (data instanceof FormData) {
    headers = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    };
  }
  return axios({
    url: `${API_BASE_URL}/${url}`,
    method: method,
    data: data,
    headers: {
      ...headers,
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      const response = error.response;
      if (response) {
         const data = response.data;
        const status = response.status;
        let errors = {};
        if (status == 500) {
          errors.message = {
            message: "Internal server error! Please try again later.",
          };
        } else if (status == 401) {
          errors.message = {
            message: "Unauthorized! Please login again.",
          };
        } else if (status == 403) {
          errors.message = {
            message:
              "Forbidden! You don't have permission to access this resource.",
          };
        } else if (status == 404) {
          errors.message = {
            message: "Not Found! The requested resource could not be found.",
          };
        }
        if (status == 422) {
          errors.message = {
            message: "Validation error! Please check your input.",
          };
        } else if (status == 400) {
          errors.message = {
            message: "Bad request! Please check your input.",
          };
        } else {
          errors.message = {
            message: "An unexpected error occurred! Please try again later.",
          };
        }

        if (data.errors) {
          Object.keys(data.errors).map((key) => {
            errors[key] = {
              help: data.errors[key][0],
              validateStatus: "error",
              hasFeedback: true,
            };
          });
        }
        return {
          errors: errors,
          message: errors.message.message,
        };
      }
      throw error;
    })
    .finally(() => {
      return;
    });
};
