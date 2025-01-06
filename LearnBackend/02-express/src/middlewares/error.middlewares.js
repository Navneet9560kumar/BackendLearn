import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

// Yeh ek error handling middleware hai
const errroHandler = (err, req, res, next) => {
  let error = err;

  // Agar error ApiError ka instance nahi hai, to naya ApiError banao
  if (!(err instanceof ApiError)) {
    const statusCode = err.statusCode || (err instanceof mongoose.Error ? 400 : 500); // Status code set karo
    const message = err.message || "Kuch galat ho gaya"; // Default error message set karo
    error = new ApiError(statusCode, message, err?.errors || [], err?.stack); // Naya ApiError create karo
  }

  // Error ka response object prepare karo
  const response = {
    message: error.message, // Error ka message
    errors: error.errors || [], // Agar koi errors hai to unhe include karo
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // Agar development mode hai to stack trace bhi bhejo
  };

  // Response return karo
  return res.status(error.statusCode).json(response); // Status code ke saath response bhejo
};

export { errroHandler };
