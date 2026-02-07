import axios from "axios";

export const transactionService = {
  async addTransaction(backendUrl, transactionData, type) {
    try {
      const endpoint = type === "Expense" ? "add-expense" : "add-income";
      const res = await axios.post(
        `${backendUrl}/api/transactions/${endpoint}`,
        transactionData,
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
        throw new Error("Failed to add transaction. Please try again.");
      }
    }
  },
};
