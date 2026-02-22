import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";
import { isEmailValid } from "../utils/emailPattern.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role, company } = req.body;

        if (!name.trim() || !email.trim() || !password.trim() || !role.trim()) {
            return res.status(400).json({ message: "Please provide all fields" });
        }
        if (!isEmailValid.test(email)) {
            return res.status(400).json({ message: "Email is invalid" });
        }

        // Prevent creating another admin
        if (role === "admin") {
            return res.status(403).json({ message: "Cannot create another admin user" });
        }
        if (role === 'client' && !company) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            role,
            company: role === "client" ? company : null,
        });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const filter = req.query.role ? { role: req.query.role } : { role: { $ne: 'admin' } };
        const users = await UserModel.find(filter).select("-password");
        res.json({ message: "Users Fetched Successfully!", data: users })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, password} = req.body;
        if(!id){
            return res.status(400).json({ message: "Please provide userId" });
        }
        const user = await UserModel.findOne({_id: id});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let updatedData = {};
        if(name.trim()) updatedData.name = name;
        if(password.trim()){
            const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);
            updatedData.password = hashedPassword;
        }

        await UserModel.findOneAndUpdate({_id: id}, updatedData, {new: true});

        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({ message: "Please provide userId" });
        }
        const user = await UserModel.findOne({_id: id});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(403).json({ message: "Cannot delete admin" });
        }

        await UserModel.findOneAndDelete({ _id: id });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};