// courseController.js

import mongoose from "mongoose";
import { Course } from "../../model/course/course.model.js";
import { User } from "../../model/user/user.model.js";

import PDFDocument from 'pdfkit';

import { Assignment, Class } from "../../model/classassiment/classassiment.model.js";



// export const generateStudentPDF = async (req, res) => {
//     try {
//         const { courseId } = req.params;

//         // Fetch course details and enrolled students
//         const course = await Course.findById(courseId)
//             .populate('enrolledStudents') // Populating enrolled students
//             .populate('instructor'); // Populating instructor

//         if (!course) {
//             return res.status(404).json({ error: 'Course not found' });
//         }

//         if (!course.enrolledStudents || course.enrolledStudents.length === 0) {
//             return res.status(400).json({ error: 'No enrolled students found' });
//         }

//         // Fetch assignments and their submissions
//         const assignments = await Assignment.find({ class: { $in: course.classes } }).populate('submissions.student');

//         res.setHeader('Content-Disposition', 'attachment; filename="Enrolled_Students.pdf"');
//         res.setHeader('Content-Type', 'application/pdf');

//         const doc = new PDFDocument({ margin: 20 });
//         doc.pipe(res);

//         doc.font('Helvetica-Bold').fontSize(24).fillColor('#000')
//             .text(`Online Learning Academy`, { align: 'center' });
        
//         // **Title Section**
//         doc.font('Helvetica-Bold').fontSize(16).fillColor('#0056b3')
//             .text(`Course Name - ${course.title}`, { align: 'center' });
//         doc.font('Helvetica-Bold').fontSize(16).fillColor('#0056b3')
//             .text(`Instructor Name - ${course.instructor.fullname}`, { align: 'center' });
       
//         doc.fillColor('black');

//         // **Define Table Columns**
//         const startX = 10;
//         const startY = 150;
//         const rowHeight = 30;

//         // Dynamic width calculation with additional columns for attendance and written marks
//         const availableWidth = 250; // Reduced available width for assignments to accommodate new columns
        
//         // Column widths array with additional columns for attendance and written marks
//         const colWidths = [
//             40, // S.No
//             60, // Full Name
//             ...Array(assignments.length).fill(availableWidth / assignments.length), // Assignments
//             60, // Attendance Mark
//             60, // Written Mark
//             60, // Assignment Mark
//             60  // Total Mark
//         ];

//         let x = startX;
//         let y = startY;

//         // **Table Header with Background**
//         doc.rect(startX, startY, colWidths.reduce((sum, w) => sum + w, 0), rowHeight).fill('#0056b3');
//         doc.fillColor('white').fontSize(12).font('Helvetica-Bold');
        
//         doc.text('S.No', x, y + 4, { width: colWidths[0], align: 'center' });
//         x += colWidths[0];
//         doc.text('Full Name', x, y + 4, { width: colWidths[1], align: 'center' });
//         x += colWidths[1];

//         // Add Assignment Headers
//         assignments.forEach((_, i) => {
//             doc.text(`Ass ${i + 1}`, x, y + 8, { width: colWidths[i + 2], align: 'center' });
//             x += colWidths[i + 2];
//         });

//         // Add Attendance, Written, Assignment Mark and Total headers
//         doc.text('Attend.', x, y + 6, { width: colWidths[colWidths.length - 4], align: 'center' });
//         x += colWidths[colWidths.length - 4];
//         doc.text('Written', x, y + 6, { width: colWidths[colWidths.length - 3], align: 'center' });
//         x += colWidths[colWidths.length - 3];
//         doc.text('Assgn.', x, y + 6, { width: colWidths[colWidths.length - 2], align: 'center' });
//         x += colWidths[colWidths.length - 2];
//         doc.text('Total', x, y + 6, { width: colWidths[colWidths.length - 1], align: 'center' });

//         doc.fillColor('black').stroke();
//         y += rowHeight;

//         // **Student Data Rows with Alternating Colors**
//         course.enrolledStudents.forEach((student, index) => {
//             const isEvenRow = index % 2 === 0;
//             if (isEvenRow) {
//                 doc.rect(startX, y, colWidths.reduce((sum, w) => sum + w, 0), rowHeight).fill('#f2f2f2');
//                 doc.fillColor('black');
//             }

//             // Find student marks in course.studentMarks
//             const studentMark = course.studentMarks?.find(mark => 
//                 mark.student.toString() === student._id.toString()
//             ) || { attendanceMark: 0, writtenMark: 0 };
            
//             const attendanceMark = studentMark.attendanceMark || 0;
//             const writtenMark = studentMark.writtenMark || 0;
            
//             // Collect all marks from assignments
//             let allAssignmentMarks = [];
            
//             assignments.forEach(assignment => {
//                 const submission = assignment.submissions.find(sub => 
//                     sub.student._id.toString() === student._id.toString()
//                 );
//                 if (submission && submission.mark !== null && submission.mark !== undefined) {
//                     allAssignmentMarks.push(submission.mark);
//                 }
//             });
            
//             // Sort marks from highest to lowest
//             allAssignmentMarks.sort((a, b) => b - a);
            
//             // Calculate assignment mark using top two marks or just one if that's all we have
//             let assignmentMark = 0;
//             if (allAssignmentMarks.length >= 2) {
//                 assignmentMark = (allAssignmentMarks[0] + allAssignmentMarks[1]) / 2;
//             } else if (allAssignmentMarks.length === 1) {
//                 assignmentMark = allAssignmentMarks[0];
//             }
            
//             // Calculate total mark (attendance + written + assignment)
//             const totalMark = attendanceMark + writtenMark + assignmentMark;

//             x = startX;
//             doc.text(index + 1, x, y + 8, { width: colWidths[0], align: 'center' });
//             x += colWidths[0];

//             doc.text(student.fullname || 'N/A', x, y + 8, { width: colWidths[1], align: 'center' });
//             x += colWidths[1];

//             // Assignment marks
//             assignments.forEach((assignment, i) => {
//                 const submission = assignment.submissions.find(sub => 
//                     sub.student._id.toString() === student._id.toString()
//                 );
//                 const mark = submission ? submission.mark : null;
//                 let markText = '-';

//                 if (mark !== null && mark !== undefined) {
//                     markText = `${mark}`;
//                 }

//                 // **Text color change based on Pass/Fail**
//                 const isPassed = mark >= 40;
//                 doc.fillColor(isPassed ? 'green' : 'red').text(markText, x, y + 8, { width: colWidths[i + 2], align: 'center' });

//                 x += colWidths[i + 2];
//             });

//             // Add attendance mark
//             doc.fillColor('black').text(attendanceMark.toString(), x, y + 8, { width: colWidths[colWidths.length - 4], align: 'center' });
//             x += colWidths[colWidths.length - 4];
            
//             // Add written mark
//             doc.text(writtenMark.toString(), x, y + 8, { width: colWidths[colWidths.length - 3], align: 'center' });
//             x += colWidths[colWidths.length - 3];
            
//             // Add assignment mark
//             doc.text(assignmentMark.toFixed(1), x, y + 8, { width: colWidths[colWidths.length - 2], align: 'center' });
//             x += colWidths[colWidths.length - 2];
            
//             // Add total mark with color coding
//             const isPassed = totalMark >= 40;
//             doc.fillColor(isPassed ? 'green' : 'red').text(
//                 totalMark.toFixed(1) + (isPassed ? ' (P)' : ' (F)'), 
//                 x, y + 8, 
//                 { width: colWidths[colWidths.length - 1], align: 'center' }
//             );

//             doc.stroke();
//             y += rowHeight;
            
//             // Check if we need to start a new page
//             if (y > doc.page.height - 50) {
//                 doc.addPage();
//                 y = 50; // Reset Y position for the new page
//             }
//         });

//         // Add a summary section at the end
//         y += 10;
//         // doc.fillColor('black').font('Helvetica-Bold').fontSize(14)
//         //     .text('Course Summary', startX, y);
        
//         // y += 20;
//         // doc.font('Helvetica').fontSize(12);
        
//         // Calculate pass/fail statistics
//         let passedCount = 0;
//         let failedCount = 0;
        
//         course.enrolledStudents.forEach(student => {
//             const studentMark = course.studentMarks?.find(mark => 
//                 mark.student.toString() === student._id.toString()
//             ) || { attendanceMark: 0, writtenMark: 0 };
            
//             const attendanceMark = studentMark.attendanceMark || 0;
//             const writtenMark = studentMark.writtenMark || 0;
            
//             // Collect all marks from assignments
//             let allAssignmentMarks = [];
            
//             assignments.forEach(assignment => {
//                 const submission = assignment.submissions.find(sub => 
//                     sub.student._id.toString() === student._id.toString()
//                 );
//                 if (submission && submission.mark !== null && submission.mark !== undefined) {
//                     allAssignmentMarks.push(submission.mark);
//                 }
//             });
            
//             // Sort marks from highest to lowest
//             allAssignmentMarks.sort((a, b) => b - a);
            
//             // Calculate assignment mark using top two marks or just one if that's all we have
//             let assignmentMark = 0;
//             if (allAssignmentMarks.length >= 2) {
//                 assignmentMark = (allAssignmentMarks[0] + allAssignmentMarks[1]) / 2;
//             } else if (allAssignmentMarks.length === 1) {
//                 assignmentMark = allAssignmentMarks[0];
//             }
            
//             // Calculate total mark
//             const totalMark = attendanceMark + writtenMark + assignmentMark;
            
//             if (totalMark >= 40) passedCount++;
//             else failedCount++;
//         });
        
//         // doc.text(`Total Students: ${course.enrolledStudents.length}`, startX, y);
//         // y += 20;
//         // doc.text(`Passed: ${passedCount} (${((passedCount / course.enrolledStudents.length) * 100).toFixed(1)}%)`, startX, y);
//         // y += 20;
//         // doc.text(`Failed: ${failedCount} (${((failedCount / course.enrolledStudents.length) * 100).toFixed(1)}%)`, startX, y);
        
//         doc.end();
//     } catch (error) {
//         console.error('PDF Generation Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };







export const generateStudentPDF = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId)
            .populate('enrolledStudents')
            .populate('instructor');

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        if (!course.enrolledStudents || course.enrolledStudents.length === 0) {
            return res.status(400).json({ error: 'No enrolled students found' });
        }

        const assignments = await Assignment.find({ class: { $in: course.classes } }).populate('submissions.student');

        res.setHeader('Content-Disposition', 'attachment; filename="Enrolled_Students.pdf"');
        res.setHeader('Content-Type', 'application/pdf');

        const doc = new PDFDocument({ margin: 20 });
        doc.pipe(res);

        doc.font('Helvetica-Bold').fontSize(24).fillColor('#000')
            .text(`Online Learning & Assignment Submission System`, { align: 'center' });

        doc.font('Helvetica-Bold').fontSize(16).fillColor('#0056b3')
            .text(`Course Name - ${course.title}`, { align: 'center' });
        doc.font('Helvetica-Bold').fontSize(16).fillColor('#0056b3')
            .text(`Instructor Name - ${course.instructor.fullname}`, { align: 'center' });

        doc.fillColor('black');

        const getGrade = (mark) => {
            const num = Number(mark || 0);

            if (num >= 80) return 'A+';
            if (num >= 75) return 'A';
            if (num >= 70) return 'A-';
            if (num >= 65) return 'B+';
            if (num >= 60) return 'B';
            if (num >= 55) return 'B-';
            if (num >= 50) return 'C+';
            if (num >= 45) return 'C';
            if (num >= 40) return 'D';
            return 'F';
        };

        const startX = 10;
        const startY = 150;
        const rowHeight = 30;

        const availableWidth = 210;

        const colWidths = [
            40, // S.No
            70, // Full Name
            ...Array(assignments.length).fill(availableWidth / assignments.length), // Assignments
            55, // Attendance Mark
            55, // Written Mark
            55, // Assignment Mark
            55, // Total Mark
            45  // Grade
        ];

        let x = startX;
        let y = startY;

        doc.rect(startX, startY, colWidths.reduce((sum, w) => sum + w, 0), rowHeight).fill('#0056b3');
        doc.fillColor('white').fontSize(12).font('Helvetica-Bold');

        doc.text('S.No', x, y + 4, { width: colWidths[0], align: 'center' });
        x += colWidths[0];

        doc.text('Full Name', x, y + 4, { width: colWidths[1], align: 'center' });
        x += colWidths[1];

        assignments.forEach((_, i) => {
            doc.text(`Ass ${i + 1}`, x, y + 8, { width: colWidths[i + 2], align: 'center' });
            x += colWidths[i + 2];
        });

        doc.text('Attend.', x, y + 6, { width: colWidths[colWidths.length - 5], align: 'center' });
        x += colWidths[colWidths.length - 5];

        doc.text('Written', x, y + 6, { width: colWidths[colWidths.length - 4], align: 'center' });
        x += colWidths[colWidths.length - 4];

        doc.text('Assgn.', x, y + 6, { width: colWidths[colWidths.length - 3], align: 'center' });
        x += colWidths[colWidths.length - 3];

        doc.text('Total', x, y + 6, { width: colWidths[colWidths.length - 2], align: 'center' });
        x += colWidths[colWidths.length - 2];

        doc.text('Grade', x, y + 6, { width: colWidths[colWidths.length - 1], align: 'center' });

        doc.fillColor('black').stroke();
        y += rowHeight;

        course.enrolledStudents.forEach((student, index) => {
            const isEvenRow = index % 2 === 0;
            if (isEvenRow) {
                doc.rect(startX, y, colWidths.reduce((sum, w) => sum + w, 0), rowHeight).fill('#f2f2f2');
                doc.fillColor('black');
            }

            const studentMark = course.studentMarks?.find(mark =>
                mark.student.toString() === student._id.toString()
            ) || { attendanceMark: 0, writtenMark: 0 };

            const attendanceMark = studentMark.attendanceMark || 0;
            const writtenMark = studentMark.writtenMark || 0;

            let allAssignmentMarks = [];

            assignments.forEach(assignment => {
                const submission = assignment.submissions.find(sub =>
                    sub.student._id.toString() === student._id.toString()
                );
                if (submission && submission.mark !== null && submission.mark !== undefined) {
                    allAssignmentMarks.push(submission.mark);
                }
            });

            allAssignmentMarks.sort((a, b) => b - a);

            let assignmentMark = 0;
            if (allAssignmentMarks.length >= 2) {
                assignmentMark = (allAssignmentMarks[0] + allAssignmentMarks[1]) / 2;
            } else if (allAssignmentMarks.length === 1) {
                assignmentMark = allAssignmentMarks[0];
            }

            const totalMark = attendanceMark + writtenMark + assignmentMark;
            const grade = getGrade(totalMark);

            x = startX;
            doc.fillColor('black').text(index + 1, x, y + 8, { width: colWidths[0], align: 'center' });
            x += colWidths[0];

            doc.text(student.fullname || 'N/A', x, y + 8, { width: colWidths[1], align: 'center' });
            x += colWidths[1];

            assignments.forEach((assignment, i) => {
                const submission = assignment.submissions.find(sub =>
                    sub.student._id.toString() === student._id.toString()
                );
                const mark = submission ? submission.mark : null;
                let markText = '-';

                if (mark !== null && mark !== undefined) {
                    markText = `${mark}`;
                }

                doc.fillColor('black').text(markText, x, y + 8, {
                    width: colWidths[i + 2],
                    align: 'center'
                });

                x += colWidths[i + 2];
            });

            doc.fillColor('black').text(attendanceMark.toString(), x, y + 8, {
                width: colWidths[colWidths.length - 5],
                align: 'center'
            });
            x += colWidths[colWidths.length - 5];

            doc.text(writtenMark.toString(), x, y + 8, {
                width: colWidths[colWidths.length - 4],
                align: 'center'
            });
            x += colWidths[colWidths.length - 4];

            doc.text(assignmentMark.toFixed(1), x, y + 8, {
                width: colWidths[colWidths.length - 3],
                align: 'center'
            });
            x += colWidths[colWidths.length - 3];

            doc.text(totalMark.toFixed(1), x, y + 8, {
                width: colWidths[colWidths.length - 2],
                align: 'center'
            });
            x += colWidths[colWidths.length - 2];

            doc.text(grade, x, y + 8, {
                width: colWidths[colWidths.length - 1],
                align: 'center'
            });

            doc.stroke();
            y += rowHeight;

            if (y > doc.page.height - 50) {
                doc.addPage();
                y = 50;
            }
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



const PASS_THRESHOLD = 40;

export const getCourseStatistics = async (req, res) => {
    try {
        const { courseId } = req.params;
        const PASS_THRESHOLD = 40; // Add this constant that was missing

        // Validate course exists and user has access
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Get all enrolled students
        const enrolledStudents = course.enrolledStudents;
        const totalStudents = enrolledStudents.length;

        if (totalStudents === 0) {
            return res.status(200).json({
                passed: 0,
                failed: 0,
                absent: 0,
                totalStudents: 0,
                averageAttendanceMark: 0,
                averageWrittenMark: 0,
                averageTotalMark: 0
            });
        }

        // Get all classes for this course
        const allClasses = await Class.find({ course: courseId });
        
        // Get all assignment IDs associated with these classes
        const assignmentIds = [];
        for (const classItem of allClasses) {
            // Ensure we're getting all assignment IDs from the class model
            if (classItem.assignments && classItem.assignments.length > 0) {
                assignmentIds.push(...classItem.assignments);
            }
        }

        // Debug: Output assignment count
        console.log(`Found ${assignmentIds.length} assignments for course ${courseId}`);

        // Calculate studentMarks totals and averages
        let totalAttendanceMark = 0;
        let totalWrittenMark = 0;
        let totalStudentsWithMarks = 0;

        if (course.studentMarks && course.studentMarks.length > 0) {
            for (const mark of course.studentMarks) {
                totalAttendanceMark += mark.attendanceMark || 0;
                totalWrittenMark += mark.writtenMark || 0;
                totalStudentsWithMarks++;
            }
        }

        const averageAttendanceMark = totalStudentsWithMarks > 0 ? totalAttendanceMark / totalStudentsWithMarks : 0;
        const averageWrittenMark = totalStudentsWithMarks > 0 ? totalWrittenMark / totalStudentsWithMarks : 0;
        const averageTotalMark = totalStudentsWithMarks > 0 ? (totalAttendanceMark + totalWrittenMark) / totalStudentsWithMarks : 0;

        if (assignmentIds.length === 0) {
            // No assignments in this course, use only studentMarks for statistics
            let passed = 0;
            let failed = 0;
            let absent = totalStudents - totalStudentsWithMarks;

            if (course.studentMarks) {
                for (const mark of course.studentMarks) {
                    const totalMark = (mark.attendanceMark || 0) + (mark.writtenMark || 0);
                    if (totalMark >= PASS_THRESHOLD) {
                        passed++;
                    } else {
                        failed++;
                    }
                }
            }

            return res.status(200).json({
                passed,
                failed,
                absent,
                totalStudents,
                averageAttendanceMark,
                averageWrittenMark,
                averageTotalMark
            });
        }

        // Fetch all assignments with submissions
        const assignments = await Assignment.find({
            _id: { $in: assignmentIds }
        });

        // Debug: Check if assignments have submissions
        let totalSubmissions = 0;
        assignments.forEach(a => {
            totalSubmissions += a.submissions?.length || 0;
        });
        console.log(`Found ${totalSubmissions} total submissions across all assignments`);

        // Initialize student performance tracking with all students marked as absent initially
        const studentPerformance = {};
        enrolledStudents.forEach(studentId => {
            const studentIdStr = studentId.toString();
            studentPerformance[studentIdStr] = {
                totalAssignments: assignmentIds.length,
                submittedAssignments: 0,
                totalMarks: 0,
                averageScore: 0,
                attendanceMark: 0,
                writtenMark: 0,
                status: 'absent' // Default status
            };
        });

        // Add studentMarks data to the studentPerformance object
        if (course.studentMarks) {
            for (const mark of course.studentMarks) {
                const studentIdStr = mark.student.toString();
                if (studentPerformance[studentIdStr]) {
                    studentPerformance[studentIdStr].attendanceMark = mark.attendanceMark || 0;
                    studentPerformance[studentIdStr].writtenMark = mark.writtenMark || 0;
                }
            }
        }

        // Process each assignment and its submissions
        for (const assignment of assignments) {
            if (!assignment.submissions || assignment.submissions.length === 0) continue;
            
            for (const submission of assignment.submissions) {
                // Make sure we have a valid student reference
                if (!submission.student) continue;
                
                const studentId = submission.student.toString();
                
                // Check if this student is enrolled in this course
                if (studentPerformance[studentId]) {
                    // Update the student's submission count and total marks
                    studentPerformance[studentId].submittedAssignments += 1;
                    
                    // Make sure mark is a number (default to 0 if not present)
                    const mark = typeof submission.mark === 'number' ? submission.mark : 0;
                    studentPerformance[studentId].totalMarks += mark;
                    
                    // Debug output
                    console.log(`Student ${studentId} - Assignment: ${assignment._id}, Mark: ${mark}`);
                }
            }
        }

        // Calculate statistics
        let passed = 0;
        let failed = 0;
        let absent = 0;

        // Process each student's performance
        for (const studentId in studentPerformance) {
            const student = studentPerformance[studentId];
            
            if (student.submittedAssignments === 0) {
                // Student didn't submit any assignments
                absent++;
                console.log(`Student ${studentId} marked as absent`);
            } else {
                // Calculate average score from assignments
                student.averageScore = student.totalMarks / student.submittedAssignments;
                
                // Add attendance and written marks to the total score
                const totalScore = student.averageScore + student.attendanceMark + student.writtenMark;
                
                // Debug
                console.log(`Student ${studentId} - Average Score: ${student.averageScore}, Attendance: ${student.attendanceMark}, Written: ${student.writtenMark}, Total: ${totalScore}, Threshold: ${PASS_THRESHOLD}`);
                
                // Determine if passed or failed
                if (totalScore >= PASS_THRESHOLD) {
                    passed++;
                    console.log(`Student ${studentId} marked as passed`);
                } else {
                    failed++;
                    console.log(`Student ${studentId} marked as failed`);
                }
            }
        }
        
        // Final debug
        console.log(`Final stats - Passed: ${passed}, Failed: ${failed}, Absent: ${absent}, Total: ${totalStudents}`);

        // Return statistics
        return res.status(200).json({
            passed,
            failed,
            absent,
            totalStudents,
            averageAttendanceMark,
            averageWrittenMark,
            averageTotalMark
        });

    } catch (error) {
        console.error('Error getting course statistics:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const addOrUpdateStudentMark = async (req, res) => {
    const { courseId } = req.params;
    const { studentId, attendanceMark, writtenMark } = req.body;

    // Validate the attendance and written marks
    if (attendanceMark < 0 || attendanceMark > 8) {
        return res.status(400).json({ message: 'Attendance mark must be between 0 and 8' });
    }

    if (writtenMark < 0 || writtenMark > 72) {
        return res.status(400).json({ message: 'Written mark must be between 0 and 72' });
    }

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const existingEntry = course.studentMarks.find(
            (mark) => mark.student.toString() === studentId
        );

        if (existingEntry) {
            // Update existing marks
            existingEntry.attendanceMark = attendanceMark;
            existingEntry.writtenMark = writtenMark;
        } else {
            // Add new marks
            course.studentMarks.push({ student: studentId, attendanceMark, writtenMark });
        }

        await course.save();
        res.status(200).json({ message: 'Marks saved successfully', data: course.studentMarks });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



// Controller.js
export const getStudentMarkById = async (req, res) => {
    const { courseId, studentId } = req.params;
    
    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        
        const mark = course.studentMarks.find(
            (m) => m.student.toString() === studentId
        );
        
        if (!mark) return res.status(404).json({ message: 'Marks not found for this student' });
        
        res.status(200).json(mark);
    } catch (error) {
        console.error('Error in getStudentMarkById:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



