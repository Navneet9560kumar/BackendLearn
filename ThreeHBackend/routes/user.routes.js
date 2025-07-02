import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {
  // Handle get all users
  res.send({title: 'Get all users', message: 'List of all users'});
});
userRouter.get('/users', (req, res) => {
  // Handle get all users
  res.send({title: 'Get all users', message: 'List of all users'});
});

userRouter.get('/:id', (req, res) => {
  // Handle update user profile
  res.send({title: 'Get all users', message: 'User profile updated successfully'});
});


userRouter.post('/', (req, res) => {
  // Handle update user profile
  res.send({title: 'Get all users', message: 'CREATE new user'});
});



userRouter.put('/:id', (req, res) => {
  // Handle update user profile
  res.send({title: 'Get all users', message: 'Update user profile successfully'});
});





userRouter.delete('/profile', (req, res) => {
  // Handle delete user profile
  res.send({title: 'Get all users', message: 'User profile deleted successfully'});
});

export default userRouter;
