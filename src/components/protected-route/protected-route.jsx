import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ onlyUnAuth, component }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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

ProtectedRoute.propTypes = {
  onlyUnAuth: PropTypes.bool,
  component: PropTypes.element,
};

export default ProtectedRoute;
