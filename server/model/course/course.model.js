import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    enrollLastDate:{
        type: Date,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
   
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    classes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
        }
    ],

    
   


    assignments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assignment',
        },
    ],

    enrolledStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],

    isactive:{
        type: Boolean,
        default: false,
    },
    rejectstudents:{
        type: Boolean,
        default: false,
    }

    
}, { timestamps: true });



export const Course = mongoose.model('Course', courseSchema);
