import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    try {
        const cookieName= process.env.NODE_ENV === 'production' ? "__Host-auth-token" : "auth-token";
        let token = req.signedCookies?.[cookieName];

        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not exist" });
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid/missing token" });
    }
};