import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        
    },
   
    code: {
        type: String,
        
    },
    expiresAt: {
        type: Number,
        
    },
    
    

}, { timestamps: true }); // Adds createdAt and updatedAt fields

export const OTP = mongoose.model('OTP', otpSchema);