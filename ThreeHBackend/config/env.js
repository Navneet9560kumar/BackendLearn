import dotenv from 'dotenv';
dotenv.config();

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN
} = process.env;

// Optional: Debug log
console.log("PORT:", PORT);
console.log("DB_URI:", DB_URI);
console.log("JWT_SECRET:", JWT_SECRET);
console.log("JWT_EXPIRES_IN:", JWT_EXPIRES_IN);
