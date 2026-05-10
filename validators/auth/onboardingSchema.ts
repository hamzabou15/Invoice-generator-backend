// validators/onboarding.ts

import { z } from "zod";

export const workspaceSchema = z.object({
    workspaceType: z.enum([
        "solo",
        "team",
    ]),
});
