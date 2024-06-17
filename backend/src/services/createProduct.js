import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const prisma = new PrismaClient();

export const createProduct = asyncHandler(async (req, res) => {
  const { title, desc, price } = req.body;

  console.log(req.body);
  if (!title || !desc || !price) {
    throw new ApiError(
      400,
      "error acccur while fetch title desc and price from req.body"
    );
  }
  const localFilePath = req.file.path;
  const userId = req.userId;
  if (!localFilePath) {
    throw new ApiError(400, "error accur while fetch localFilePath");
  }
  const cloudinaryString = await uploadOnCloudinary(localFilePath);
  if (!cloudinaryString) {
    throw new ApiError(400, "error accur while upload on cloudinary");
  }

  const createdProduct = await prisma.product.create({
    data: {
      title,
      desc,
      price,
      photo: cloudinaryString,
      sellerId: userId,
    },
  });
  if (!createdProduct) {
    throw new ApiError(400, "error accur while createdProduct in db");
  }
  res
    .status(200)
    .send({ message: "Product successfully in db", createProduct });
});
