import crypto from "crypto";

const ENCRYPTION_KEY = Buffer.from(
  process.env.ENCRYPTION_KEY || "12345678901234567890123456789012"
); // Must be 32 bytes
const IV_LENGTH = 16;

// Encrypts strings or objects
export const encrypt = (input) => {
  const text = typeof input === "string" ? input : JSON.stringify(input);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

// Decrypts and tries to return object if valid JSON, else string
export const decrypt = (encrypted) => {
  const [ivHex, encryptedText] = encrypted.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  try {
    return JSON.parse(decrypted);
  } catch {
    return decrypted; // It was a plain string
  }
};

// function main() {
//   try {
//     const dataToEncrypt = JSON.stringify({ hi: "hi", ho: "hi" });
//     console.log("Original:", dataToEncrypt);
//     const encryptedData = encrypt(dataToEncrypt);
//     console.log("Encrypted:", encryptedData);
//     const decryptedData = JSON.parse(decrypt(encryptedData));
//     console.log("Decrypted:", decryptedData);
//   } catch (err) {
//     console.error("ERROR:", err.message);
//   }
// }

// main();
