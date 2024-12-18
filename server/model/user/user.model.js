import mongoose from "mongoose";




const workExperienceSchema = new mongoose.Schema({
    company:{
        type: String,
        required: true,
    } ,
    position: {
        type: String,
        required: true,
    },
    startDate:{
        type: Date,
        required: true,
    },
    endDate:{
        type: Date,
        
    },
    description:{
        type: String,
        maxlength: 500, // Optional character limit
        
    },
});


export const Work = mongoose.model('Work', workExperienceSchema);



const educationExperienceSchema = new mongoose.Schema({
    institution: {
        type: String,
        required: true,
    },
    degree:{
        type: String,
        required: true,
    },
    startDate:{
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        
    },
    description:{
        type: String,
        maxlength: 500, // Optional character limit
    },
});


export const Education = mongoose.model('Education', educationExperienceSchema);


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { 
        type: String, 
        required: true,
        minlength: 8 
    },
    image: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'student','instruct'],
        default: 'admin',
        required: true,
        
    },

    enrolmentCourse: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
    ],

    courses: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }
        
    ],
    
    
    totalMark: {
        type: Number,
        default: 0,
    },

    //instractor
    skills: {
        type: String,
        
    },
    workExperience: [
        {
            type: mongoose.Schema.Types.ObjectId,
        ref: 'Work',
        }
    ],
    educationExperience: [
          {
            type: mongoose.Schema.Types.ObjectId,
        ref: 'Education',
        }
    ],
    githubLink: {
        type: String,
    },
    linkedInLink: {
        type: String,
    },
    aboutUs: {
        type: String,
        maxlength: 500, 
        default: '', 
    },

   
    
    

}, { timestamps: true }); 

export const User = mongoose.model('User', userSchema);