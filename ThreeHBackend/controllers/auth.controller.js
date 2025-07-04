import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // ✅ Fix casing

// ✅ Import your secret key safely
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user in a transaction
    const newUser = await User.create(
      [{ name, email, password: hashPassword }],
      { session }
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser[0]._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        user: newUser[0],
        token
      },
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  // To be implemented
  try {
      const {email,password} =req.body;


      const user  = await User .findOne({email});

      if(!user){
        const error = new Error('User not fonund')
        error.statusCode = 404;
        throw error;
      }
const isPasswordValid = await bcrypt.compare(password, user.password);

if(!isPasswordValid){
  const error  =new Error('Invalid password');
  error.statusCode =401;
  throw error;
}

const token =  jwt.sign({userId:user.id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

res.status(200).json({
  success:true,
  message:''
})

  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  // To be implemented
};

