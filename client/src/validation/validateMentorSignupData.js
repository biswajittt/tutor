import isValidEmail from "./emailValidation.js";
import isValidPassword from "./passwordValidation.js";
export default function validateMentorSignupdata(
  mentorImage,
  name,
  aboutYou,
  email,
  phone,
  location,
  mode,
  subjects,
  shortClassPrice,
  shortClassDuration,
  password,
  availability
) {
  // Validate mentorImage: must be provided and should be a string (assuming it’s a URL or file path)
  if (
    !mentorImage
    // typeof productImage !== "string" ||
    // productImage.trim() === ""
  ) {
    console.error("Invalid productImage");
    return false;
  }
  // Validate customerName (must be a non-empty string)
  if (typeof name !== "string" || name.trim() === "") {
    return false;
  }
  // Validate about you (must be a non-empty string)
  if (typeof aboutYou !== "string" || aboutYou.trim() === "") {
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

  // Validate mode of teaching
  if (
    typeof mode !== "string" ||
    !["Online", "Offline", "Both"].includes(mode) ||
    mode.trim() === ""
  ) {
    return false;
  }
  // Validate subjects
  if (
    !Array.isArray(subjects) ||
    subjects.length === 0 ||
    subjects.length > 5 ||
    (Array.isArray(subjects) &&
      subjects.some(
        (subject) => typeof subject !== "string" || subject.trim().length === 0
      ))
  ) {
    if (
      !Array.isArray(subjects) ||
      subjects.length === 0 ||
      subjects.length > 5 ||
      (Array.isArray(subjects) &&
        subjects.some(
          (subject) =>
            typeof subject !== "string" || subject.trim().length === 0
        ))
    ) {
      return false;
    }
  }

  // Validate mode of teaching
  if (isNaN(shortClassPrice) || shortClassPrice <= 0) {
    return false;
  }

  // Validate mode of teaching
  if (
    isNaN(shortClassDuration) ||
    shortClassDuration < 10 ||
    shortClassDuration > 60
  ) {
    return false;
  }
  // Validate customerPhoneNumber (must be a string of exactly 10 digits)
  if (!isValidPassword(password)) {
    console.log("10");
    return false;
  }
  if (!availability) {
    console.error("Empty Availability");
    return false;
  }
  return true;
}
