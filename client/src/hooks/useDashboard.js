import { useEffect, useState } from "react";
import { toast } from "sonner";
import { transactionService } from "../services";
import { useUser } from "../context/UserContext";

export const useDashboard = () => {
  const [addTransaction, setAddTransaction] = useState(false);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const [dashboardIncome, setDashboardIncome] = useState(null);
  const [currentState, setCurrentState] = useState("Expense");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [spendingByCategory, setSpendingByCategory] = useState({});
  const { backendUrl } = useUser();
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (currentState === "Expense" && !formData.category) {
      toast.error("Please select a category");
      return;
    }
    setIsTransactionLoading(true);

    try {
      const res = await transactionService.addTransaction(
        backendUrl,
        formData,
        currentState,
      );
      console.log("dashboard response", res.transaction);

      if (res.success) {
        toast.success(`${currentState} ${res.message}`);

        const transaction = res.transaction;
        const amount = parseFloat(transaction.amount);

        if (transaction.type === "Income") {
          setTotalIncome((prev) => prev + amount);
          setTotalBalance((prev) => prev + amount);
        } else if (transaction.type === "Expense") {
          setTotalExpense((prev) => prev + amount);
          setTotalBalance((prev) => prev - amount);

          // Update spending by category for budgets
          setSpendingByCategory((prev) => ({
            ...prev,
            [transaction.category]: (prev[transaction.category] || 0) + amount,
          }));
        }

        // Reset form
        setFormData({
          description: "",
          amount: "",
          category: "",
        });
        setIsTransactionLoading(false);
      } else {
        toast.error(
          res.message || "Failed to add transaction. Please try again.",
        );
        return;
      }
    } catch (error) {
      toast.error(error.message || "Failed to add transaction");
    } finally {
      setAddTransaction(false);
    }
  };

  // Add these functions to your useDashboard hook
  const fetchDashboardTotals = async () => {
    try {
      const res = await transactionService.getDashboardTotals(backendUrl);

      if (res.success) {
        setTotalIncome(res.data.income);
        setTotalExpense(res.data.expense);
        setTotalBalance(res.data.balance);
        setSpendingByCategory(res.data.spendingByCategory || {});
      }
    } catch (error) {
      toast.error(error.message || "Failed to get dashboard details");
    }
  };

  useEffect(() => {
    fetchDashboardTotals();
  }, []);

  return {
    addTransaction,
    setAddTransaction,
    currentState,
    setCurrentState,
    formData,
    setFormData,
    handleAddTransaction,
    isTransactionLoading,
    dashboardIncome,
    totalIncome,
    setTotalIncome,
    totalExpense,
    setTotalExpense,
    totalBalance,
    setTotalBalance,
    spendingByCategory,
    setSpendingByCategory,
    fetchDashboardTotals,
  };
};
