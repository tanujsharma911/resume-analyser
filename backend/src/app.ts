import express, { type Express } from "express";

const app: Express = express();

import authRoute from "./routers/auth.route.js";

app.use("/api/auth", authRoute);

export { app };
