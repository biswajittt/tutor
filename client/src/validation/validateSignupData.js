import isValidEmail from "./emailValidation.js";
import isValidPassword from "./passwordValidation.js";
export default function validateSignupdata(
  name,
  email,
  phonenumber,
  password,
  category
) {
  //   console.log(name, email, phonenumber, password);
  // Validate customerName (must be a non-empty string)
  if (typeof name !== "string" || name.trim() === "") {
    return false;
  }
  // Validate customerEmail (basic email format validation)
  if (!isValidEmail(email)) {
    return false;
  }
  // Validate customerPhoneNumber (must be a string of exactly 10 digits)
  if (!/^\d{10}$/.test(phonenumber)) {
    return false;
  }
  // Validate customerPhoneNumber (must be a string of exactly 10 digits)
  if (!isValidPassword(password)) {
    return false;
  }

  return true;
}
