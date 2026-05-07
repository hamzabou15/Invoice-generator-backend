import z from "zod";

export const updateUserSchema = z.object({
    name: z
        .string()
        .min(2, "Le nom est trop court")
        .optional(),

    email: z
        .string()
        .email("Email invalide")
        .optional(),

    numberPhone: z
        .string()
        .min(8, "Numéro invalide")
        .optional(),
});