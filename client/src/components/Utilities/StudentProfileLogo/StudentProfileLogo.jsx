import React from "react";

export default function StudentProfileLogo({ fullName }) {
  // Split the full name by space to get first and last name
  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts[1] || ""; // Use an empty string if there's no last name

  // Extract initials based on the availability of first and last names
  const initials = lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    : firstName.charAt(0).toUpperCase();

  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7808d0", // You can set any color you like
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    width: "35px",
    height: "35px",
    borderRadius: "50%", // Makes the div circular
    textTransform: "uppercase",
  };

  return <div style={styles}>{initials}</div>;
}
