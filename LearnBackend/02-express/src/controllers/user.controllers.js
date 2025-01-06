import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import {uploadOnCloudinary,deletedOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  // Validate request
  if ([fullname, username, email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existUser) {
    throw new ApiError(400, "User with this email or username already exists");
  }

  // Handle avatar and cover image uploads
  console.warn(req.files);
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

//   const avatar = await uploadOnCloudinary (avatarLocalPath);
//   let coverImage = "";
//   if (coverLocalPath) {
//     coverImage = await uploadOnCloudinary (coverLocalPath);
//   }

let avatar;
try {
      avatar = await uploadOnCloudinary(avatarLocalPath)
     console.log("Uplode avatar", avatar)
} catch (error) {
      console.log("Error uploading avatar to avatar:", error);
      throw new ApiError(500, "Failed to upload avatar");
}


let coverImage;
try {
      coverImage = await uploadOnCloudinary(coverLocalPath)
     console.log("Uplode coverImage", coverImage)
} catch (error) {
      console.log("Error uploading coverImage", error);
      throw new ApiError(500, "Failed to upload coverImage");
}

  // Create user
try {
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createUser, "User registered successfully"));
} catch (error) {
  console.log("User creation failed:", error);
  throw new ApiError(500, "Failed to register user");
}



});




 export {
  registerUser,
}
