// models/OrganizationBanking.ts
import mongoose, {
    Document,
    Types,
} from "mongoose";

export interface IOrganizationBanking
    extends Document {
    organization: Types.ObjectId;

    iban?: string;

    bic?: string;

    bankName?: string;

    accountHolder?: string;

    paymentMethods: (
        | "bank_transfer"
        | "card"
        | "cash"
        | "check"
    )[];

    createdAt: Date;
    updatedAt: Date;
}

const organizationBankingSchema =
    new mongoose.Schema<IOrganizationBanking>(
        {
            organization: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Organization",
                required: true,
                unique: true,
            },

            iban: {
                type: String,
            },

            bic: {
                type: String,
            },

            bankName: {
                type: String,
            },

            accountHolder: {
                type: String,
            },

            paymentMethods: [
                {
                    type: String,
                    enum: [
                        "bank_transfer",
                        "card",
                        "cash",
                        "check",
                    ],
                },
            ],
        },
        {
            timestamps: true,
        }
    );

organizationBankingSchema.index({
    organization: 1,
});

const OrganizationBanking =
    mongoose.model<IOrganizationBanking>(
        "OrganizationBanking",
        organizationBankingSchema
    );

export default OrganizationBanking;