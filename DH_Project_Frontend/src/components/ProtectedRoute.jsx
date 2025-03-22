import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, requiredTipo, children }) => {
  console.log("info obtenida: ", user?.rol?.id);
  console.log("Info requerida: ", requiredTipo);
  if (!user || user?.rol?.id !== requiredTipo) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default ProtectedRoute;
