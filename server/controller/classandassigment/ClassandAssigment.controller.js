import mongoose from "mongoose";
import { Assignment, Class } from "../../model/classassiment/classassiment.model.js";
import { Course } from "../../model/course/course.model.js";



export const addClass = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, resourcesLink, classLink, date } = req.body;

        // Fetch the course by ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Create a new class document
        const newClass = await Class.create({
            title,
            description,
            resourcesLink,
            classLink,
            date,
            course: courseId, // Link this class to the course
        });

        // Add the new class ID to the classes array in the course
        course.classes.push(newClass._id);

        // Save the updated course
        await course.save();

        res.status(201).json({
            message: 'Class added successfully',
            class: newClass, // Return the newly created class
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add class', error: error.message });
    }
};


export const getClasses = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Find the course by ID and populate 'classes' and 'assignments' inside each class
        const course = await Course.findById(courseId)
            .populate({
                path: 'classes', // Populate classes array
                populate: {
                    path: 'assignments', // Populate assignments for each class
                    model: 'Assignment', // Specify the model for the assignments
                },
            })
            .select('classes'); // Only select the 'classes' field (to avoid returning unnecessary fields)

        // If the course is not found, return an error
        if (!course) return res.status(404).json({ message: 'Course not found' });

        // Return the populated classes
        res.status(200).json({ classes: course.classes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch classes', error: error.message });
    }
};




export const addAssignment = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, submissionDeadline, classId } = req.body;
        const file = req.file;  // Multer adds the file to req.file

        if (!file) {
            return res.status(400).json({ message: 'File upload failed.' });
        }

        // Validate IDs
        if (!mongoose.isValidObjectId(classId) || !mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Find class
        const targetClass = await Class.findById(classId);
        if (!targetClass) return res.status(404).json({ message: 'Class not found' });
        if (targetClass.course.toString() !== courseId) {
            return res.status(400).json({ message: 'Class does not belong to the course' });
        }

        // Create assignment
        const newAssignment = new Assignment({
            title,
            description,
            submissionDeadline,
            fileUrl: file.path,  // Store the file URL
            class: classId,
            courseId,
        });

        const savedAssignment = await newAssignment.save();

        // Add the assignment to the class
        targetClass.assignments.push(savedAssignment._id);
        await targetClass.save();

        res.status(201).json({ message: 'Assignment added successfully', assignment: savedAssignment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add assignment', error: err.message });
    }
};



export const submitAssignment = async (req, res) => {
    try {
        const { courseId, assignmentId } = req.params;
        const { studentId } = req.body;  // Ensure that studentId is passed in the body

        // Ensure file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "File not uploaded" });
        }

        const fileUrl = req.file.path;

        // Find the course and assignment
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        // Check if the student has already submitted the assignment
        const existingSubmission = assignment.submissions.find(
            (submission) => submission.student.toString() === studentId
        );

        if (existingSubmission) {
            return res.status(400).json({ message: "You have already submitted this assignment." });
        }

        // Add submission to the assignment
        assignment.submissions.push({ student: studentId, fileUrl });
        await assignment.save(); // Save on the Assignment model directly

        res.status(201).json({ message: "Assignment submitted successfully", submissions: assignment.submissions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to submit assignment", error: error.message });
    }
};








export const getAssignments = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).select('assignments');
        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.status(200).json({ assignments: course.assignments });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch assignments', error: error.message });
    }
};



