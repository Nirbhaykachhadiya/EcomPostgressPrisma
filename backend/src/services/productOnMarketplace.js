import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const prisma = new PrismaClient();

export const productOnMarketplace = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany({ include: { seller: true } });
  res
    .status(200)
    .send({ message: "all Product fetch from db successfully", products });
});
