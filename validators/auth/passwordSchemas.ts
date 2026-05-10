import z from "zod"

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