import mongoose from "mongoose";
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with an error code
    }
}