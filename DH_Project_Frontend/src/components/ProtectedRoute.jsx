import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, requiredTipo, children }) => {
  if (!user || user.user_metadata?.tipo !== requiredTipo) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default ProtectedRoute;
