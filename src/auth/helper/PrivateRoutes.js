import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from ".";

const PrivateRoutes = ({ children }) => {
  let auth = isAuthenticated();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoutes;
