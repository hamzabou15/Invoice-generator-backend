import jwt from 'jsonwebtoken';

const generateAcessToken = (id: string) => {

    return jwt.sign(
        { id }, process.env.JWT_SECRET || "", { expiresIn: '30d' }
    )
}

export { generateAcessToken };