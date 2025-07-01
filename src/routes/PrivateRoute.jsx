import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";
import PageLoader from "../components/PageLoader";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);

  // Show loading spinner while checking authentication
  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if user role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/user/dashboard" />;
    }
  }

  // User is authenticated and authorized
  return <Outlet />;
};

export default PrivateRoute;
