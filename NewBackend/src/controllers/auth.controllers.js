import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-hadler.js";
import { sendEmail, emailVerificationMailgenContent } from "../utils/mail.js";

// Generate Tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();   
    const refreshToken = user.generateRefreshToken(); 

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

// ✅ Register User
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  // check existing user
  const existingUser = await User.findOne({
    $or: [{ username }, { email }]
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
    isEmailVerified: false
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

export { registerUser };
