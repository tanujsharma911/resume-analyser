import mongoose from "mongoose";
import { DB_NAME, GREEN_ASCII, RED_ASCII } from "../constants.js";
import dotenv from "dotenv";

dotenv.config();

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONOGODB_URL + "/" + DB_NAME);
    console.log(GREEN_ASCII, "\n💾 Connected to MongoDB :: Database");
  } catch (err) {
    console.log(RED_ASCII, "Error connecting to MongoDB:", err);
  }
};
