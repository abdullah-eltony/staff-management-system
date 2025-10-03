import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

// login
authRouter.post("/login", AuthController.login);

// refresh-token
authRouter.post('/refresh-token',AuthController.refreshToken)

// logout
authRouter.post('/logout',authMiddleware,AuthController.logout)

export default authRouter;
