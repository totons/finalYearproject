// import express from 'express';
// import { addAssignment, addClass, getAssignments, getClasses, submitAssignment,submitMark } from '../../controller/classandassigment/ClassandAssigment.controller.js';


// import multer from 'multer';
// import path from 'path';
// import { isAuthenticated } from '../../midelware/user.auth.js';
// import { Assignment } from '../../model/classassiment/classassiment.model.js';

// const router = express.Router();



// router.post('/:courseId/add-class', addClass);
// router.get('/:courseId/classes', getClasses);


// // Set up storage configuration for multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads'); // You can change the folder to where you want to store files
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//     }
// });

// const upload = multer({ storage: storage });

// router.post('/:courseId/add-assignment', upload.single('file'), addAssignment);

// router.post(
//     '/courses/:courseId/assignments/:assignmentId/submit',
//     upload.single('file'),
//     isAuthenticated,
//     submitAssignment
// );


// router.get('/:courseId/assignments', getAssignments);

// router.patch('/assignments/submit-mark/:submissionId/:studentId', submitMark);


// // PUT or PATCH: /api/assignments/:assignmentId/submissions/:submissionId/review

// router.patch(
//   "/assignments/:assignmentId/submissions/:submissionId/review",
//   async (req, res) => {
//     const { assignmentId, submissionId } = req.params;
//     const { review } = req.body;
//     console.log(review)

//     const assignment = await Assignment.findById(assignmentId);
//     const sub = assignment.submissions.id(submissionId);
//     sub.review = review;
//     await assignment.save();
//     res.json({ message: "Review updated successfully" });
//   }
// );



// export default router;


import express from "express";
import {
  addAssignment,
  addClass,
  getAssignments,
  getClasses,
  submitAssignment,
  submitMark,
} from "../../controller/classandassigment/ClassandAssigment.controller.js";

import multer from "multer";
import { storage } from "../../utils/cloudinary.js";
import { isAuthenticated } from "../../midelware/user.auth.js";
import { Assignment } from "../../model/classassiment/classassiment.model.js";

const router = express.Router();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post("/:courseId/add-class", addClass);

router.get("/:courseId/classes", getClasses);

router.post(
  "/:courseId/add-assignment",
  upload.single("file"),
  addAssignment
);

router.post(
  "/courses/:courseId/assignments/:assignmentId/submit",
  upload.single("file"),
  isAuthenticated,
  submitAssignment
);

router.get("/:courseId/assignments", getAssignments);

router.patch(
  "/assignments/submit-mark/:submissionId/:studentId",
  submitMark
);

router.patch(
  "/assignments/:assignmentId/submissions/:submissionId/review",
  async (req, res) => {
    try {
      const { assignmentId, submissionId } = req.params;
      const { review } = req.body;

      const assignment = await Assignment.findById(assignmentId);

      if (!assignment) {
        return res.status(404).json({
          success: false,
          message: "Assignment not found",
        });
      }

      const sub = assignment.submissions.id(submissionId);

      if (!sub) {
        return res.status(404).json({
          success: false,
          message: "Submission not found",
        });
      }

      sub.review = review;
      await assignment.save();

      return res.status(200).json({
        success: true,
        message: "Review updated successfully",
      });
    } catch (error) {
      console.error("Review update error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to update review",
        error: error.message,
      });
    }
  }
);

export default router;