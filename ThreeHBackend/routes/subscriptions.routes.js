import { Router } from "express";

const subscriptionRouter = Router();


subscriptionRouter.get('/', (req, res) => {
  // Handle subscription
  res.send({ title: 'Subscribe',});
});

subscriptionRouter.get('/:id', (req, res) => {
  // Handle subscription
  res.send({ title: ' GET Subscribe details',});
});

subscriptionRouter.get('/subscribe', (req, res) => {
  // Handle subscription
  res.send({ title: 'Create Subscribe',});
});
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