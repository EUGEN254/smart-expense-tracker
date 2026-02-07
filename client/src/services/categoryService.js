import axios from "axios";

export const categoryService = {
  async createCategory(backendUrl, name) {
    try {
      const res = await axios.post(
        `${backendUrl}/api/categories/create`,
        { name },
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Failed to create category. Please try again.");
      }
    }
  },
  async getCategories(backendUrl) {
    try {
      const res = await axios.get(
        `${backendUrl}/api/categories/get-categories`,
        {
          withCredentials: true,
        },
      );
      return res.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Failed to fetch categories. Please try again.");
      }
    }
  },
  async deleteCategory(backendUrl, categoryId) {
    try {
      const res = await axios.delete(
        `${backendUrl}/api/categories/delete/${categoryId}`,
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Failed to delete category. Please try again.");
      }
    }
  },
};
