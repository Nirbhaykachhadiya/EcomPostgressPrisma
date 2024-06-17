import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const prisma = new PrismaClient();

export const buyProduct = asyncHandler(async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const productId = req.body.id;
  const resp = await prisma.order.create({
    data: {
      userId,
      productId,
    },
  });
  res.status(200).send({ message: "addtocart in user successfully", resp });
});
