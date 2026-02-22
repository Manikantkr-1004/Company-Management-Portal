import { ServiceModel } from "../models/Service.js";

export const createService = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name.trim() || !description.trim()) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        const service = await ServiceModel.create({
            name,
            description,
            createdBy: req.user._id,
        });

        res.status(201).json({ message: 'Service Created Successfully', data: service });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const getServices = async (req, res) => {
    try {
        const services = await ServiceModel.find();
        res.json({message: 'Services fetched successfully', data: services});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};