import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  } // by admin only
}, {versionKey: false, timestamps: true});

export const ServiceModel = mongoose.model('Service', serviceSchema);