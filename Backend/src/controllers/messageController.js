import { MessageModel } from "../models/Message.js";
import { UserModel } from "../models/User.js";

export const sendMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body;
        if (!receiverId.trim() || !content.trim()) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        const receiver = await UserModel.findById(receiverId);

        if (!receiver) {
            return res.status(400).json({ message: "Receiver not exist" });
        }

        if (receiverId === req.user._id) {
            return res.status(400).json({ message: 'Please provide valid fields value' });
        }

        await MessageModel.create({
            sender: req.user._id,
            receiver: receiverId,
            content,
        });

        res.json({ message: "Message sent" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const getConversation = async (req, res) => {
    try {
        const otherUserId = req.params.userId;

        const messages = await MessageModel.find({
            $or: [
                { sender: req.user._id, receiver: otherUserId },
                { sender: otherUserId, receiver: req.user._id },
            ],
        }).sort({ createdAt: 1 });

        res.json({ message: 'Messages fetched successfully!', data: messages });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const getChatUsers = async (req, res) => {
    try {
        let users;

        if (req.user.role === "admin") {
            users = await UserModel.find({ role: { $in: ["employee", "client"] } }).select("name role email");
        }

        if (req.user.role === "employee") {
            users = await UserModel.find({ role: { $in: ["admin", "client"] } }).select("name role email");
        }

        if (req.user.role === "client") {
            users = await UserModel.find({ role: { $in: ["admin", "employee"] } }).select("name role email");
        }

        res.json({ message: 'ChatUsers fetched successfully', data: users });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};