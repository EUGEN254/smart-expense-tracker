import Category from "../models/category.js";
import Transaction from "../models/transaction.js";

export const addExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const user = req.user;

    //  validation
    if (!description || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const categoryExists = await Category.findOne({
      _id: category,
      userId: user._id,
    });

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const expense = new Transaction({
      description: description.trim(),
      amount: parseFloat(amount),
      type: "Expense",
      category: category,
      user: user._id,
    });

    await expense.save();

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      transaction: expense,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addIncome = async (req, res) => {
  const { description, amount } = req.body;
  const user = req.user;

  // Validation
  if (!description || !description.trim()) {
    return res.status(400).json({
      success: false,
      message: "Description is required",
    });
  }

  if (!amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Valid amount is required",
    });
  }

  try {
    // Create income transaction
    const income = new Transaction({
      description: description.trim(),
      amount: parseFloat(amount),
      type: "Income",
      user: user._id,
    });

    await income.save();

    res.status(201).json({
      success: true,
      message: "Income added successfully",
      transaction: income,
    });
  } catch (error) {
    console.error("Error adding income:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add income. Please try again.",
    });
  }
};
