import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    image: {
        type: String,
        required: true,
    }



}, { timestamps: true });



export const Certificate = mongoose.model('Certificate', certificateSchema);