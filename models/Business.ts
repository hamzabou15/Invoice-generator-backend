import mongoose, { mongo } from "mongoose";


interface IBusiness extends mongoose.Document {
    user: mongoose.Types.ObjectId; // relation avec User
    businessName: string;
    brandName?: string;
    teamSize: string;
    website?: string;
    phone: string;
    country: string;
    currency: string;
    createdAt: Date;
}

const businessSchema = new mongoose.Schema<IBusiness>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    businessName: { type: String, required: true },
    brandName: { type: String },
    teamSize: { type: String, required: true },
    website: { type: String },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    currency: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Business = mongoose.model<IBusiness>("Business", businessSchema);

export default Business;