import dotenv from 'dotenv';
dotenv.config();

export const { PORT, NODE_ENV, DB_URI } = process.env;

console.log("PORT:", PORT);
console.log("DB_URI:", DB_URI); // ✅ should now show actual URI
