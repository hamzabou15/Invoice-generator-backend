import User from "../../models/User";

// service to get the user 
export const getMeService = async (userId: string) => {
    const user = await User.findById(userId)
        .select("name email numberPhone job")
        .lean();

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};
