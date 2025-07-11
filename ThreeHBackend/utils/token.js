import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      user: {
        id: user._id,
      },
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
};
