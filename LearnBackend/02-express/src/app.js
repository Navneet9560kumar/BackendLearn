import express from "express";
import cors from "cors";

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Ensure this is set in your .env file
    credentials: true,
  })
);

// Common Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Import Router
import helthcheckroutes from "./routes/helthcheck.routes.js"; // Include `.js` extension for ES modules

// Routes
app.use("/api/v1/helthcheck", helthcheckroutes); // Updated route prefix for better naming

// Export the Express app
export default app;
