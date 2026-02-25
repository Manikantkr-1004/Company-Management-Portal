import { ProjectModel } from "../models/Project.js";
import { ServiceRequestModel } from "../models/ServiceRequest.js";


export const createServiceRequest = async (req, res) => {
    try {
        const { service, description } = req.body;
        if (!service || !description) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        const existRequest = await ServiceRequestModel.findOne({client: req.user._id, service});
        if(existRequest){
            return res.status(400).json({message: "You have alrady made request for this service"})
        }

        const request = new ServiceRequestModel({
            client: req.user._id,
            service,
            description,
        });
        await request.save();

        res.status(201).json({ message: 'Service Request Sent Successfully', data: request });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const getServiceRequests = async (req, res) => {
    try {
        let requests;

        if (req.user.role === "admin") {
            requests = await ServiceRequestModel.find().populate("client", "name email").populate("service", "name").sort({createdAt: -1});
        } else {
            requests = await ServiceRequestModel.find({ client: req.user._id }).populate("service", "name").sort({createdAt: -1});
        }

        res.json({ message: 'Services fetched successfully', data: requests });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const updateServiceRequest = async (req, res) => {
    try {
        if (!req.params.id || !req.body.action) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }
        const request = await ServiceRequestModel.findById(req.params.id).populate("service").populate("client");

        if (!request) {
            return res.status(404).json({ message: "Service Request not found" });
        }

        const actionStatus = ["pending", "approved", "rejected"];
        if (!actionStatus.includes(req.body.action)) {
            return res.status(400).json({ message: 'Please provide valid action' });
        }
        if (request.status === req.body.action) {
            return res.status(400).json({ message: "Already processed" });
        }

        request.status = req.body.action;
        await request.save();

        if (req.body.action !== 'approved') {
            res.json({ message: 'Request done' });
            return;
        }

        // Create project
        await ProjectModel.create({
            name: request.service.name,
            description: request.description,
            client: request.client._id,
        });

        res.json({ message: "Request done and project created" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};