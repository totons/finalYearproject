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
        const { submissionId } = req.params; // সাবমিশন আইডি প্যারামিটার থেকে নেওয়া।
        const { mark } = req.body; // মার্ক বডি থেকে নেওয়া।
    
        // মার্ক চেক করা: ০ থেকে ১০০ এর মধ্যে কিনা
        if (typeof mark !== 'number' || isNaN(mark) || mark < 0 || mark > 100) {
            return res.status(400).json({ message: 'মার্ক সঠিক নয়। ০ থেকে ১০০ এর মধ্যে একটি সংখ্যা দিন।' });
        }
    
        const session = await mongoose.startSession(); // সেশন শুরু করা।
        session.startTransaction();
    
        try {
            // অ্যাসাইনমেন্ট এবং কোর্সের তথ্য খুঁজে বের করা।
            const assignment = await Assignment.findOne({ 'submissions._id': submissionId })
                .populate({
                    path: 'class',
                    populate: { path: 'course' },
                })
                .session(session);
    
            if (!assignment) {
                await session.abortTransaction();
                return res.status(404).json({ message: 'অ্যাসাইনমেন্ট পাওয়া যায়নি।' });
            }
    
            // সাবমিশন খুঁজে বের করা।
            const submission = assignment.submissions.find(
                (sub) => sub._id.toString() === submissionId
            );
    
            if (!submission) {
                await session.abortTransaction();
                return res.status(404).json({ message: 'সাবমিশন পাওয়া যায়নি।' });
            }
    
            // মার্ক আপডেট করা।
            submission.mark = mark;
            await assignment.save({ session });
    
            const studentId = submission.student; // শিক্ষার্থীর আইডি।
            const courseId = assignment.class?.course?._id; // কোর্স আইডি।
    
            if (!courseId) {
                console.error('কোর্স আইডি নেই:', assignment.class?.course);
                await session.abortTransaction();
                return res.status(400).json({ message: 'অ্যাসাইনমেন্টে কোর্স আইডি পাওয়া যায়নি।' });
            }
    
            // শিক্ষার্থী খুঁজে বের করা।
            const student = await User.findById(studentId).session(session);
            if (!student) {
                await session.abortTransaction();
                return res.status(404).json({ message: 'শিক্ষার্থী পাওয়া যায়নি।' });
            }
    
            // শিক্ষার্থীর `courseMarks` আপডেট করা।
            const courseMarkIndex = student.courseMarks.findIndex(
                (cm) => cm.course.toString() === courseId.toString()
            );
    
            if (courseMarkIndex !== -1) {
                // কোর্স ইতোমধ্যে আছে, তাই মার্ক যোগ করা হচ্ছে।
                student.courseMarks[courseMarkIndex].totalMark += mark;
            } else {
                // নতুন কোর্স এবং মার্ক যোগ করা।
                student.courseMarks.push({ course: courseId, totalMark: mark });
            }
    
            // শিক্ষার্থীর ডেটা সেভ করা।
            await student.save({ session });
    
            await session.commitTransaction();
            session.endSession();
    
            return res.status(200).json({ message: 'মার্ক সফলভাবে জমা হয়েছে।' });
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            console.error('submitMark এ ত্রুটি:', err);
            return res.status(500).json({ message: 'সার্ভার ত্রুটি' });
        }
    };
    








