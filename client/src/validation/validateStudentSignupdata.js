import isValidEmail from "./emailValidation.js";
import isValidPassword from "./passwordValidation.js";
export default function validateStudentSignupdata(
  name,
  email,
  phone,
  location,
  password
) {
  console.log(name, email, phone, location, password);
  // Validate customerName (must be a non-empty string)
  if (typeof name !== "string" || name.trim() === "") {
    console.log(name);
    return false;
  }

  // Validate customerEmail (basic email format validation)
  if (!isValidEmail(email)) {
    console.log(email);
    return false;
  }
  // Validate customerPhoneNumber (must be a string of exactly 10 digits)
  if (!/^\d{10}$/.test(phone)) {
    console.log(phone);
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
