import { Certificate } from './Certificate.model.js';

// Create a new certificate
export const createCertificate = async(req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        const image = req.file.path; // URL provided by Cloudinary
        console.log('Uploaded image URL:', image);

        const { userId, courseId } = req.body;

        // Validate required fields
        if (!userId || !courseId) {
            return res.status(400).json({ message: 'User ID and Course ID are required' });
        }

        console.log(`user id ${userId} and course id ${courseId}`);

        // Optional: Check if the image URL is a valid Cloudinary URL (only if it's a strict requirement)
        // if (!/^https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\//.test(image)) {
        //     return res.status(400).json({ message: 'Invalid image URL provided' });
        // }

        // Check if a certificate already exists for this user and course
        const existingCertificate = await Certificate.findOne({ userId, courseId });
        if (existingCertificate) {
            return res.status(400).json({ message: 'Certificate already exists for this user and course. Only one certificate can be uploaded per course.' });
        }

        // Create new certificate object
        const certificate = new Certificate({
            userId,
            courseId,
            image: image, // Store the uploaded image URL from Cloudinary
        });

        // Save certificate to the database
        await certificate.save();

        // Respond with success
        res.status(201).json({
            message: 'Certificate created successfully',
            certificate,
        });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error creating certificate:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};




// Get all certificates
export const getAllCertificates = async(req, res) => {
    try {
        const certificates = await Certificate.find().populate('userId').populate('courseId');
        res.status(200).json(certificates);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get certificate by ID
export const getCertificateByCourseAndUser = async(req, res) => {
    try {
        const { courseId, userId } = req.params; // Assuming these are passed in the route params

        // Find the certificate by courseId and userId
        const certificate = await Certificate.findOne({ courseId, userId })
            .populate('userId') // Assuming userId references a User collection
            .populate('courseId'); // Assuming courseId references a Course collection

        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        // Return the found certificate
        res.status(200).json(certificate);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// Update a certificate
export const updateCertificate = async(req, res) => {
    try {
        const { certificateUrl } = req.body;
        const certificate = await Certificate.findByIdAndUpdate(
            req.params.id, { certificateUrl }, { new: true }
        );

        if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
        res.status(200).json({ message: 'Certificate updated successfully', certificate });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete a certificate
export const deleteCertificate = async(req, res) => {
    try {
        const certificate = await Certificate.findByIdAndDelete(req.params.id);
        if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
        res.status(200).json({ message: 'Certificate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};