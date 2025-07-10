import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js"; // Adjust the path as needed
import { createSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();


subscriptionRouter.get('/', (req, res) => {
  // Handle subscription
  res.send({ title: 'Subscribe',});
});

subscriptionRouter.get('/:id', (req, res) => {
  // Handle subscription
  res.send({ title: ' GET Subscribe details',});
});

subscriptionRouter.get('/',authorize, createSubscription );
subscriptionRouter.post('/:id', (req, res) => {
  // Handle subscription
  res.send({ title: 'UPDATE Subscription',});
});
subscriptionRouter.put('/:ID', (req, res) => {
  // Handle subscription
  res.send({ title: 'UPDATE Subscription',});
});
subscriptionRouter.delete('/subscribe', (req, res) => {
  // Handle subscription
  res.send({ title: 'DELETE Subscription',});
});
subscriptionRouter.get('/user/:id', (req, res) => {
  // Handle subscription
  res.send({ title: 'Get User Subscription',});
});
subscriptionRouter.put('/:id/cancel', (req, res) => {
  // Handle subscription
  res.send({ title: 'Subscribe',});
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  // Handle subscription
  res.send({ title: 'Get Upcoming Renewals',});
});

export default subscriptionRouter;