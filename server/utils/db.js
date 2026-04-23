// import mongoose from "mongoose";

// const connectdb = async() => {
//     try {
//         await mongoose.connect(process.env.mongo_url, {
//             serverSelectionTimeoutMS: 30000, // 30 seconds
//         });
//         console.log("MongoDB Connected!");
//     } catch (err) {
//         console.error(err);

//     }
// }
// export default connectdb
import mongoose from "mongoose";

let isConnected = false;

const connectdb = async () => {
  try {
    if (isConnected) {
      console.log("MongoDB already connected");
      return;
    }

    const mongoUri = process.env.MONGO_URI || process.env.mongo_url;

    if (!mongoUri) {
      throw new Error("MongoDB URI missing. Add MONGO_URI in Vercel environment variables.");
    }

    const db = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

export default connectdb;
