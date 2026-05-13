"use strict";
// services/onboardingService.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkspaceService = void 0;
const MemberShip_1 = __importDefault(require("../../models/MemberShip"));
const Organization_1 = __importDefault(require("../../models/organization/Organization"));
const User_1 = __importDefault(require("../../models/User"));
const createWorkspaceService = async ({ userId, workspaceType, }) => {
    /* ====  GET USER ===== */
    const user = await User_1.default.findById(userId);
    if (!user) {
        throw new Error("Utilisateur introuvable");
    }
    /* ====== PREVENT DUPLICATE =========== */
    if (user.lastOrganization) {
        throw new Error("Workspace déjà créé");
    }
    /* ========= CREATE ORGANIZATION ========== */
    const organization = await Organization_1.default.create({
        owner: user._id,
        workspaceType,
        subscriptionPlan: "free",
        subscriptionStatus: "trial",
        country: "FR",
        currency: "EUR",
        onboardingCompleted: false,
        profile: "artisan",
        teamSize: workspaceType ===
            "solo"
            ? "freelance"
            : "small_team",
    });
    /* ======== CREATE MEMBERSHIP ========== */
    await MemberShip_1.default.create({
        user: user._id,
        organization: organization._id,
        role: "owner",
        status: "active",
    });
    /* ======== USER ============= */
    user.lastOrganization =
        organization._id;
    user.hasCompletedOnboarding =
        true;
    user.onboardingStep =
        "first-quote";
    await user.save();
    /* ======= RETURN ========= */
    return {
        organizationId: organization._id,
        workspaceType: organization.workspaceType,
        subscriptionPlan: organization.subscriptionPlan,
        onboardingStep: user.onboardingStep,
    };
};
exports.createWorkspaceService = createWorkspaceService;
