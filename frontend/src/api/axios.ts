import axios from "axios";
 import { toast } from "sonner";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials :true
 
});

apiClient.interceptors.response.use(
  
  (response) => response,
  (error) => {
   
    const message =
      error?.response?.data?.message || "Something went wrong";
      toast.error(message)
   
    return Promise.reject(error);
  }
);


