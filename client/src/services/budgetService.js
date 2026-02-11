import axios from "axios";

export const budgetService = {
  async addBudget(backendUrl, formData) {
    try {
      const res = await axios.post(
        `${backendUrl}/api/budget/add-budget`,
        { formData },
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
  async getBudget(backendUrl) {
    try {
      const res = await axios.get(`${backendUrl}/api/budget/get-budget`, {
        withCredentials: true,
      });
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
};
