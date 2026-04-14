import jwt from "jsonwebtoken";

// midlle ware pour recuprer le token (et decter le id email .... du user)
export const authMiddleware = (req: any, res: any, next: any) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};