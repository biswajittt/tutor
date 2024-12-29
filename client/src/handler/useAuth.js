import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with `null` for loading state
  const [user, setUser] = useState(null); // To store user data
  const [userType, setUserType] = useState(null); // To store user type
  const navigate = useNavigate();
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

        console.log("res", response);
        if (response?.status === 401) {
          setIsAuthenticated(false);
        }
        // If the user is authenticated, set true
        else if (response?.data?.user) {
          setIsAuthenticated(true);
          setUser(response.data.user); // Store user data in state
          setUserType(response.data.userType);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        // console.error("Error during authentication check:", error);
        setIsAuthenticated(false); // On error, assume not authenticated
        // This block will run if the response status is 401 or other errors
        // If a 401 error is returned, redirect to login
        // if (error.response && error.response.status === 401) {
        //   console.log("Unauthorized, redirecting to login.");
        //   setIsAuthenticated(false);
        //   navigate("/"); // Redirect to login page
        // } else {
        //   console.error("Error during authentication check:", error);
        //   setIsAuthenticated(false);
        // }
      }
    };

    checkAuthentication();
  }, []);

  return { isAuthenticated, user, userType }; // Return `isAuthenticated ->  // Returns `true`, `false`, or `null` (loading)` and `user` data
};

export default useAuth;
