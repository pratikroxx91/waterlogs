import jwt from 'jsonwebtoken';
import "dotenv/config";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Access denied",
            });
        };
        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default authMiddleware;