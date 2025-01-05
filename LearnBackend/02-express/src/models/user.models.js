import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trime: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trime: true,
    },
    fullname: {
      type: String,
      required: true,
      trime: true,
      index: true,
    },
    avatar: {
      type: String, //cloudnaray url
      required: true,
    },
    CoverImage: {
      type: String, //cloudnaray url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshTokan: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.modified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);

  nexy();
});


userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateRefreshToken = function() {
  // sort lived token
   return jwt.sign({
  id: this._id,
  email: this.email,
  username: this.username,
  fullname: this.fullname,

  },
  process.env.REFRESH_TOKEN_SECRET,
{expiresIn: process.env.ACCESS_TOKEN_EXPIRE}
  );
}

export const User = mongoose.model("User", userSchema);
