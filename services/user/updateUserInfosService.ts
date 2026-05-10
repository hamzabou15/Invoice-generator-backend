import User from "../../models/User"

interface UpdateUserInformationsParams {
    userId: string
    email?: string
    name?: string
    numberPhone?: string
    job?: string
}



export const updateUserInformationsService =
    async ({
        userId,
        email,
        name,
        numberPhone,
        job
    }: UpdateUserInformationsParams) => {

        const updateData: any = {}

        if (email) {
            updateData.email = email
        }

        if (name) {
            updateData.name = name
        }

        if (numberPhone) {
            updateData.numberPhone = numberPhone
        }
        if (job) {
            updateData.job = job
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        )

        if (!user) {
            throw new Error("Utilisateur introuvable")
        }

        return user
    }