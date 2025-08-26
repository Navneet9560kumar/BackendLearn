import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";


import { asyncHandler } from "../utils/async-hadler.js";
import { sendEmail, emailVerificationMailgenContent } from "../utils/mail.js";

// Generate Tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log("🟡 Fetched user:", user);  // <-- Debug line

    if (!user) {
      throw new ApiError(404, "User not found with this ID");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("❌ Token generation error:", error);
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

// ✅ Register User
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  // check existing user
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // create user
  const user = await User.create({
    email,
    password,
    username,
    role,
    isEmailVerified: false,
  });

  // generate temporary token
  const { unHashedToken } = user.generateTemporaryToken();
  await user.save({ validateBeforeSave: false });

  // send verification email
  await sendEmail({
    email: user.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
    ),
  });

  // ✅ remove sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      { user: createdUser },
      "User registered successfully. Verification email has been sent."
    )
  );
});

// ✅ Login User
const login = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  // check username/email
  if (!email && !username) {
    throw new ApiError(400, "Username or email is required");
  }

  // find user by email or username
  const user = await User.findOne(email ? { email } : { username });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  // validate password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid credentials");
  }

  // generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  // remove sensitive fields
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options) // ✅ fix: pehle accessToken dobara likha tha
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});



const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: ""
      }
    },
    {
      new: true,
    },
  );
  const options = {
    httpOnly: true,
    secure: true
  }
  return res 
  .status(200)
  .clearCookie("accessToken", options)
   .clearCookie("refrenshToken", options)
   .json(new ApiResponse(200, {}, "User logged out"))
})

export { registerUser, login, logoutUser };
