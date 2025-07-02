import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {
  // Handle sign-up
  res.send({title: 'Sign up', message: 'User signed up successfully'});
});

authRouter.post('/sign-in', (req, res) => {
  // Handle sign-in
  res.send({title: 'Sign in', message: 'User signed in successfully'});
});

authRouter.post('/sign-out', (req, res) => {
  // Handle sign-out
  res.send({title: 'Sign out', message: 'User signed out successfully'});
});
export default authRouter;
