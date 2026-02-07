import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controllers/categoryController.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/create", userAuth, createCategory);
categoriesRouter.get("/get-categories", userAuth, getCategories);
categoriesRouter.delete("/delete/:id", userAuth, deleteCategory);

export default categoriesRouter;
