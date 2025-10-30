
// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Loader from "../components/Loader";

/**
 * Protege rutas según rol y estado de sesión.
 */
export default function PrivateRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();

  console.log("[PrivateRoute]", { loading, user, allowedRoles });

  if (loading)   return <Loader fullScreen />;
  if (!user)     return <Navigate to="/login" replace />;

  const role = (user.rol || "").toLowerCase();
  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to="/inicio" replace />;
  }
  return <>{children}</>;
}
