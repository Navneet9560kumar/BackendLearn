import express from 'express';

import {PORT} from "./env.js"
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';


const app = express();

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRoutes);

app.get('/', (req, res) => {
    res.send('Kay hall hu');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
   