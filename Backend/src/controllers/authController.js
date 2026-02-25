import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";
import { generateCsrfToken } from "../config/csrf.js";
import { isEmailValid } from "../utils/emailPattern.js";

const generateJwtToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// LOGIN
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email.trim() || !password.trim()){
            return res.status(400).json({message: 'Please provide all fields'});
        }

        if(!isEmailValid.test(email)){
            return res.status(400).json({message: 'Email is invalid'});
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        user.userAgent = req.headers['user-agent'];
        await user.save();

        const token = generateJwtToken(user);

        const cookieName = process.env.NODE_ENV === 'production' ? "__Host-auth-token" : "auth-token";
        res.cookie(cookieName, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            path: '/',
            signed: true,
        });

        res.json({
            message: 'Login successfull!', data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt,
                    userAgent: user.userAgent
                },
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// LOGOUT
export const logoutUser = async (req, res) => {
    try {
        // just simple logout functionality
        const cookieName = process.env.NODE_ENV === 'production' ? "__Host-auth-token" : "auth-token";
        res.clearCookie(cookieName);
        res.json({message: 'Logout Successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// GET CURRENT USER
export const getMe = async (req, res) => {
    res.json({message: "User got successfully", data: req.user});
};

// GET CSRF Token
export const getCsrfToken = (req, res) => {
    const token = generateCsrfToken(req, res);
    res.json({ message: "CSRF Token got successfully!", data: token });
}