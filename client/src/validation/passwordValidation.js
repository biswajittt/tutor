export default function isValidPassword(password) {
  // Define the regular expression for password validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  // Check if password matches the regular expression
  if (!passwordRegex.test(password)) {
    return false;
  }

  // Ensure password does not contain any spaces
  if (/\s/.test(password)) {
    return false;
  }

  // If all checks pass, return true
  return true;
}
