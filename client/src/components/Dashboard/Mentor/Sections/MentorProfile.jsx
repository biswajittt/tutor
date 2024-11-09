import React, { useState, useEffect } from "react";
import useAuth from "../../../../handler/useAuth.js";
import { useNavigate } from "react-router-dom";
export default function MentorProfile() {
  const navigate = useNavigate();
  //check user already loggedin or not
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  // If the user is already logged in, redirect to the previous page
  useEffect(() => {
    // Navigate to the home page if the user is authenticated
    if (isAuthenticated) {
      navigate("/"); // Safely navigate after rendering
    }
  }, [isAuthenticated, navigate]); // Depend on isLoggedIn and navigate

  return <div>MentorProfile</div>;
}
