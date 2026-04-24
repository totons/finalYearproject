import express from 'express';
import { getAllActiveInstructors, getEnrolledCourses, getSingleUserById, loginUser, loginUserProfile, logout, registerUser, updateInstructorProfile } from '../../controller/user/user.controller.js';
import { isAuthenticated } from '../../midelware/user.auth.js';

import { upload } from '../../midelware/ImageUplode.js';
import { isInstruct } from '../../midelware/instructor.js';


const router = express.Router();


// Route for uploading the image

router.post('/signup', upload.single("image"), registerUser)
router.post('/login', loginUser)
router.post('/logout', logout)
router.get('/me', isAuthenticated, loginUserProfile)

router.get('/ins', getAllActiveInstructors)
router.patch('/instructor/:id', isAuthenticated, isInstruct, updateInstructorProfile);
router.get('/course', isAuthenticated, getEnrolledCourses);
router.post('/course', isAuthenticated, isInstruct)
    // router.post ('/emailsend',emailsend)
    // router.post ('/change-passwoed',changepasswd)



router.get('/:studentId/:courseId', isAuthenticated, getSingleUserById);




export default router