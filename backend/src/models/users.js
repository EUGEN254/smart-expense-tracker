import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, trim: true, required: true },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    termsAccepted: { type: Boolean, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
