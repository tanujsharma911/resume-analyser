import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

const authRouter: Router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login an existing user
 * @access Public
 */
authRouter.post("/login", loginUser);

/**
 * @route POST /api/auth/logout
 * @desc Logout the current user
 * @access Private
 */
authRouter.post("/logout", verifyAuth, logoutUser);

/**
 * @route GET /api/auth/getme
 * @desc Get the current user's information
 * @access Private
 */
authRouter.get("/get-me", verifyAuth, getMe);

export default authRouter;
