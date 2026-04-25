import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";
import { UserRepository } from "../repositories/user.repository.js";
import {
  validateRegister,
  validateLogin,
} from "../middleware/user.middleware.js";

const authRouter: Router = Router();

const userRepository = new UserRepository();
const authController = new AuthController(userRepository);

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", validateRegister, authController.registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login an existing user
 * @access Public
 */
authRouter.post("/login", validateLogin, authController.loginUser);

/**
 * @route POST /api/auth/logout
 * @desc Logout the current user
 * @access Private
 */
authRouter.post("/logout", verifyAuth, authController.logoutUser);

/**
 * @route GET /api/auth/getme
 * @desc Get the current user's information
 * @access Private
 */
authRouter.get("/get-me", verifyAuth, authController.getMe);

export { authRouter };
