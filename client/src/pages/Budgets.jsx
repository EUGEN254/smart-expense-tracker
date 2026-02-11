import React, { useEffect, useState } from "react";
import { useBudgets, useCategory } from "../hooks";

const Budgets = () => {
  const {
    budgets,
    handleAddBudget,
    isLoading,
    formData,
    setFormData,
    getBudget,
    openModal,
    setOpenModal,
  } = useBudgets();
  const { categoryList } = useCategory();

  useEffect(() => {
    getBudget();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Budget Management</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md"
        >
          New Budget
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget Overview Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Budget Overview
          </h1>
          <div className="space-y-4">
            {budgets.map((b, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium text-gray-800">
                        {b.category.name}
                      </div>
                      <div className="text-lg font-semibold text-emerald-600">
                        KES {b.amount}
                      </div>
                    </div>
                    <div className="mt-2">
                      {/* implement progress bar here later using rc-progress */}
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Tips Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-sm p-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Budget Tips
          </h1>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 bg-white p-3 rounded-lg shadow-sm">
              You're doing great with your Food budget - 15% under limit!
            </p>
            <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border-l-4 border-amber-500">
              Entertainment spending is close to the limit. Consider cutting
              back.
            </p>
            <p className="text-sm text-gray-600 bg-white p-3 rounded-lg shadow-sm">
              Set up automatic savings to reach your goals faster.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4 ">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <form onSubmit={handleAddBudget}>
              <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                  Create Budget
                </h1>
                <p className="text-sm text-gray-600">
                  Set a spending limit for a category to help manage your
                  expenses.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    {categoryList.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly limit
                  </label>
                  <input
                    type="number"
                    placeholder="Enter budget limit..."
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all"
                >
                  {isLoading ? " Creating budget ...." : " Create Budget"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
