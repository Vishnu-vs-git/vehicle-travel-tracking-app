import { useEffect } from "react";
import { AuthService } from "../services/authService";
import { useAppDispatch } from "../store/hooks";
import { loginSuccess, logout } from "../store/slices/authSlice";
import { AxiosError } from "axios";
import { toast } from "sonner";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await AuthService.checkAuth();
        dispatch(loginSuccess(user.data.user));
      } catch (err) {
        const message = err instanceof AxiosError ? err.response?.data?.message : "Something went wrong";
        toast.error(message)
        dispatch(logout());
      }
    };

    initAuth();
  }, [dispatch]);

  return <>{children}</>;
};

export default AppInitializer;
