import mongoose from "mongoose";
import User from "../models/user.model.js";
import { generateToken } from "../utils/token.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // ✅ Fix casing

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      [{ name, email, password: hashPassword }],
      { session }
    );

    // OLD CODE - commented but not removed 👇
    // const token = jwt.sign(
    //   { userId: newUser[0]._id },
    //   JWT_SECRET,
    //   { expiresIn: JWT_EXPIRES_IN }
    // );

    // ✅ NEW CODE using generateToken()
    const token = generateToken(newUser[0]);

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
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error('User not fonund')
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }

    // OLD CODE - commented but not removed 👇
    // const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // ✅ NEW CODE using generateToken()
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: 'User in successfuly',
      data: {
        token,
        user,
      }
    });

  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  // To be implemented
};
