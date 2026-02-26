import axios from "axios";
 import { toast } from "sonner";
import { store } from "../store/store";
import { logout } from "../store/slices/authSlice";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials :true
 
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || "Something went wrong";

    
    if (error.config?.skipAuthToast) {
      return Promise.reject(error);
    }

    if (status === 401) {
      store.dispatch(logout());
      toast.error("Session expired. Please login again.");
    } 
    else if (status >= 500) {
      toast.error("Server error. Please try again later.");
    } 
    else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);


