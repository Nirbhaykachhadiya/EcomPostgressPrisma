import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const port = 3001;

app.listen(port, () => {
  console.log(`Your App is Running on port ${port}`);
});

import userRouter from "./routes/userRouter.js";

app.use("/api/v1/users", userRouter);
