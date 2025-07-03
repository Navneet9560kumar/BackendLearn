import express from 'express';
import { PORT } from './config/env.js'; // <-- Fixed

import userRouter  from './routes/user.routes.js';
import authRouter from './routes/auth.rought.js';
import subscriptionRouter from './routes/subscriptions.routes.js';
import connectToDatabase from './DATABASE/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())


app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);


app.use(errorMiddleware);

app.listen(PORT, () => {

  console.log(`Server is running on http://localhost:${PORT}`);
connectToDatabase
});

export default app;
