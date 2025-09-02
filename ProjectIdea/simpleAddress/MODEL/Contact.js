import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
      name:{
            type:String,
            required:true,
            trim:true
      },
      phone:{
            type:String,
            required:true,
            unique:true,
            trim:true
      },
      email:{
            type:String,
            required:true,
            unique:true,
            trim:true
      },
} , {timestamps:true});


contactSchema.index({phone:1, email:1}, {unique:true});
contactSchema.index({email:1}, {unique:true, sparse:true});

export default mongoose.model("Contact", contactSchema);
