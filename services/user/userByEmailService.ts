import User from "../../models/User";

export const getUserByEmailService = async (email: string) => {

    try {
        const user = await User.findOne({ email: email });
        if (!user) throw new Error("User not found");
        return user;

    } catch (error) {
        throw new Error("Erreur lors de la récupération de l'utilisateur par e-mail");
    }
}