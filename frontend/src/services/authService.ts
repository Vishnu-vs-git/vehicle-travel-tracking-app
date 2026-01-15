import { apiClient } from "../api/axios";
import { UserAuthRoutes } from "../constants/routes/authRoutes";
import type { AuthPayload, LoginPayload } from "../types/authTypes";

export const AuthService = {
  login:(payload: LoginPayload) => apiClient.post(UserAuthRoutes.USER_LOGIN,payload,{}),
  register:(payload:AuthPayload) => apiClient.post(UserAuthRoutes.USER_REGISTER,payload,{}),
  checkAuth : async(): Promise<boolean> => {
     try{
           await apiClient.get(UserAuthRoutes.CHECK_AUTH);
          return  true
     }catch{
       return false
     }
  }
}