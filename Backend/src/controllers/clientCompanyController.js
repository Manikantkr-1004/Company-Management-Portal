import { ClientCompanyModel } from "../models/ClientCompany.js";

export const createClientCompany = async (req, res) => {
    try {
        const { name, description } = req.body;
        if(!name.trim() || !description.trim()){
            return res.status(400).json({message: 'Please provide all fields'});
        }

        await ClientCompanyModel.create({
            name,
            description,
            createdBy: req.user._id
        });
        res.status(201).json({ message: "Client Company created successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

export const getClientCompany = async (req, res) => {
    try {
        const clientCompanies = await ClientCompanyModel.find().populate('createdBy', 'name email role').sort({createdAt: -1});
        res.json({ message: "Client company fetched successfully", data: clientCompanies });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}