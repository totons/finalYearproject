import express from 'express';
import { loginUser, loginUserProfile, logout, registerUser, updateInstructorProfile } from '../../controller/user/user.controller.js';
import  {isAuthenticated}  from '../../midelware/user.auth.js';

import { upload } from '../../midelware/ImageUplode.js';
import { isInstruct } from '../../midelware/instructor.js';


const router =express.Router();


// Route for uploading the image

router.post('/signup',upload.single("image"), registerUser)
router.post('/login', loginUser)
router.post('/logout', logout)
router.get('/me', isAuthenticated,loginUserProfile)


router.patch('/instructor/:id', isAuthenticated, isInstruct, updateInstructorProfile);




export default router