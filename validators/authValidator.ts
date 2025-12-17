// Validation des données (Zod / Joi)

import { z } from 'zod';

// Schéma de validation pour l'inscription
export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(10).max(100).regex(/[A-Z]/, "Must contain at least one uppercase letter").regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[0-9]/, "Must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    name: z.string().min(2).max(100).optional(),
    // phoneNumber: z.string().regex(/^\+\d{10,15}$/, "Invalid phone number"),
})

// Schéma de validation pour le login
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(10).max(100),
})

// Schéma de validation pour le forgot password
export const foergotPasswordSchema = z.object({
    email: z.string().email()
})

// Schéma de validation pour le reset password
export const resetPasswordSchema = z.object({
    newPassword: z.string().min(10).max(100).regex(/[A-Z]/, "Must contain at least one uppercase letter").regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[0-9]/, "Must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    newPasswordConfirm: z.string().min(10).max(100),
})