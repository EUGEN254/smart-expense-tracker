// routes/transactionRoutes.js
import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import {
  addExpense,
  addIncome,
} from "../controllers/transactionController.js";

const transactionRouter = express.Router();

// Add transactions
transactionRouter.post("/add-expense", userAuth, addExpense);
transactionRouter.post("/add-income", userAuth, addIncome);

export default transactionRouter;