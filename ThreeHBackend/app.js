import express from 'express';
import { PORT } from './config/env.js';
import connectToDatabase from './DATABASE/mongodb.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscriptions.routes.js';

import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Health check
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// Error middleware
app.use(errorMiddleware);

// Connect to DB and then start the server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to database:', err.message);
    process.exit(1); // Exit the app if DB connection fails
  });

export default app;
