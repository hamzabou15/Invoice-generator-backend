import crypto from "crypto";

/* =========================================================
   ENCRYPT
========================================================= */

export function encrypt(
  value: string
) {

  const secretKey =
    process.env.BANK_SECRET_KEY;

  if (!secretKey) {

    throw new Error(
      "BANK_SECRET_KEY manquante"
    );
  }

  if (!value) {

    throw new Error(
      "Valeur à chiffrer manquante"
    );
  }

  const algorithm =
    "aes-256-cbc";

  const key =
    crypto
      .createHash("sha256")
      .update(secretKey)
      .digest();

  const iv =
    crypto.randomBytes(16);

  const cipher =
    crypto.createCipheriv(
      algorithm,
      key,
      iv
    );

  let encrypted =
    cipher.update(
      value,
      "utf8",
      "hex"
    );

  encrypted +=
    cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
}

/* =========================================================
   DECRYPT
========================================================= */

export function decrypt(
  encryptedText: string
) {

  const secretKey =
    process.env.BANK_SECRET_KEY;

  if (!secretKey) {

    throw new Error(
      "BANK_SECRET_KEY manquante"
    );
  }

  const algorithm =
    "aes-256-cbc";

  const key =
    crypto
      .createHash("sha256")
      .update(secretKey)
      .digest();

  const [ivHex, encrypted] =
    encryptedText.split(":");

  const iv =
    Buffer.from(
      ivHex,
      "hex"
    );

  const decipher =
    crypto.createDecipheriv(
      algorithm,
      key,
      iv
    );

  let decrypted =
    decipher.update(
      encrypted,
      "hex",
      "utf8"
    );

  decrypted +=
    decipher.final("utf8");

  return decrypted;
}