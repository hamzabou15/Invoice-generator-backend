"use strict";
// validators/onboarding.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspaceSchema = void 0;
const zod_1 = require("zod");
exports.workspaceSchema = zod_1.z.object({
    workspaceType: zod_1.z.enum([
        "solo",
        "team",
    ]),
});
