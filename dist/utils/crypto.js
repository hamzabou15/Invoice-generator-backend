"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const crypto_1 = __importDefault(require("crypto"));
/* =========================================================
   CONFIG
========================================================= */
const algorithm = "aes-256-cbc";
const secretKey = process.env.BANK_SECRET_KEY;
if (!secretKey) {
    throw new Error("BANK_SECRET_KEY manquante dans .env");
}
/* =========================================================
   SECRET KEY
========================================================= */
const key = crypto_1.default
    .createHash("sha256")
    .update(secretKey)
    .digest();
/* =========================================================
   ENCRYPT
========================================================= */
function encrypt(value) {
    if (!value) {
        throw new Error("Valeur à chiffrer manquante");
    }
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(value, "utf8", "hex");
    encrypted +=
        cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`;
}
/* =========================================================
   DECRYPT
========================================================= */
function decrypt(encryptedText) {
    const [ivHex, encrypted] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto_1.default.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted +=
        decipher.final("utf8");
    return decrypted;
}
