export default function isValidEmail(email) {
  // Define the regular expression for a valid email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if email matches the regular expression
  if (!emailRegex.test(email)) {
    return false;
  }

  // Split the email into local part and domain part
  const [localPart, domain] = email.split("@");

  // Check if the local part is between 1 and 64 characters
  if (localPart.length < 1 || localPart.length > 64) {
    return false;
  }

  // Check if the domain part is between 1 and 255 characters
  if (domain.length < 1 || domain.length > 255) {
    return false;
  }

  // Check if the local part does not start or end with a dot (.)
  if (localPart.startsWith(".") || localPart.endsWith(".")) {
    return false;
  }

  // Check if the local part does not contain consecutive dots (..)
  if (localPart.includes("..")) {
    return false;
  }

  // Check if the domain part does not start or end with a hyphen (-)
  if (domain.startsWith("-") || domain.endsWith("-")) {
    return false;
  }

  // Check if the domain part does not contain consecutive dots (..)
  if (domain.includes("..")) {
    return false;
  }

  // If all checks pass, return true
  return true;
}
