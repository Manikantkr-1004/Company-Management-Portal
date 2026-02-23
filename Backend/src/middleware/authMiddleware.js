import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const cookieName= process.env.NODE_ENV === 'production' ? "__Host-auth-token" : "auth-token";
        let token = req.signedCookies?.[cookieName];

        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.id).select("-password").lean();

        if (!user) {
            return res.status(401).json({ message: "User not exist" });
        }
        req.user = {...user, id: user._id};

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid/missing token", error: error.message });
    }
};