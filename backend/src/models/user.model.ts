import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface UserType {
  displayName: string;
  username: string;
  password: string;
}

export interface UserMethodsType {
  isPasswordValid(password: string): Promise<boolean>;
  generateAccessToken(): string;
}

type UserModel = Model<UserType, {}, UserMethodsType>;

const userSchema = new mongoose.Schema<UserType, UserModel, UserMethodsType>(
  {
    displayName: {
      type: String,
      required: true,
      min: [2, "Minimum length of displayName is 2"],
      max: [100, "Maximum length of displayName is 100"],
    },
    username: {
      type: String,
      unique: [true, "Username already taken"],
      required: true,
      lowercase: true,
      trim: true,
      min: [3, "Minimum length of username is 3"],
      max: [24, "Maximum length of username is 24"],
    },
    password: {
      type: String,
      required: true,
      min: [6, "Minimum length of password is 6"],
      max: [24, "Maximum length of password is 24"],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { userId: this._id.toString() },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY! as any,
    },
  );
};

export const User = mongoose.model<UserType, UserModel>("User", userSchema);
