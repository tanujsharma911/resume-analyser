import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";

const route: Router = Router();

route.post("/register", registerUser);

export default route;
