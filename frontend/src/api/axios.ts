import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:7000/",
  withCredentials: true // ⭐ VERY IMPORTANT
});

// response interceptor (optional global error handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);


