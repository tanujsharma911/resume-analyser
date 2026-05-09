import express, { type Express } from "express";
import cookieParser from "cookie-parser";
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
import { resumeReportRouter } from "./routers/resume.route.js";

app.use("/api/auth", authRouter);
app.use("/api/resume", resumeReportRouter);

export { app };
