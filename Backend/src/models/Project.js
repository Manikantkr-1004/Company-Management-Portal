import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    client: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, // only client role user
    assignedEmployees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // only employee role users
    }],
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
}, { versionKey: false, timestamps: true });

export const ProjectModel = mongoose.model('Project', projectSchema);