import mongoose, { Schema } from "mongoose";

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
 {timestamps: true}
);

export const User = mongoose.model("User", userSchema);
