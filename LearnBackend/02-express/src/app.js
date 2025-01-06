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

import userRouter from "./routes/user.routes.js"; // Include `.js` extension for ES modules
import { errroHandler } from "./middlewares/error.middlewares.js";

// Routes
app.use("/api/v1/helthcheck", helthcheckroutes); 

app.use	("/api/v1/user", userRouter);

// Export the Express app

app.use(errroHandler)
export default app;
