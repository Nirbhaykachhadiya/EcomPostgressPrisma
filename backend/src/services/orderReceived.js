import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const prisma = new PrismaClient();

export const orderReceived = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const products = await prisma.order.findMany({
    where: {
      seller: {
        sellerId: userId,
      },
    },
    include: {
      buyer: true,
      seller: true,
    },
  });
  res.status(200).send({ message: "orderReceive fetch successful", products });
});
