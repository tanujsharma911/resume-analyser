import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
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

export const User = mongoose.model("User", userSchema);
