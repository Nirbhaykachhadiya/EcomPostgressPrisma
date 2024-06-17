import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const userMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      throw new ApiError(400, "token from cookies fetch failed");
    }
    const isToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(isToken);
    req.userId = isToken.id;
    next();
  } catch (error) {
    throw new ApiError(400, "error in userMiddleware");
  }
});
