import z from "zod";

// Schéma de validation pour le login
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(10).max(100),
})
