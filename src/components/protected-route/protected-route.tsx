import { useAppSelector } from "../../hooks/useAppSelector";
import { Navigate, useLocation } from "react-router-dom";
import { IProtectedRoute } from "../../types";
import Cookies from "js-cookie";

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
    if (location.pathname === "/profile/orders") {
      if (Cookies.get("accessToken")) {
        return null;
      } else {
        return <Navigate to="/login" />;
      }
    } else if (
      location.pathname === "/reset-password" &&
      !location.state?.fromForgotPassword
    ) {
      return <Navigate to="/forgot-password" />;
    } else {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  }

  return component;
};

export default ProtectedRoute;
