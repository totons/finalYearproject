import express from 'express';
import {
    createCertificate,
    getAllCertificates,
    getCertificateByCourseAndUser,
    updateCertificate,
    deleteCertificate
} from './Certificate.controller.js';
import { upload } from '../../midelware/ImageUplode.js';
import { isAuthenticated } from '../../midelware/user.auth.js';

const router = express.Router();

// Routes
router.post('/', upload.single("image"), isAuthenticated, createCertificate); // Create a certificate
router.get('/',isAuthenticated, getAllCertificates); // Get all certificates
router.get('/certificates/:courseId/:userId',   isAuthenticated, getCertificateByCourseAndUser); // Get a certificate by ID
router.put('/:id',  isAuthenticated, updateCertificate); // Update a certificate
router.delete('/:id', isAuthenticated, deleteCertificate); // Delete a certificate

export default router;