import { Navigate } from "react-router-dom";
import useAuth from "./handler/useAuth.js"; // Custom hook to check authentication status

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    // Return a loading spinner or nothing while checking authentication
    return <div>Loading...</div>; // You can customize this part
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/mentor/login" replace />;
  }

  return children; // Only render children if authenticated
};

export default ProtectedRoute;
