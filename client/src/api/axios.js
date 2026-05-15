import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

/*
=================================
Request Interceptor
=================================
*/

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

/*
=================================
Response Interceptor
=================================
*/

api.interceptors.response.use(
  (response) => response,

  (error) => {
    /*
    Auto Logout on Unauthorized
    */

    if (
      error.response &&
      error.response.status === 401
    ) {
      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;