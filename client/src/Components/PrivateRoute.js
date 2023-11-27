import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function PrivateRoute({ children }) {
  

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" />;
  }
  

  return children;
}
