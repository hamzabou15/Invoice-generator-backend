// services/onboardingService.ts


import Membership from "../../models/MemberShip";
import Organization from "../../models/organization/Organization";
import User
    from "../../models/User";

interface CreateWorkspaceParams {
    userId: string;

    workspaceType:
    | "solo"
    | "team";
}

export const createWorkspaceService =
    async ({
        userId,
        workspaceType,
    }: CreateWorkspaceParams) => {

        /* ====  GET USER ===== */

        const user =
            await User.findById(userId);

        if (!user) {
            throw new Error(
                "Utilisateur introuvable"
            );
        }

        /* ====== PREVENT DUPLICATE =========== */

        if (user.lastOrganization) {
            throw new Error(
                "Workspace déjà créé"
            );
        }

        /* ========= CREATE ORGANIZATION ========== */

        const organization =
            await Organization.create({

                owner: user._id,

      

                workspaceType,

                subscriptionPlan:
                    "free",

                subscriptionStatus:
                    "trial",

                country: "FR",

                currency: "EUR",

                onboardingCompleted:
                    false,

                profile:
                    "artisan",

                teamSize:
                    workspaceType ===
                        "solo"
                        ? "freelance"
                        : "small_team",
            });

        /* ======== CREATE MEMBERSHIP ========== */

        await Membership.create({

            user: user._id,

            organization:
                organization._id,

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
            organizationId:
                organization._id,

            workspaceType:
                organization.workspaceType,

            subscriptionPlan:
                organization.subscriptionPlan,

            onboardingStep:
                user.onboardingStep,
        };
    };