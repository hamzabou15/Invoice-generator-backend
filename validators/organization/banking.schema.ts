// validators/organization/banking.schema.ts

import { z } from "zod";

/* =========================================================
   IBAN VALIDATION
========================================================= */

function isValidIBAN(
  iban: string
) {

  const cleaned =
    iban
      .replace(/\s/g, "")
      .toUpperCase();

  /* ========= BASIC FORMAT ========= */

  if (
    !/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(
      cleaned
    )
  ) {
    return false;
  }

  /* ========= MOVE FIRST 4 CHARS ========= */

  const rearranged =
    cleaned.slice(4) +
    cleaned.slice(0, 4);

  /* ========= CONVERT LETTERS ========= */

  const converted =
    rearranged.replace(
      /[A-Z]/g,
      (char) =>
        (
          char.charCodeAt(0) - 55
        ).toString()
    );

  /* ========= MODULO 97 ========= */

  let remainder =
    converted;

  while (
    remainder.length > 2
  ) {

    const block =
      remainder.slice(0, 9);

    remainder =
      (
        Number(block) % 97
      ).toString() +
      remainder.slice(
        block.length
      );
  }

  return (
    Number(remainder) % 97 === 1
  );
}

/* =========================================================
   BIC REGEX
========================================================= */

const bicRegex =
  /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;

/* =========================================================
   BANKING SCHEMA
========================================================= */

export const bankingSchema =
  z.object({

    iban: z
      .string()

      .transform((v) =>
        v
          .replace(/\s/g, "")
          .toUpperCase()
      )

      .refine(
        isValidIBAN,
        {
          message:
            "IBAN invalide",
        }
      ),

    bic: z
      .string()

      .transform((v) =>
        v
          .replace(/\s/g, "")
          .toUpperCase()
      )

      .refine(
        (v) =>
          bicRegex.test(v),
        {
          message:
            "BIC invalide",
        }
      ),

    bankName: z
      .string()
      .max(120)
      .optional()
      .default(""),

    accountHolder: z
      .string()
      .max(120)
      .optional()
      .default(""),

    paymentMethods: z
      .array(
        z.enum([
          "bank_transfer",
          "card",
          "cash",
          "check",
        ])
      )
      .default([
        "bank_transfer",
      ]),
  });