// import cloudinary from 'cloudinary';
// import { CloudinaryStorage } from "multer-storage-cloudinary"; // Destructuring import
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.join(__dirname, '..', '.env') });

// // Cloudinary configuration
// cloudinary.v2.config({
//     cloud_name: process.env.clude_Name,  // Ensure these environment variables are set correctly
//     api_key: process.env.clude_Api_key,
//     api_secret: process.env.clude_Api_secrit,
// });

// // Set up Cloudinary storage
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary.v2,  
//     params: {
//         folder: "uploads", // Specify the folder in your Cloudinary account
//         format: async (req, file) => "jpg", // You can customize this to determine the format dynamically
//         public_id: (req, file) => file.originalname.split(".")[0], // Generate a unique public ID
//     },
// });

// // Export the configured cloudinary and storage
// export { cloudinary, storage };


import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

cloudinary.config({
  cloud_name: process.env.clude_Name,
  api_key: process.env.clude_Api_key,
  api_secret: process.env.clude_Api_secrit,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "lms_uploads",
      resource_type: "auto",
      public_id: `${Date.now()}-${file.originalname
        .split(".")[0]
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
    };
  },
});

export { cloudinary, storage };
