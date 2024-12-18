import express from 'express';
import { addAssignment, addClass, getAssignments, getClasses, submitAssignment,submitMark } from '../../controller/classandassigment/ClassandAssigment.controller.js';


import multer from 'multer';
import path from 'path';
import { isAuthenticated } from '../../midelware/user.auth.js';

const router = express.Router();



router.post('/:courseId/add-class', addClass);
router.get('/:courseId/classes', getClasses);


// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // You can change the folder to where you want to store files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

router.post('/:courseId/add-assignment', upload.single('file'), addAssignment);

router.post(
    '/courses/:courseId/assignments/:assignmentId/submit',
    upload.single('file'),
    isAuthenticated,
    submitAssignment
);


router.get('/:courseId/assignments', getAssignments);
router.patch('/assignments/submit-mark/:submissionId/:studentId', submitMark);



export default router;


