import mongoose from "mongoose";
import { Assignment, Class } from "../../model/classassiment/classassiment.model.js";
import { Course } from "../../model/course/course.model.js";
import { User } from "../../model/user/user.model.js";
import sendEmail from "../../utils/sendEmail.js";
import classSendEmailTemplate from "../../utils/classSendEmailTemplate.js";


export const addClass = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, resourcesLink, classLink, date } = req.body;

        // Fetch the course by ID
        const course = await Course.findById(courseId).populate('enrolledStudents'); // Assuming course model has enrolledStudents array
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

        // Send email to all enrolled students
        if (course.enrolledStudents.length > 0) {
            const emailPromises = course.enrolledStudents.map(async (student) => {
                const { email } = student; // Assuming student has email and name fields

                return sendEmail({
                    sendTo: email,
                    subject: "New Class Announcement from Online Learning Academy",
                    html: classSendEmailTemplate({
                       
                        title, // Include class title
                        description,
                        date,
                        classLink, // Include class link
                    }),
                });
            });

            // Wait for all emails to be sent
            await Promise.all(emailPromises);
        }

        res.status(201).json({
            message: 'Class added successfully and emails sent',
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






// Controller function to submit markexport const submitMark = async (req, res) => {
    export const submitMark = async (req, res) => {
        const { submissionId } = req.params; // Submission ID from parameters
        const { mark } = req.body; // Mark from request body
        
        // Validate mark: must be a number between 0 and 100
        if (typeof mark !== 'number' || isNaN(mark) || mark < 0 || mark > 100) {
            return res.status(400).json({ message: 'Invalid mark. Please provide a number between 0 and 100.' });
        }
        
        const session = await mongoose.startSession(); // Start a session
        session.startTransaction();
        
        try {
            // Find assignment and related course info
            const assignment = await Assignment.findOne({ 'submissions._id': submissionId })
                .populate({
                    path: 'class',
                    populate: { path: 'course' },
                })
                .session(session);
            
            if (!assignment) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ message: 'Assignment not found.' });
            }
            
            // Find the specific submission
            const submissionIndex = assignment.submissions.findIndex(
                (sub) => sub._id.toString() === submissionId
            );
            
            if (submissionIndex === -1) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ message: 'Submission not found.' });
            }
            
            // Update the mark
            assignment.submissions[submissionIndex].mark = mark;
            await assignment.save({ session });
            
            const studentId = assignment.submissions[submissionIndex].student; // Student ID
            const courseId = assignment.class?.course?._id; // Course ID
            
            if (!courseId) {
                console.error('Course ID not found:', assignment.class?.course);
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ message: 'Course ID not found in the assignment.' });
            }
            
            // Find the student
            const student = await User.findById(studentId).session(session);
            if (!student) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ message: 'Student not found.' });
            }
            
            // Get all classes related to this course
            const allClasses = await Class.find({ 
                course: courseId 
            }).session(session);
            
            const classIds = allClasses.map(cls => cls._id);
            
            // Find all assignments for all classes of this course
            const allAssignments = await Assignment.find({
                class: { $in: classIds }
            }).session(session);
            
            console.log(`Found ${allAssignments.length} assignments across ${classIds.length} classes for course ${courseId}`);
            
            // Array to collect ALL marks for this student (including the current one)
            let allMarksWithDetails = [];
            
            // Gather marks from all assignments for this student
            for (const assign of allAssignments) {
                const studentSubmissions = assign.submissions.filter(
                    sub => sub.student.toString() === studentId.toString() && 
                          typeof sub.mark === 'number' && 
                          !isNaN(sub.mark)
                );
                
                for (const sub of studentSubmissions) {
                    allMarksWithDetails.push({
                        assignmentId: assign._id,
                        assignmentTitle: assign.title,
                        classId: assign.class,
                        submissionId: sub._id,
                        mark: sub.mark,
                        submittedAt: sub.submittedAt || null,
                        isCurrent: sub._id.toString() === submissionId ? true : false
                    });
                }
            }
            
            console.log(`All marks collected across classes: ${JSON.stringify(allMarksWithDetails)}`);
            
            // Extract just the marks for calculations
            const allMarks = allMarksWithDetails.map(item => item.mark);
            console.log(`All marks for calculation: ${JSON.stringify(allMarks)}`);
            
            // Sort marks from highest to lowest
            const sortedMarks = [...allMarks].sort((a, b) => b - a);
            console.log(`Sorted marks (highest to lowest): ${JSON.stringify(sortedMarks)}`);
            
            // Calculate total mark based on the top two marks
            let totalMark = 0;
            
            // If there are at least 2 marks, average the top 2
            if (sortedMarks.length >= 2) {
                console.log(`Using top two marks: ${sortedMarks[0]} and ${sortedMarks[1]}`);
                totalMark = (sortedMarks[0] + sortedMarks[1]) / 2;
                console.log(`Calculated total mark (average of top 2): ${totalMark}`);
            } else if (sortedMarks.length === 1) {
                totalMark = sortedMarks[0];
                console.log(`Using single mark: ${totalMark}`);
            } else {
                // This case shouldn't happen now, but keeping as fallback
                totalMark = mark;
                console.log(`Fallback: using current mark: ${totalMark}`);
            }
            
            // Update student's courseMarks
            if (!student.courseMarks) {
                student.courseMarks = [];
            }
            
            const courseMarkIndex = student.courseMarks.findIndex(
                (cm) => cm.course.toString() === courseId.toString()
            );
            
            if (courseMarkIndex !== -1) {
                // Update existing course mark
                student.courseMarks[courseMarkIndex].totalMark = totalMark;
            } else {
                // Add new course and mark
                student.courseMarks.push({ course: courseId, totalMark });
            }
            
            // Save student data
            await student.save({ session });
            
            await session.commitTransaction();
            session.endSession();
            
            // Group assignments by class for the response
            const assignmentsByClass = {};
            allMarksWithDetails.forEach(mark => {
                const classId = mark.classId.toString();
                if (!assignmentsByClass[classId]) {
                    assignmentsByClass[classId] = [];
                }
                assignmentsByClass[classId].push(mark);
            });
            
            // Prepare more detailed response for debugging
            return res.status(200).json({ 
                message: 'Mark submitted successfully.',
                totalMark,
                assignmentCount: allMarks.length,
                allMarks: allMarksWithDetails,  // Return detailed information about all marks
                assignmentsByClass: assignmentsByClass, // Marks grouped by class
                sortedMarks: sortedMarks,     // All marks sorted high to low
                topMarks: sortedMarks.length >= 2 ? [sortedMarks[0], sortedMarks[1]] : sortedMarks,
                calculationExplanation: sortedMarks.length >= 2 
                    ? `Total mark calculated as (${sortedMarks[0]} + ${sortedMarks[1]}) / 2 = ${totalMark}`
                    : sortedMarks.length === 1 
                        ? `Total mark is the single mark: ${sortedMarks[0]}` 
                        : `No previous marks found, using current mark: ${mark}`
            });
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            console.error('Error in submitMark:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    };


    








