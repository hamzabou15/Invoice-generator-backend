import mongoose, { Document, Types } from "mongoose";

export interface IMembership extends Document {
    user: Types.ObjectId;

    organization: Types.ObjectId;

    role:
    | "owner"
    | "admin"
    | "member";

    status:
    | "active"
    | "pending";

    createdAt: Date;
    updatedAt: Date;
}

const membershipSchema =
    new mongoose.Schema<IMembership>(
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },

            organization: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Organization",
                required: true,
            },

            role: {
                type: String,
                enum: [
                    "owner",
                    "admin",
                    "member",
                ],
                default: "member",
            },

            status: {
                type: String,
                enum: [
                    "active",
                    "pending",
                ],
                default: "active",
            },
        },
        {
            timestamps: true,
        }
    );

membershipSchema.index(
    {
        user: 1,
        organization: 1,
    },
    {
        unique: true,
    }
);

const Membership = mongoose.model<IMembership>(
    "Membership",
    membershipSchema
);

export default Membership;