import crypto from "crypto";

// Define a static key and IV (for testing purposes; store securely in production)
const algorithm = "aes-256-cbc";
const key = crypto.createHash("sha256").update("your-secret-key").digest(); // Create a 32-byte key
const iv = crypto.createHash("md5").update("your-iv").digest(); // Create a 16-byte IV

// Encrypt function
const encrypt = (data) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    iv: iv.toString("hex"), // Store IV as hex (optional if static IV is used)
    encryptedData: encrypted,
  };
};

// Decrypt function
const decrypt = ({ iv, encryptedData }) => {
  const ivBuffer = Buffer.from(iv, "hex"); // Convert IV from hex to buffer (optional for static IV)

  const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

export { encrypt, decrypt };
