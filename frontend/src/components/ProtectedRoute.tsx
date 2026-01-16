import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { AuthService } from "../services/authService";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    AuthService.checkAuth().then((result) => {
      console.log("Auth check result",result);
      setIsAuth(result)
    });
  }, []);
  if (isAuth === null) {
    return <p>Loading...</p>;
  }

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
