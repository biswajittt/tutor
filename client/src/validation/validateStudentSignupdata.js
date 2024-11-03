import isValidEmail from "./emailValidation.js";
import isValidPassword from "./passwordValidation.js";
export default function validateStudentSignupdata(
  name,
  email,
  phone,
  location,
  password
) {
  // Validate customerName (must be a non-empty string)
  if (typeof name !== "string" || name.trim() === "") {
    return false;
  }

  // Validate customerEmail (basic email format validation)
  if (!isValidEmail(email)) {
    return false;
  }
  // Validate customerPhoneNumber (must be a string of exactly 10 digits)
  if (!/^\d{10}$/.test(phone)) {
    return false;
  }
  // Validate location
  if (typeof location !== "string" || location.trim() === "") {
    return false;
  }
  // Validate customerPhoneNumber (must be a string of exactly 10 digits)
  if (!isValidPassword(password)) {
    console.log("10");
    return false;
  }

  return true;
}
