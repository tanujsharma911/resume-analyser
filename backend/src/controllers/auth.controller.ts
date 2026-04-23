import type { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { cookieOptions } from "../constants.js";
import mongoose from "mongoose";
import { isValidUsername } from "../utils/validators.js";
import tokenManager from "../tokenManager.js";

class AuthController {
  public registerUser = async (req: Request, res: Response) => {
    try {
      let { username, password, displayName } = req.body;

      if (!username || typeof username !== "string") {
        return res
          .status(400)
          .json({ message: "Please give a valid username" });
      }
      if (!password || typeof password !== "string") {
        return res
          .status(400)
          .json({ message: "Please give a valid password" });
      }
      if (!displayName || typeof displayName !== "string") {
        return res
          .status(400)
          .json({ message: "Please give a valid displayName" });
      }
      username = username.trim().toLowerCase();
      password = password.trim();
      displayName = displayName.trim();
      if (!isValidUsername(username)) {
        return res.status(400).json({
          message: "Username must be valid and between 3 and 20 characters",
        });
      }

      const user = await User.findOne({ username });

      if (user) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const newUser = new User({ username, password, displayName });

      try {
        await newUser.save();
      } catch (err: any) {
        if (err.code === 11000) {
          return res.status(400).json({ message: "Username already exists" });
          throw err;
        }
      }

      const accessToken = newUser.generateAccessToken();

      res
        .cookie("accessToken", accessToken, cookieOptions)
        .status(201)
        .json({
          message: "You are now logged in",
          user: {
            username: newUser.username,
            displayName: newUser.displayName,
          },
        });
    } catch (error) {
      console.log("auth.controller.ts :: registerUser :: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public loginUser = async (req: Request, res: Response) => {
    try {
      let { username, password } = req.body;

      if (!username || typeof username !== "string") {
        return res
          .status(400)
          .json({ message: "Please give a valid username" });
      }
      if (!password || typeof password !== "string") {
        return res
          .status(400)
          .json({ message: "Please give a valid password" });
      }
      username = username.trim().toLowerCase();
      password = password.trim();
      if (!isValidUsername(username)) {
        return res.status(400).json({
          message: "Username must be valid and between 3 and 20 characters",
        });
      }

      const user = await User.findOne({ username });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const isPasswordValid = await user.isPasswordValid(password);

      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const accessToken = user.generateAccessToken();

      return res
        .cookie("accessToken", accessToken, cookieOptions)
        .status(200)
        .json({
          message: "You are now logged in",
          user: { username: user.username, displayName: user.displayName },
        });
    } catch (error) {
      console.error("auth.controller.ts :: loginUser :: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public logoutUser = (req: Request, res: Response) => {
    const token = req.cookies.accessToken;

    if (token) {
      tokenManager.blacklist(token);
    }

    return res
      .clearCookie("accessToken", cookieOptions)
      .status(200)
      .json({ message: "You are now logged out" });
  };

  public getMe = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;

      if (mongoose.Types.ObjectId.isValid(userId) === false) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        user: { username: user.username, displayName: user.displayName },
      });
    } catch (error) {
      console.error("auth.controller.ts :: getMe :: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

export { AuthController };
