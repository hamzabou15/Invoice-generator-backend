"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankingSchema = void 0;
const zod_1 = require("zod");
/* =========================================================
   BANKING VALIDATOR
========================================================= */
exports.bankingSchema = zod_1.z.object({
    iban: zod_1.z
        .string()
        .min(15)
        .max(34),
    bic: zod_1.z
        .string()
        .min(8)
        .max(11),
    bankName: zod_1.z
        .string()
        .max(120)
        .optional(),
    accountHolder: zod_1.z
        .string()
        .max(120)
        .optional(),
    paymentMethods: zod_1.z.array(zod_1.z.enum([
        "bank_transfer",
        "card",
        "cash",
        "check",
    ]))
        .optional()
        .default(["bank_transfer"]),
});
