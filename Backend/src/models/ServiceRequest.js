import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema({
    client: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    service: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Service', 
        required: true 
    },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
}, { versionKey: false, timestamps: true });

export const ServiceRequestModel = mongoose.model('ServiceRequest', serviceRequestSchema);