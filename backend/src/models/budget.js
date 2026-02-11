import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Budget amount is required"],
      min: [0, "Amount must be positive"],
    },
  },
  { timestamps: true },
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
