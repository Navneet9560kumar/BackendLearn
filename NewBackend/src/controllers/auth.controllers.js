import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";


import { asyncHandler } from "../utils/async-hadler.js";
import { sendEmail, emailVerificationMailgenContent } from "../utils/mail.js";
import jwt from "jsonwebtoken";

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
  const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

user.emailVerificationToken = hashedToken;
user.emailVerificationExpiry = tokenExpiry;

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


const getCurrentUser = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id).select(
  //   "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  // );

  // if (!user) {
  //   throw new ApiError(404, "User not found");
  // }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user },
        "Current user retrieved successfully"
      )
    );
});



const verifyEmail  = asyncHandler(async (req, res) =>{
const {verificationToken} = req.params


if(!verificationToken){
  throw new ApiError(400, "Email Verification token is missing");
}

let hashedToken = crypto
.creteHash("sha256")
.update(verificationToken)
.digest("hex")

const user =await User.findOne({
  emailVerificationToken: hashedToken,
  emailVerificationExpiry: {$gt: Date.now()}
})

if(!user){
  throw new ApiError(400, "Token is invalid or has expired");
}

user.emailVerificationToken = undefined;
user.emailVerificationExpiry = undefined;

user.isEmailVerified = true;
await user.save({validateBeforeSave: false}); 

return res
  .status(200)
  .json(new ApiResponse(200,
     {
      isEmailVerified: true
     },
      "Email verified successfully"));

})

const resendEmailVerification = asyncHandler(async (req, res) => {
const user =   await User.findById(req.user?._id);

if(!user){
  throw new ApiError(404, "User does not exist");
}
if(user.isEmailVerified){
  throw new ApiError(400, "Email is already verified");
}



const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

user.emailVerificationToken = hashedToken;
user.emailVerificationExpiry = tokenExpiry;

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

return res
.status(200)
.json(
  new ApiResponse(
    200,
    { user },
    "Email verification link has been sent to your email"
  )
)
})

const forgotPassword = asyncHandler(async (req, res) => {
  const {email} = req.body;

  const user = await User.findOne({email})

  if(!user){
    throw new ApiError(404, "User does not exist", []);
  }


  const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });


 

  // send password reset email
  await sendEmail({
    email: user.email,
    subject: "Password Reset Request",
    mailgenContent: passwordResetMailgenContent(
      user.username,
      `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`
    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user },
        "Password reset link has been sent to your email"
      )
    );
})



const resetForgotPassword = asyncHandler(async (req, res) => {
  const {resetToken} = req.params;
  const {newPassword} = req.body;

  let hashedToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex")



  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() }
  })

  if(!user){
    throw new ApiError(400, "Invalid or expired reset token");
  }

  user.forgotPasswordExpiry = undefined;
  user.forgotPasswordToken = undefined;

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user },
        "Password has been reset successfully"
      )
    );
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken=req.cookies.refreshAccessToken || req.body.refreshAccessToken



  if(!incomingRefreshToken){
    throw new ApiError(400, "Unauthorized access");
  }

  try {
   const decodedToken =  jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)


  const user =  await User.findById(decodedToken?.id);
  if(!user){
    throw new ApiError(401, "Unauthorized access");
  }
   if(incomingRefreshToken !== user?.refreshToken){
        throw new ApiError(401, "Refresh token is expired");
   }


   const options ={
    httpOnly: true,
    secure: true
   }

   const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);


   user.refreshToken = newRefreshToken;
   await user.save();

   return res 
   .status(200)
   .cookie("accessToken", accessToken, options)
   .json(
    new ApiResponse(
      200,
      {accessToken, refreshToken: newRefreshToken},
      "Access token refreshed successfully"
    )
   )

  } catch (error) {
    throw new ApiError(401, "Unauthorized access");
  }
})


const changeCurrentPassword = asyncHandler(async (req, res) => {
  const {oldPassword, newPassword} = req.body;
  const user = await user.isPasswordCorrect(oldPassword);

  if(!isPasswordValid){
    throw new ApiError(401, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user },
        "Password has been changed successfully"
      )
    );
})

export { registerUser, login, logoutUser, getCurrentUser, verifyEmail, resendEmailVerification, refreshAccessToken, forgotPassword };
