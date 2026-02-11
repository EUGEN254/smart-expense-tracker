import Budget from "../models/budget.js";

export const addBudget = async (req, res) => {
  try {
    const { formData } = req.body;
    const { category, amount } = formData;
    const user = req.user;

    //check if budget exist
    const existingBudget = await Budget.findOne({ category, user: user._id });
    if (existingBudget) {
      return res.status(400).json({
        success: false,
        message: "Budget already exists for this category",
      });
    }

    const budget = await Budget.create({
      category,
      amount,
      userId: user._id,
    });
    await budget.populate("category", "name");

    res.status(201).json({
      success: true,
      message: "Budget created successfully",
      budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create budget",
    });
  }
};

export const getBudget = async (req, res) => {
  try {
    const userId = req.user._id;

    const budgets = await Budget.find({ userId: userId })
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      budgets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch budgets",
    });
  }
};
