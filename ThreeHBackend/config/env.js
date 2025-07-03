import dotenv from 'dotenv';
dotenv.config();

export const { PORT, NODE_ENV, DB_URI } = process.env;

console.log("PORT:", PORT);
console.log("DB_URI:",
       DB_URI,
      // eslint-disable-next-line no-undef
      JWT_SECRET,
      // eslint-disable-next-line no-undef
      JWT_EXPIRES_IN
      ); // ✅ should now show actual URI
