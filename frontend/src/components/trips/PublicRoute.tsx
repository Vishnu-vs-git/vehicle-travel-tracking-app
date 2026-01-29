import { Navigate } from "react-router-dom";

import type { JSX } from "react";
import { useAppSelector } from "../../store/hooks";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
