import bcrypt from "bcrypt";
import { isEmailValid } from "./emailPattern.js";
import { UserModel } from "../models/User.js";

export const firstAdminSeed = async () => {
    try {
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const saltRound = +process.env.SALT_ROUND || 5;
        if(!email || !password){
            console.error('Email and Password required for First Admin Seed');
            process.exit(1);
        }

        if(!isEmailValid.test(email)){
            console.error('Please provide valid Admin email');
            process.exit(1);
        }

        const existAdmin = await UserModel.findOne({email, role: 'admin'});
        if(existAdmin){
            console.log('Admin Exist in Database, Thanks.');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, saltRound);
        const firstAdmin = new UserModel({
            name: 'Admin',
            email,
            password: hashedPassword,
            role: "admin"
        })
        firstAdmin.save();

        console.log('First Admin Seeded Successfully!!')

    } catch (error) {
        console.error("Error in First admin seed", error);
        process.exit(1);
    }
}