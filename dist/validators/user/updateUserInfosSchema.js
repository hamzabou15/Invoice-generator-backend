"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.updateUserSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(2, "Le nom est trop court")
        .optional(),
    email: zod_1.default
        .string()
        .email("Email invalide")
        .optional(),
    numberPhone: zod_1.default
        .string()
        .trim()
        .optional()
        .or(zod_1.default.literal("")),
    job: zod_1.default.enum([
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
