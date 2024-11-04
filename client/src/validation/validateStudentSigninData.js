import isValidEmail from "./emailValidation.js";
import isValidPassword from "./passwordValidation.js";
export default function validateStudentSigninData(email, password) {
  // Validate customerEmail (basic email format validation)
  if (!isValidEmail(email)) {
    return false;
  }
  // Validate customerPhoneNumber (must be a string of exactly 10 digits)
  if (!isValidPassword(password)) {
    console.log("10");
    return false;
  }

  return true;
}
