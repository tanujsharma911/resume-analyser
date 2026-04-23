import express, { type Express } from "express";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

import { authRouter } from "./routers/auth.route.js";
import cookieParser from "cookie-parser";

app.use("/api/auth", authRouter);

export { app };
