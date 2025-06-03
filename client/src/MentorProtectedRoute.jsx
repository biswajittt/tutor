import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./handler/useAuth.js"; // Custom hook to check authentication status

const MentorProtectedRoute = () => {
  const { isAuthenticated, user, userType } = useAuth();
  console.log(isAuthenticated);
  if (isAuthenticated === null) {
    // Return a loading spinner or nothing while checking authentication
    return (
      <div class="flex flex-row gap-2 justify-center items-center h-screen">
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  if (userType !== "mentor") {
    // Redirect back to the previous location if userType is not "student"
    return <Navigate to={location.state?.from || "/"} replace />;
  }
  return <Outlet context={{ isAuthenticated, user, userType }} />; // Only render children if authenticated
};

export default MentorProtectedRoute;
