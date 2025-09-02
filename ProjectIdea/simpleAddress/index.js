import express from 'express';
import mongoose from 'mongoose';
import  dotenv from 'dotenv';
import contactRoutes from "./Routes/contactRoutes.js"

dotenv.config();


const app = express();
app.use(express.json());

// dB Connection

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("DB Connected"))
.catch((err) => console.log(err));

// Routes test 

app.get("/",(req, res)=>{
      res.send("Address Bookend is Running");
});

app.listen(5000,() => console.log("Server is running on port 5000"));