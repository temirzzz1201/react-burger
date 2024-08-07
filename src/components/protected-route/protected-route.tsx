import { useAppSelector } from "../../hooks/useAppSelector";
import { Navigate, useLocation } from "react-router-dom";
import { IProtectedRoute } from "../../types";

const ProtectedRoute: React.FC<IProtectedRoute> = ({
  onlyUnAuth,
  component,
}) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    if (
      location.pathname === "/reset-password" &&
      !location.state?.fromForgotPassword
    ) {
      return <Navigate to="/forgot-password" />;
    }

    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export default ProtectedRoute;
