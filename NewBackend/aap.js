import express from "express"
import cors from 'cors';


const app = express();

// vase config
app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended:true, limit:"16kb"}))// ye sare aase vsase letter ko aapne aap mai rakti hai or ye dekhta hia 
app.use(express.static("public"))

//core config
app.use(cors({
      origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
      Credential:true,
      method: ["GET0","POST", "PUT","PATCH","DELETE","OPTIONS"],
      allowedHeaders:["Content-Type","Authorization"],

}))

app.get("/",(req,res)=>{
      res.send("wellcome to my word")
})

export default app;