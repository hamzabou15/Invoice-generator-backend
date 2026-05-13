"use strict";
// backend/services/organizations/organizationBanking.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertBanking = upsertBanking;
exports.getBankingByOrganization = getBankingByOrganization;
const OrganizationBanking_1 = __importDefault(require("../../models/organization/OrganizationBanking"));
const crypto_1 = require("../../utils/crypto");
const banking_schema_1 = require("../../validators/organization/banking.schema");
/* =========================================================
   UPSERT BANKING
========================================================= */
async function upsertBanking(userId, payload) {
    /* ========= VALIDATION ========= */
    const data = banking_schema_1.bankingSchema.parse(payload);
    /* =====================================================
       CLEAN DATA
    ===================================================== */
    const iban = data.iban
        ? data.iban
            .replace(/\s/g, "")
            .toUpperCase()
        : undefined;
    const bic = data.bic
        ? data.bic
            .replace(/\s/g, "")
            .toUpperCase()
        : undefined;
    /* =====================================================
       SECURITY
    ===================================================== */
    const encryptedIban = iban
        ? (0, crypto_1.encrypt)(iban)
        : undefined;
    const ibanLast4 = iban
        ? iban.slice(-4)
        : undefined;
    /* =====================================================
       UPSERT
    ===================================================== */
    const banking = await OrganizationBanking_1.default.findOneAndUpdate({
        owner: userId,
    }, {
        ...(encryptedIban && {
            ibanEncrypted: encryptedIban,
        }),
        ...(ibanLast4 && {
            ibanLast4,
        }),
        ...(bic && {
            bic,
        }),
        bankName: data.bankName || "",
        accountHolder: data.accountHolder || "",
        paymentMethods: data.paymentMethods || [
            "bank_transfer",
        ],
        verified: !!iban,
        verifiedAt: iban
            ? new Date()
            : undefined,
        isActive: true,
    }, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
    });
    return banking;
}
/* =========================================================
   GET BANKING
========================================================= */
async function getBankingByOrganization(userId) {
    const banking = await OrganizationBanking_1.default.findOne({
        owner: userId,
        isActive: true,
    }).lean();
    if (!banking) {
        return null;
    }
    return {
        _id: banking._id,
        bic: banking.bic,
        bankName: banking.bankName,
        accountHolder: banking.accountHolder,
        paymentMethods: banking.paymentMethods,
        verified: banking.verified,
        verifiedAt: banking.verifiedAt,
        iban: banking.ibanLast4
            ? `•••• ${banking.ibanLast4}`
            : null,
    };
}
