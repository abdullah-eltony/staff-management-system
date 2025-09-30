import express from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = express.Router();

// POST /api/auth/login
authRouter.post("/", AuthController.login);

export default authRouter;
