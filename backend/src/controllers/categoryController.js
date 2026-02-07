import Category from "../models/category.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const user = req.user;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Category name is required" });
  }

  try {
    const newCategory = new Category({ name, userId: user._id });
    await newCategory.save();
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create category. Please try again.",
    });
  }
};

export const getCategories = async (req, res) => {
  const user = req.user;

  try {
    const categories = await Category.find({ userId: user._id });
    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories. Please try again.",
    });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const category = await Category.findOneAndDelete({
      _id: id,
      userId: user._id,
    });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete category. Please try again.",
    });
  }
};
