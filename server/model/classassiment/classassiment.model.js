
import mongoose from "mongoose";


const classSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxlength: 500,
    },
    resourcesLink: {
        type: String, // Link to class material
    },
    classLink: {
        type: String, // Link to class
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Optional: Track the course
    },
    assignments: [ // Renamed for clarity
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assignment',
        },
    ],
});

export const Class = mongoose.model('Class', classSchema);

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxlength: 500,
    },
    fileUrl: {
        type: String,
    },
  
    submissionDeadline: {
        type: Date,
        required: true,
    },
    class: { // Changed to a single reference
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    submissions: [
        {
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            fileUrl: {
                type: String, 
                required: true,
            },
            submittedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);







