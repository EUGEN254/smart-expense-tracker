import React, { useEffect, useState } from "react";
import { useBudgets, useCategory, useDashboard } from "../hooks";
import { Line } from "rc-progress";
import { FiTrendingDown, FiPlus } from "react-icons/fi";

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
  const { spendingByCategory } = useDashboard();

  // Calculate spent amount for a budget
  const getSpentAmount = (categoryId) => {
    return spendingByCategory?.[categoryId] || 0;
  };

  // Calculate progress percentage
  const getProgressPercentage = (spent, budgetAmount) => {
    if (!budgetAmount) return 0;
    const percentage = (spent / budgetAmount) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };

  // Get color based on percentage
  const getProgressColor = (percentage) => {
    if (percentage >= 90) return "#ef4444"; // red-500
    if (percentage >= 75) return "#f59e0b"; // amber-500
    return "#10b981"; // emerald-500
  };

  // Get status message
  const getStatusMessage = (spent, budgetAmount, percentage) => {
    const remaining = budgetAmount - spent;

    if (percentage >= 100) {
      return {
        text: `Overspent by KES ${Math.abs(remaining).toLocaleString()}`,
        className: "text-red-600 font-medium",
      };
    }
    if (percentage >= 90) {
      return {
        text: `Almost there! KES ${remaining.toLocaleString()} left`,
        className: "text-amber-600",
      };
    }
    return {
      text: `KES ${remaining.toLocaleString()} remaining`,
      className: "text-emerald-600",
    };
  };

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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800">
              Budget Overview
            </h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              This Month
            </span>
          </div>

          <div className="space-y-5">
            {budgets.map((budget) => {
              const spent = getSpentAmount(budget.category._id);
              const percentage = getProgressPercentage(spent, budget.amount);
              const progressColor = getProgressColor(percentage);
              const status = getStatusMessage(spent, budget.amount, percentage);

              return (
                <div
                  key={budget._id}
                  className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      {/* Category Icon/Initial */}
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-lg font-semibold text-emerald-600">
                          {budget.category.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {budget.category.name}
                        </h3>
                        <p className="text-xs text-gray-500">Monthly budget</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">
                        KES {budget.amount.toLocaleString()}
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Spent: KES {spent.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    {/* Progress Bar with rc-progress */}
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">
                        {Math.round(percentage)}%
                      </span>
                    </div>

                    <Line
                      percent={percentage}
                      strokeWidth={4}
                      strokeColor={progressColor}
                      trailWidth={4}
                      trailColor="#e5e7eb"
                      strokeLinecap="round"
                      className="w-full"
                    />

                    {/* Status Message */}
                    <div className="flex justify-between items-center mt-3">
                      <span className={`text-xs ${status.className}`}>
                        {status.text}
                      </span>

                      {/* Warning Indicator */}
                      {percentage >= 90 && (
                        <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                          Limit approaching
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            {(!budgets || budgets.length === 0) && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrendingDown className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No budgets yet
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Create your first budget to start tracking expenses
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-sm">
                  <FiPlus className="w-4 h-4" />
                  Create Budget
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Budget Tips Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-sm p-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Budget Tips
          </h1>
          <div className="space-y-4">
            {budgets.map((budget) => {
              const spent = getSpentAmount(budget.category._id);
              const percentage = getProgressPercentage(spent, budget.amount);
              const remaining = budget.amount - spent;

              // Only show relevant tips
              if (percentage >= 90) {
                return (
                  <div
                    key={budget._id}
                    className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500"
                  >
                    <p className="text-sm text-amber-800 font-medium">
                      {budget.category.name} is at {Math.round(percentage)}%
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      You have KES {remaining.toLocaleString()} left for the
                      month
                    </p>
                  </div>
                );
              }

              if (percentage <= 50 && spent > 0) {
                return (
                  <div
                    key={budget._id}
                    className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500"
                  >
                    <p className="text-sm text-emerald-800 font-medium">
                      Great job with {budget.category.name}!
                    </p>
                    <p className="text-xs text-emerald-700 mt-1">
                      You're {Math.round(100 - percentage)}% under budget
                    </p>
                  </div>
                );
              }

              return null;
            })}

            {/* Default tips */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-700">
                Set up automatic savings to reach your goals faster
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-700">
                Review your subscriptions monthly
              </p>
            </div>
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
