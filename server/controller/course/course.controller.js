// courseController.js

import mongoose from "mongoose";
import { Course } from "../../model/course/course.model.js";
import { User } from "../../model/user/user.model.js";
import PDFDocument from 'pdfkit';

import { Assignment } from "../../model/classassiment/classassiment.model.js";



export const generateStudentPDF = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Fetch course details and enrolled students
        const course = await Course.findById(courseId)
    .populate('enrolledStudents') // Populating enrolled students
    .populate('instructor'); // Populating instructor


        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        if (!course.enrolledStudents || course.enrolledStudents.length === 0) {
            return res.status(400).json({ error: 'No enrolled students found' });
        }

        // Fetch assignments and their submissions
        const assignments = await Assignment.find({ class: { $in: course.classes } }).populate('submissions.student');

        res.setHeader('Content-Disposition', 'attachment; filename="Enrolled_Students.pdf"');
        res.setHeader('Content-Type', 'application/pdf');

        const doc = new PDFDocument({ margin: 20 });
        doc.pipe(res);

        doc.font('Helvetica-Bold').fontSize(24).fillColor('#000')
            .text(`Online Learning Academy`, { align: 'center' });
        
        // **Title Section**
        doc.font('Helvetica-Bold').fontSize(16).fillColor('#0056b3')
            .text(`Course Name - ${course.title}`, { align: 'center' });
        doc.font('Helvetica-Bold').fontSize(16).fillColor('#0056b3')
            .text(`Instractor Name - ${course.instructor.fullname}`, { align: 'center' });
       
        doc.fillColor('black');

        // **Define Table Columns**
        const startX = 50;
        const startY = 150;
        const rowHeight = 30;

        // Dynamic width calculation: divide the width by the number of assignments
        const availableWidth = 300; // Set a reasonable available width for assignments columns
        const colWidths = [50, 180, ...Array(assignments.length).fill(availableWidth / assignments.length)];

        let x = startX;
        let y = startY;

        // **Table Header with Background**
        doc.rect(startX, startY, colWidths.reduce((sum, w) => sum + w, 0), rowHeight).fill('#0056b3');
        doc.fillColor('white').fontSize(12).font('Helvetica-Bold');
        
        doc.text('S.No', x, y + 8, { width: colWidths[0], align: 'center' });
        x += colWidths[0];
        doc.text('Full Name', x, y + 8, { width: colWidths[1], align: 'center' });
        x += colWidths[1];

        // Add Assignment Headers
        assignments.forEach((_, i) => {
            doc.text(`Ass ${i + 1}`, x, y + 8, { width: colWidths[i + 2], align: 'center' });
            x += colWidths[i + 2];
        });

        doc.fillColor('black').stroke();
        y += rowHeight;

        // **Student Data Rows with Alternating Colors**
        course.enrolledStudents.forEach((student, index) => {
            const isEvenRow = index % 2 === 0;
            if (isEvenRow) {
                doc.rect(startX, y, colWidths.reduce((sum, w) => sum + w, 0), rowHeight).fill('#f2f2f2');
                doc.fillColor('black');
            }

            x = startX;
            doc.text(index + 1, x, y + 8, { width: colWidths[0], align: 'center' });
            x += colWidths[0];

            doc.text(student.fullname || 'N/A', x, y + 8, { width: colWidths[1], align: 'center' });
            x += colWidths[1];

            assignments.forEach((assignment, i) => {
                const submission = assignment.submissions.find(sub => sub.student._id.toString() === student._id.toString());
                const mark = submission ? submission.mark : null;
                let markText = '-';

                if (mark !== null) {
                    const status = mark >= 40 ? '(P)' : '(F)';
                    markText = `${mark} ${status}`;
                }

                // **Text color change based on Pass/Fail**
                const isPassed = mark >= 40;
                doc.fillColor(isPassed ? 'green' : 'red').text(markText, x, y + 8, { width: colWidths[i + 2], align: 'center' });

                x += colWidths[i + 2];
            });

            doc.stroke();
            y += rowHeight;
        });

        doc.end();
    } catch (error) {
        console.error('PDF Generation Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add a new course (by instructor)
export const addCourse = async (req, res) => {
    try {
        // Log the incoming request
     

        const { title, description, enrollLastDate, skills, price } = req.body; // Destructure request body
        const instructorId = req.user.id; // Assuming instructor ID is populated correctly
        const images = req.file ? req.file.path : null;
        console.log('Image path:', req.file ? req.file.path : 'No image uploaded');

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





//publish or reject Approve  a course (by admin)
export const publishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
      

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
        const course = await Course.findById(courseId)
  .populate('enrolledStudents')
  .populate({
    path: 'classes',
    populate: {
      path: 'assignments',
    },
  });

        if (!course) {
            return res.status(404).json({ message: 'Course not found!' });
        }

        return res.status(200).json(course);
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
 

        // Find the course by ID
        const course = await Course.findByIdAndDelete(courseId);
        if (!course) {
            console.error("Course not found for ID:", courseId); // Log if course is not found
            return res.status(404).json({ message: 'Course not found!' });
        }

        // Delete the course
        
       
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



