import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { email, password, displayName } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "Please give a valid email" });
  }
  if (!password || typeof password !== "string") {
    return res.status(400).json({ message: "Please give a valid password" });
  }
  if (!displayName || typeof displayName !== "string") {
    return res.status(400).json({ message: "Please give a valid displayName" });
  }
  email = email.trim().toLowerCase();
  password = password.trim();
  displayName = displayName.trim();

  next();
};
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { email, password } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "Please give a valid email" });
  }
  if (!password || typeof password !== "string") {
    return res.status(400).json({ message: "Please give a valid password" });
  }
  email = email.trim().toLowerCase();
  password = password.trim();

  next();
};
