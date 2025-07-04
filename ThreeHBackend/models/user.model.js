import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      name: {
            type:String,
            require: [true, 'User Name is requried'],
            trim: true, // trime  is leye empty space ho to hata du inko
            minLength:2,
            maxLength: 50
      },
      email: {
            type: String,
            require: [true, 'Email is required'],
            unique: true, // email unique hona chahiye
            trim: true,
            lowercase: true, // email ko lower case me convert kar do
           match:[/\S+@\S+\.\S+/, 'Please enter a valid email address'] // email ki validation

      },
      password:{
            type: String,
            require: [true, 'Password is required'],
            minLength: 6,
         
      },

},{timestamps: true})

const User = mongoose.model('User', userSchema);

export default User;

// {name:'user',''émail,'navneet@9650'}