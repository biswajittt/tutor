import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with `null` for loading state

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/check-user-authentication",
          {},
          {
            withCredentials: true, // Ensure cookies are sent with the request
          }
        );
        // If the user is authenticated, set true
        if (response.data.user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        setIsAuthenticated(false); // On error, assume not authenticated
      }
    };

    checkAuthentication();
  }, []);

  return isAuthenticated; // Returns `true`, `false`, or `null` (loading)
};

export default useAuth;
