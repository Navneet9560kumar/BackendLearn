import { User } from "../models/user.models.js";

import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-hadler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async(req,res,next) =>{
      const Token =req.cookies?.accessToken || req.hader("Authorization")?.replace("Bearer" , "")

      if(!Token){
            throw new ApiError(401, "unauthorized request")
      }

      try {
           const decoded =  jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET)
           const user = await User.findById(decodedToken?._id).select(
              "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
           );

               if(!Token){
            throw new ApiError(401, "Invalid access token")
      }
      req.user= user
      next()

      } catch (error) {
                if(!Token){
            throw new ApiError(401, "Invalied access token")
      }

      }
})