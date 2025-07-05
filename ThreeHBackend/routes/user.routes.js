import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.get('/',authorize,getUsers)

userRouter.get('/:id',getUser);



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
