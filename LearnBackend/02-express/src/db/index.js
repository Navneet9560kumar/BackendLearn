import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in the environment variables");
    }

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    console.log(
      `\n MongoDB connected! DB host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB Connection error:", error);
    console.error("Exiting process due to MongoDB connection error...");
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
