import express from "express";
import { checkAuth, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { userAuth } from "../middleware/userAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/check", userAuth, checkAuth);

export default userRouter;
