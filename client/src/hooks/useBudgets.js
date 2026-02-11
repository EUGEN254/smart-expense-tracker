import { useCallback, useState } from "react";
import { useUser } from "../context/UserContext";
import { budgetService } from "../services";
import { toast } from "sonner";

export const useBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { backendUrl } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
  });

  const handleAddBudget = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formData.category) {
        toast.error("Please select a category");
        return;
      }

      if (!formData.amount || formData.amount <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }

      setIsLoading(true);
      try {
        const res = await budgetService.addBudget(backendUrl, formData);
        if (res.success) {
          toast.success(res.message);
          setOpenModal(false);
          setBudgets((prev) => [...prev, res.budget]);
          setFormData({ amount: "", category: "" });
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [backendUrl, formData],
  );

  const getBudget = useCallback(async () => {
    try {
      const res = await budgetService.getBudget(backendUrl);
      console.log(res);
      if (res.success) {
        setBudgets(res.budgets);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  return {
    budgets,
    openModal,
    handleAddBudget,
    isLoading,
    formData,
    setFormData,
    setOpenModal,
    getBudget,
  };
};
