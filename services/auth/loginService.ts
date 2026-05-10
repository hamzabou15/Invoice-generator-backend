import User from "../../models/User";
import bcrypt from "bcrypt";

// logique metier pour le login (pas de response ici, juste la logique)
export const authenticateUser = async (email: string, password: string) => {

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
        email: normalizedEmail
    })

    if (!user) throw new Error("Adresse e-mail ou mot de passe invalide");

    const hashpassword = user.passwordHash;

    const isMatch = await bcrypt.compare(password, hashpassword);

    if (!isMatch) throw new Error("Adresse e-mail ou mot de passe invalide");
    return user;

}
