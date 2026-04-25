import type { Request, Response } from "express";
import { cookieOptions } from "../constants.js";
import { tokenManager } from "../tokenManager.js";
import type { UserRepository } from "../repositories/user.repository.js";

class AuthController {
  private userRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  public registerUser = async (req: Request, res: Response) => {
    try {
      let { email, password, displayName } = req.body;

      const user = await this.userRepository.findByEmail(email);

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      let newUser;

      try {
        newUser = await this.userRepository.create({
          displayName,
          email,
          password,
        });
      } catch (err: any) {
        if (err.code === 11000) {
          return res.status(400).json({ message: "User already exists" });
          throw err;
        }
      }

      if (typeof newUser === "undefined") {
        return res.status(500).json({ message: "Internal server error" });
      }

      const accessToken = newUser.generateAccessToken();

      res
        .cookie("accessToken", accessToken, cookieOptions)
        .status(201)
        .json({
          message: "You are now logged in",
          user: {
            email: newUser.email,
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
      let { email, password } = req.body;

      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = await user.isPasswordValid(password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const accessToken = user.generateAccessToken();

      return res
        .cookie("accessToken", accessToken, cookieOptions)
        .status(200)
        .json({
          message: "You are now logged in",
          user: { email: user.email, displayName: user.displayName },
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

      const user = await this.userRepository.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        user: { email: user.email, displayName: user.displayName },
      });
    } catch (error) {
      console.error("auth.controller.ts :: getMe :: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

export { AuthController };
