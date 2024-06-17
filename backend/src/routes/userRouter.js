import { Router } from "express";
import { LogOut, Login, Register } from "../services/RegisterLogin.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { upload } from "../middleware/multerMiddleware.js";
import { createProduct } from "../services/createProduct.js";
import { productOnMarketplace } from "../services/productOnMarketplace.js";
import { buyProduct } from "../services/buyProduct.js";
import { listedProduct } from "../services/listedProduct.js";
import { orderReceived } from "../services/orderReceived.js";

const userRouter = Router();

userRouter.route("/register").post(Register);
userRouter.route("/login").post(Login);
userRouter.route("/logout").post(userMiddleware, LogOut);
userRouter
  .route("/createproduct")
  .post(upload.single("Image"), userMiddleware, createProduct);
userRouter.route("/productOnMarketplace").get(productOnMarketplace);
userRouter.route("/buyProduct").post(userMiddleware, buyProduct);
userRouter.route("/listedProduct").post(userMiddleware, listedProduct);
userRouter.route("/orderReceived").post(userMiddleware, orderReceived);

export default userRouter;
