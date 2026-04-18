import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import tokenManager from "../tokenManager.js";

dotenv.config();

export const verifyAuth = (req: any, res: any, next: any) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (tokenManager.isBlacklisted(token)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
