import { useState } from "react";
import { toast } from "sonner";
import { transactionService } from "../services";
import { useUser } from "../context/UserContext";

export const useDashboard = () => {
  const [addTransaction, setAddTransaction] = useState(false);
  const[isTransactionLoading,setIsTransactionLoading] = useState(false)
  const [currentState, setCurrentState] = useState("Expense");
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
    setIsTransactionLoading(true)
    

    try {
      const res = await transactionService.addTransaction(
        backendUrl,
        formData,
        currentState,
      );
      console.log("dashboard response", res.transaction);

      if (res.success) {
        toast.success(`${currentState} ${res.message}`);
        // Reset form
        setFormData({
          description: "",
          amount: "",
          category: "",
        });
        setIsTransactionLoading(false)
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

  return {
    addTransaction,
    setAddTransaction,
    currentState,
    setCurrentState,
    formData,
    setFormData,
    handleAddTransaction,
    isTransactionLoading,
  };
};
