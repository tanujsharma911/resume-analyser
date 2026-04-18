import express, { type Express } from "express";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

import authRoute from "./routers/auth.route.js";
import cookieParser from "cookie-parser";

app.use("/api/auth", authRoute);

export { app };
