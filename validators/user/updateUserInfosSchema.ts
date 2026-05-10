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
        .trim()
        .optional()
        .or(z.literal("")),
    job: z.enum([
        "plombier",
        "électricien",
        "maçon",
        "peintre en bâtiment",
        "carreleur",
        "plâtrier",
        "menuisier",
        "charpentier",
        "couvreur",
        "serrurier",
        "vitrier",
        "chauffagiste",
        "mécanicien",
        "carrossier",
        "garagiste",
        "boulanger",
        "pâtissier",
        "boucher",
        "coiffeur",
        "barbier",
        "esthéticienne",
        "couturier",
        "ébéniste",
        "autre"
    ]).optional(),
});
