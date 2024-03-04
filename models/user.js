import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["true", "Enter Your Name"],
    },
    email: {
      type: String,
      required: ["true", "Enter Your Email"],
      validate: validator.default.isEmail,
    },
    password: {
      type: String,
      required: ["true", "Enter Your Password"],
    },
    token: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    cartItems: {
      type: Array,
      default: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cart",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("User", userSchema);
