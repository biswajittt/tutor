import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./handler/useAuth";

export default function AuthWrapper({ children }) {
  const location = useLocation();
  const isAuthenticated = useAuth(); // Example of checking login status
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    // If user is not authenticated, store the current location and redirect to login
    return (
      <Navigate to="/auth/mentor/registration" state={{ from: location }} />
    );
  }

  return <Outlet />; // Render protected component if user is authenticated
}
