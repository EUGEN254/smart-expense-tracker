import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "../context/UserContext";
import { categoryService } from "../services";

export const useCategory = () => {
  const [openCategoryForm, setOpenCategoryForm] = useState(false);
  const [categories, setCategories] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const { backendUrl } = useUser();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsCreating(true);
      try {
        const res = await categoryService.createCategory(
          backendUrl,
          categories,
        );
        if (res.success) {
          toast.success(res.message);
          setCategoryList([...categoryList, res.category]);
          setOpenCategoryForm(false);
          setCategories("");
        } else {
          toast.error(
            res.message || "Failed to create category. Please try again.",
          );
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsCreating(false);
      }
    },
    [backendUrl, categories],
  );

  const handleDelete = useCallback(
    async (categoryId) => {
      setDeletingId(categoryId);
      try {
        const res = await categoryService.deleteCategory(
          backendUrl,
          categoryId,
        );
        console.log("Delete response:", res);
        if (res.success) {
          toast.success(res.message);
          setCategoryList(categoryList.filter((cat) => cat._id !== categoryId));
        } else {
          toast.error(
            res.message || "Failed to delete category. Please try again.",
          );
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setDeletingId(null);
      }
    },
    [backendUrl, categoryList],
  );

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await categoryService.getCategories(backendUrl);
      if (res.success) {
        setCategoryList(res.categories);
      } else {
        toast.error(
          res.message || "Failed to fetch categories. Please try again.",
        );
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [backendUrl]);

  return {
    openCategoryForm,
    setOpenCategoryForm,
    categories,
    setCategories,
    categoryList,
    handleSubmit,
    handleDelete,
    isCreating,
    deletingId,
    isLoading,
    fetchCategories,
  };
};
