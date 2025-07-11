import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import arcjetMiddleware from "../middlewares/arcjet.middlewares.js"; // ✅ import it
import { createSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

// ✅ Create a new subscription (POST) – with Arcjet
subscriptionRouter.post('/', authorize, arcjetMiddleware, createSubscription);

// ✅ Get all subscriptions
subscriptionRouter.get('/', authorize, (req, res) => {
  res.send({ title: 'Get All Subscriptions' });
});

// ✅ Get subscription by ID
subscriptionRouter.get('/:id', authorize, (req, res) => {
  res.send({ title: 'GET Subscription Details' });
});

// ✅ Update a subscription
subscriptionRouter.put('/:id', authorize, (req, res) => {
  res.send({ title: 'UPDATE Subscription' });
});

// ✅ Delete a subscription
subscriptionRouter.delete('/:id', authorize, (req, res) => {
  res.send({ title: 'DELETE Subscription' });
});

// ✅ Cancel a subscription
subscriptionRouter.put('/:id/cancel', authorize, (req, res) => {
  res.send({ title: 'Cancel Subscription' });
});

// ✅ Get user's subscriptions
subscriptionRouter.get('/user/:id', authorize, (req, res) => {
  res.send({ title: 'Get User Subscriptions' });
});

// ✅ Get upcoming renewals
subscriptionRouter.get('/upcoming-renewals', authorize, (req, res) => {
  res.send({ title: 'Get Upcoming Renewals' });
});

export default subscriptionRouter;
