import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller.js";

const route: Router = Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.post("/logout", logoutUser);
route.post("/getme", getMe);

export default route;
