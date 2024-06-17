import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const Register = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new ApiError(
      400,
      "Error accur while fetching userName and password from req.body in registration"
    );
  }
  const hashPasword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      userName,
      password: hashPasword,
    },
  });

  if (!user) {
    throw new ApiError(400, "error accur while user creation in db");
  }

  res.status(200).send({ message: "user registration successful", user });
});

export const Login = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new ApiError(
      400,
      "Error accur while fetching userName and password from req.body in login"
    );
  }
  const user = await prisma.user.findFirst({
    where: {
      userName: userName,
    },
  });

  if (!user) {
    throw new ApiError(400, "user not exist");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new ApiError(400, "password is incorrect");
  }

  const token = jwt.sign(
    { id: user.id, userName: user.userName },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  res.cookie("token", token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is sent over HTTPS only in production
    sameSite: "strict", // Prevents CSRF attacks
  });

  res.status(200).send({ message: "login Successful", user });
});

export const LogOut = asyncHandler(async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    throw new ApiError(
      400,
      "error accur logout userId fetching from middleware req"
    );
  }
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).send({ message: "LogOut Successful" });
});
