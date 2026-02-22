import mongoose from 'mongoose';

const clientCompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Stringm, required: true },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    } // by Admin only
}, { versionKey: false, timestamps: true });

export const ClientCompanyModel = mongoose.model('ClientCompany', clientCompanySchema);