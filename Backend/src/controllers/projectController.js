import { ProjectModel } from "../models/Project.js";

export const getProjects = async (req, res) => {
    try {
        let projects;

        if (req.user.role === "admin") {
            projects = await ProjectModel.find().populate("client", "name email").populate("assignedEmployees", "name email").sort({createdAt: -1});
        }

        if (req.user.role === "employee") {
            projects = await ProjectModel.find({ assignedEmployees: req.user._id, }).populate("client", "name email").sort({createdAt: -1});
        }

        if (req.user.role === "client") {
            projects = await ProjectModel.find({ client: req.user._id }).populate("assignedEmployees", "name email").sort({createdAt: -1});
        }

        res.json({ message: 'Projects fetched successfully', data: projects });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const assignEmployees = async (req, res) => {
    try {
        const { employeeIds } = req.body;
        if(!Array.isArray(employeeIds) || employeeIds.length===0){
            return res.status(400).json({message: 'Please provide valid field'});
        }

        const project = await ProjectModel.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        project.assignedEmployees = employeeIds;
        project.status = "in-progress";

        await project.save();

        res.json({ message: "Employees assigned successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const updateProjectStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const project = await ProjectModel.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Ensure employee is assigned
        if (!project.assignedEmployees.includes(req.user._id)) {
            return res.status(403).json({ message: "Not assigned to this project" });
        }

        const projectStatus = ["pending", "in-progress", "completed"];
        if (!projectStatus.includes(status)) {
            return res.status(400).json({ message: 'Please provide valid status' });
        }

        project.status = status;
        await project.save();

        res.json({ message: "Project status updated" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};