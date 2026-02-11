import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import { addBudget, getBudget } from "../controllers/budgetController.js";

const budgetRouter = express.Router();

budgetRouter.post("/add-budget", userAuth, addBudget);
budgetRouter.get("/get-budget", userAuth, getBudget);

export default budgetRouter;
