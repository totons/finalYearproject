import express from 'express';
import {
    createCertificate,
    getAllCertificates,
    getCertificateByCourseAndUser,
    updateCertificate,
    deleteCertificate
} from './Certificate.controller.js';
import { upload } from '../../midelware/ImageUplode.js';

const router = express.Router();

// Routes
router.post('/', upload.single("image"), createCertificate); // Create a certificate
router.get('/', getAllCertificates); // Get all certificates
router.get('/certificates/:courseId/:userId', getCertificateByCourseAndUser); // Get a certificate by ID
router.put('/:id', updateCertificate); // Update a certificate
router.delete('/:id', deleteCertificate); // Delete a certificate

export default router;