import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const prisma = new PrismaClient();

export const listedProduct = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const products = await prisma.product.findMany({
    where: {
      sellerId: userId,
    },
    include: {
      seller: true,
    },
  });
  res.status(200).send({ message: "listedProduct fetch successful", products });
});
