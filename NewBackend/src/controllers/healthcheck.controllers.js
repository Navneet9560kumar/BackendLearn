import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-hadler.js";

const healthCheck = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, { message: "server is running" }));
});

export { healthCheck };


// const healthCheck = async(req, res, next)=>{
//       try {
//             const user = await getUserFromDB()
//             res
//             .status(200).json(
//                   new ApiResponse(200, {message: "Server is runing"})
//             )
//       } catch (error) {
//             next(err)
//       }
// 