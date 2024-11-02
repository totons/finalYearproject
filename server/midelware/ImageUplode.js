import multer from 'multer';
import { storage } from '../utils/cloudinary.js'; // Make sure the path is correct

// Create multer instance with Cloudinary storage
export const upload = multer({ storage });


