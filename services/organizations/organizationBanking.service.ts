// backend/services/organizations/organizationBanking.service.ts

import OrganizationBanking
    from "../../models/organization/OrganizationBanking";

import { encrypt }
    from "../../utils/crypto";

import { bankingSchema }
    from "../../validators/organization/banking.schema";

/* =========================================================
   UPSERT BANKING
========================================================= */

export async function upsertBanking(
    userId: string,
    payload: unknown
) {

    /* ========= VALIDATION ========= */

    const data =
        bankingSchema.parse(payload);

    /* =====================================================
       CLEAN DATA
    ===================================================== */

    const iban =
        data.iban
            ? data.iban
                .replace(/\s/g, "")
                .toUpperCase()
            : undefined;

    const bic =
        data.bic
            ? data.bic
                .replace(/\s/g, "")
                .toUpperCase()
            : undefined;

    /* =====================================================
       SECURITY
    ===================================================== */

    const encryptedIban =
        iban
            ? encrypt(iban)
            : undefined;

    const ibanLast4 =
        iban
            ? iban.slice(-4)
            : undefined;

    /* =====================================================
       UPSERT
    ===================================================== */

    const banking =
        await OrganizationBanking.findOneAndUpdate(
            {
                organization: userId,
            },

            {
                ...(encryptedIban && {
                    ibanEncrypted:
                        encryptedIban,
                }),

                ...(ibanLast4 && {
                    ibanLast4,
                }),

                ...(bic && {
                    bic,
                }),

                bankName:
                    data.bankName || "",

                accountHolder:
                    data.accountHolder || "",

                paymentMethods:
                    data.paymentMethods || [
                        "bank_transfer",
                    ],

                verified:
                    !!iban,

                verifiedAt:
                    iban
                        ? new Date()
                        : undefined,

                isActive: true,
            },

            {
                new: true,

                upsert: true,

                setDefaultsOnInsert: true,
            }
        );

    return banking;
}

/* =========================================================
   GET BANKING
========================================================= */

export async function getBankingByOrganization(
    userId: string
) {

    const banking =
        await OrganizationBanking.findOne({
            organization: userId,
        }).lean();

    if (!banking) {

        return null;
    }

    return {

        _id:
            banking._id,

        bic:
            banking.bic,

        bankName:
            banking.bankName,

        accountHolder:
            banking.accountHolder,

        paymentMethods:
            banking.paymentMethods,

        verified:
            banking.verified,

        verifiedAt:
            banking.verifiedAt,

        iban:
            banking.ibanLast4
                ? `•••• ${banking.ibanLast4}`
                : null,
    };
}