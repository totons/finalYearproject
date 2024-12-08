import express from 'express';

import { isAuthenticated } from '../../midelware/user.auth.js';
import { isInstruct } from '../../midelware/instructor.js';
import { addCourse, deleteCourse,  getAllCourses, getCourseById,  getEnrolledStudents,  getenrollStudent, getPendingCourses, publishCourse, unpublishCourse, updateCourse } from '../../controller/course/course.controller.js';
import { upload } from '../../midelware/ImageUplode.js';
import { isAdmin } from '../../midelware/admin.js';





const router =express.Router();


// Route for uploading the image

router.post('/add',upload.single("images"), isAuthenticated,isInstruct, addCourse )

// Route for publishing a course (by admin)
router.patch('/publish/:courseId', isAuthenticated, isAdmin, publishCourse);

// Route for publishing a course (by admin)
router.patch('/unpublish/:courseId', isAuthenticated, isAdmin, unpublishCourse);


// Route for fetching all pending courses (for admin)
router.get('/pending', isAuthenticated, isAdmin, getPendingCourses);

// Route for fetching enrolled students in a specific course
router.get('/courses/:courseId/students', isAuthenticated,isInstruct, getEnrolledStudents);

// Route for enrolling a student in a course
router.post('/courses/:courseId/enroll', isAuthenticated, getenrollStudent);

// Route for fetching all active courses (optional: for students)
router.get('/', getAllCourses);
router.get('/:courseId', getCourseById);


//update course by instaractor 
router.put('/:courseId',upload.single("imagess"),isAuthenticated,isInstruct ,updateCourse);

router.delete('/:courseId',isAuthenticated,isInstruct ,deleteCourse);



export default router