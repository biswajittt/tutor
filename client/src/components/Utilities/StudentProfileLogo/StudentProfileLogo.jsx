import React from "react";

export default function StudentProfileLogo({ fullName }) {
  // Split the full name by space to get first and last name
  const [firstName, lastName] = fullName.split(" ");
  // Extract initials from the first and last name
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

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
