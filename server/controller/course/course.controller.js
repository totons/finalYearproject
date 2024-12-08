// courseController.js

import mongoose from "mongoose";
import { Course } from "../../model/course/course.model.js";
import { User } from "../../model/user/user.model.js";



// Add a new course (by instructor)
export const addCourse = async (req, res) => {
    try {
        // Log the incoming request
     

        const { title, description, enrollLastDate, skills, price } = req.body; // Destructure request body
        const instructorId = req.user.id; // Assuming instructor ID is populated correctly
        const images = req.file ? req.file.path : null;

        // Create a new course object
        const newCourse = new Course({
            title,
            images,
            description,
            enrollLastDate, // Make sure it matches your model
            skills,
            price,
            instructor: instructorId,
        });

        // Save the new course
        await newCourse.save();

        await User.findByIdAndUpdate(
            instructorId,
            { $push: { courses: newCourse._id } }, // Add the course ID to the user's courses array
            { new: true } // Return the updated user
        );

        // Respond with success
        return res.status(201).json({ message: 'Course submitted for approval!', course: newCourse });
    } catch (error) {
        // Log the full error object for better insight
        console.error('Error in addCourse:', error);
        return res.status(500).json({ message: 'Failed to add course!', error: error.message });
    }
};



// Approve or publish a course (by admin)
export const publishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        console.log(courseId)

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found!' });
        }

        // Update course status to active
        course.isactive = true;
        await course.save();

        return res.status(200).json({ message: 'Course published successfully!', course });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to publish course!', error: error.message });
    }
};


// not Approve or not publish a course (by admin)
export const unpublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Find the course and populate instructor's work and education experience, courses
        const course = await Course.findById(courseId).populate('workExperience').populate('courses');
           

        if (!course) {
            return res.status(404).json({ message: 'Course not found!' });
        }

        // Update course status to inactive
        course.isactive = false;
        await course.save();

        return res.status(200).json(course); // Return the course details including populated fields
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};





// Get all courses pending approval (by admin)
export const getPendingCourses = async (req, res) => {
    try {
        const pendingCourses = await Course.find({ isactive: false }).populate('instructor')
        return res.status(200).json(pendingCourses);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch pending courses!', error: error.message });
    }
};

// Get all students enrolled in a specific course
export const getEnrolledStudents = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Find the course and populate students
        const course = await Course.findById(courseId).populate('enrolledStudents');
        if (!course) {
            return res.status(404).json({ message: 'Course not found!' });
        }

        return res.status(200).json(course.enrolledStudents);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch enrolled students!', error: error.message });
    }
};

// Enroll a student in a course
export const getenrollStudent = async (req, res) => {
    try {
        const { courseId } = req.params;
        const studentId = req.user.id; // Assuming user ID is extracted from authentication middleware

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found!' });
        }

        // Find the user
        const user = await User.findById(studentId);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Check if the student is already enrolled in the course
        if (course.enrolledStudents.includes(studentId)) {
            return res.status(400).json({ message: 'Student already enrolled in this course!' });
        }

        // Enroll the student in the course
        course.enrolledStudents.push(studentId);
        await course.save();

        // Add the course to the user's enrolmentCourse array
        user.enrolmentCourse.push(courseId);
        await user.save();

        return res.status(200).json({ message: 'Student enrolled successfully!', course });
    } catch (error) {
        console.error('Error enrolling student:', error.message);
        return res.status(500).json({ message: 'Failed to enroll student!', error: error.message });
    }
};

// Get all courses (optional: for students)
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isactive: true }).populate('instructor');
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch courses!', error: error.message });
    }
};




//update course information in instractor
export const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, images, description, enrollLastDate, skills, price } = req.body;

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found!' });
        }

        // Update course information
        course.title = title;
        course.images = images;
        course.description = description;
        course.enrollLastDate = enrollLastDate;
        course.skills = skills;
        course.price = price;

        await course.save();

        return res.status(200).json({ message: 'Course information updated successfully!', course });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update', error });
        
    }
}


//delete a course in instaractor
export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params; // Extracting courseId from request parameters
        console.log("Received request to delete course with ID:", courseId); // Log the received course ID

        // Find the course by ID
        const course = await Course.findByIdAndDelete(courseId);
        if (!course) {
            console.error("Course not found for ID:", courseId); // Log if course is not found
            return res.status(404).json({ message: 'Course not found!' });
        }

        // Delete the course
        
        console.log("Deleted course with ID:", courseId); // Log successful deletion
        return res.status(200).json({ message: 'Course deleted successfully!' });
    } catch (error) {
        console.error("Failed to delete course:", error); // Log the error
        return res.status(500).json({ message: 'Failed to delete course!', error });
    }
};


//get single course by id


export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        console.log("Received courseId:", courseId);

        // Check if courseId is a valid ObjectID
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            console.error("Invalid course ID format:", courseId);
            return res.status(400).json({ message: 'Invalid course ID format!' });
        }

        // Find course by ID and populate instructor, including nested fields
        const course = await Course.findById(courseId)
            .populate({
                path: 'instructor',
                populate: [
                    { path: 'workExperience' },
                    { path: 'educationExperience' }
                ]
            });

        console.log("Fetched course object with populated instructor:", course);

        if (!course) {
            console.error("Course not found for ID:", courseId);
            return res.status(404).json({ message: 'Course not found!' });
        }

        return res.status(200).json(course);
    } catch (error) {
        console.error("Failed to fetch course:", error);
        return res.status(500).json({ message: 'Failed to fetch course!', error: error.message });
    }
};



