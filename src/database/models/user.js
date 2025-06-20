//creating an instance of users since there will be user and admin

import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    password: { type: String, reqired: true, unique: true },
    name: { type: String, reqired: true },
    email: { type: String, reqired: true, unique: true },
    //this is our duty to make sure that the user is verified via the email
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpriresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = model("user", userSchema);
export { User };
