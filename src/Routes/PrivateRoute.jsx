import PropTypes from "prop-types";
import { getCurrentUser } from "../localStorage";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowedRoles }) {
  const user = getCurrentUser();

  if (user) {
    if (!allowedRoles.includes(user.role) && user.role === "agent") {
      return <Navigate to="/hotels" />;
    } else if (!allowedRoles.includes(user.role) && user.role === "traveler") {
      return <Navigate to="/reservations" />;
    }
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

// Validación de props
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
