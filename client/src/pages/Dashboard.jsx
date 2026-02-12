import React, { useEffect } from "react";
import { FiPlus, FiX, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { useBudgets, useCategory, useDashboard } from "../hooks";
import { Line } from "rc-progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = () => {
  const {
    addTransaction,
    setAddTransaction,
    currentState,
    setCurrentState,
    handleAddTransaction,
    formData,
    setFormData,
    isTransactionLoading,
    totalIncome,
    totalExpense,
    totalBalance,
    spendingByCategory,
    fetchDashboardTotals,
  } = useDashboard();

  const { budgets, getBudget } = useBudgets();
  const { categoryList, fetchCategories } = useCategory();

  // Calculate spent amount for a budget
  const getSpentAmount = (categoryId) => {
    return spendingByCategory?.[categoryId] || 0;
  };

  // Calculate progress percentage
  const getProgressPercentage = (spent, budgetAmount) => {
    if (!budgetAmount) return 0;
    const percentage = (spent / budgetAmount) * 100;
    return Math.min(percentage, 100);
  };

  // Get color based on percentage
  const getProgressColor = (percentage) => {
    if (percentage >= 90) return "#ef4444";
    if (percentage >= 75) return "#f59e0b";
    return "#10b981";
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

  const COLORS = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#f97316",
    "#6366f1",
    "#6b7280",
  ];

  const preparePieChartData = () => {
    if (!spendingByCategory || !categoryList) return [];
    const chartData = [];
    Object.entries(spendingByCategory).forEach(([categoryId, amount]) => {
      const category = categoryList.find((cat) => cat._id === categoryId);
      if (category && amount > 0) {
        chartData.push({
          name: category.name,
          value: amount,
          id: categoryId,
        });
      }
    });
    return chartData.sort((a, b) => b.value - a.value).slice(0, 5);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="text-sm font-medium text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-emerald-600 font-semibold">
            KES {payload[0].value.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {((payload[0].value / totalExpense) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="space-y-2 mt-2">
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-700">{entry.value}</span>
            </div>
            <span className="font-medium text-gray-900">
              KES {entry.payload?.value?.toLocaleString() || 0}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    getBudget();
    fetchCategories();
    fetchDashboardTotals();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Track your spending, manage your budget
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor your finances at a glance
          </p>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Balance Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl shadow-lg p-6 text-white">
            <p className="text-emerald-100 text-sm font-medium mb-2">
              Total Balance
            </p>
            <p className="text-3xl font-bold">KES {totalBalance.toLocaleString()}</p>
            <p className="text-emerald-100 text-xs mt-2">Updated just now</p>
          </div>

          {/* Income Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Income</p>
                <p className="text-2xl font-bold text-emerald-600">
                  + KES {totalIncome.toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs mt-1">This month</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Expense Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Expense
                </p>
                <p className="text-2xl font-bold text-rose-600">
                  - KES {totalExpense.toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs mt-1">This month</p>
              </div>
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <FiTrendingDown className="w-6 h-6 text-rose-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Spending by Category Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Spending by Category
                </h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  This month
                </span>
              </div>

              {totalExpense > 0 ? (
                <>
                  {/* Pie Chart Container - Fixed height with proper spacing */}
                  <div className="relative w-full h-[220px] mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={preparePieChartData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={85}
                          paddingAngle={2}
                          dataKey="value"
                          strokeWidth={0}
                        >
                          {preparePieChartData().map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                              className="hover:opacity-80 transition-opacity cursor-pointer"
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                    
                    {/* Center Total Display - Absolutely positioned in middle of donut */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        KES {totalExpense.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Total spent</p>
                    </div>
                  </div>

                  {/* Legend Section - Separate from chart */}
                  <div className="mt-4 pt-2 border-t border-gray-100">
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                      Category Breakdown
                    </h3>
                    {preparePieChartData().length > 0 ? (
                      <div className="max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                        {preparePieChartData().map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              />
                              <span className="text-sm text-gray-700">{item.name}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-medium text-gray-900">
                                KES {item.value.toLocaleString()}
                              </span>
                              <span className="text-xs text-gray-500 ml-2">
                                ({((item.value / totalExpense) * 100).toFixed(1)}%)
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-2">
                        No category data available
                      </p>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Categories</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {Object.keys(spendingByCategory).length}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">
                          Avg per category
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          KES{" "}
                          {Object.keys(spendingByCategory).length > 0
                            ? Math.round(
                                totalExpense /
                                  Object.keys(spendingByCategory).length,
                              ).toLocaleString()
                            : 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Empty State for Pie Chart
                <div className="flex flex-col items-center justify-center flex-1 min-h-[400px]">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FiTrendingDown className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No spending yet
                  </h3>
                  <p className="text-sm text-gray-600 text-center mb-4 max-w-[200px]">
                    Add your first expense to see category breakdown
                  </p>
                  <button
                    onClick={() => setAddTransaction(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add Expense
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Budget Overview Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Budget Overview
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Track your spending against monthly budgets
                  </p>
                </div>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-5 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
                {budgets && budgets.length > 0 ? (
                  budgets.map((budget) => {
                    const spent = getSpentAmount(budget.category._id);
                    const percentage = getProgressPercentage(
                      spent,
                      budget.amount,
                    );
                    const progressColor = getProgressColor(percentage);
                    const status = getStatusMessage(
                      spent,
                      budget.amount,
                      percentage,
                    );

                    return (
                      <div
                        key={budget._id}
                        className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                              <span className="text-lg font-semibold text-emerald-600">
                                {budget.category.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {budget.category.name}
                              </h3>
                              <p className="text-xs text-gray-500">
                                Monthly budget
                              </p>
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

                          <div className="flex justify-between items-center mt-3">
                            <span className={`text-xs ${status.className}`}>
                              {status.text}
                            </span>

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
                  })
                ) : (
                  // Single Empty State for Budgets
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
          </div>
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>

      {/* Floating Action Button */}
      <button
        onClick={() => setAddTransaction(true)}
        className="fixed bottom-6 right-6 z-30 group"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center">
          <FiPlus className="w-6 h-6 text-white transform group-hover:rotate-90 transition-transform duration-300" />
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 group-hover:border-emerald-400/50 transition-colors"></div>
        </div>
        <div className="absolute -top-12 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Add Transaction
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
        </div>
      </button>

      {/* Transaction Modal */}
      {addTransaction && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setAddTransaction(false)}
          ></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Add Transaction
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Record your income or expense
                  </p>
                </div>
                <button
                  onClick={() => setAddTransaction(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-900 block mb-3">
                    Transaction Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentState("Expense")}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
                        currentState === "Expense"
                          ? "border-emerald-500 bg-emerald-600 text-white"
                          : "border-gray-300 hover:border-gray-400 text-gray-700"
                      }`}
                    >
                      <span className="font-medium">Expense</span>
                    </button>
                    <button
                      onClick={() => setCurrentState("Income")}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
                        currentState === "Income"
                          ? "border-emerald-500 bg-emerald-600 text-white"
                          : "border-gray-300 hover:border-gray-400 text-gray-700"
                      }`}
                    >
                      <span className="font-medium">Income</span>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleAddTransaction}>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-900 block mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        placeholder="e.g., Grocery shopping, Salary, etc."
                        className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-900 block mb-2">
                        Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500">
                          KES
                        </span>
                        <input
                          type="number"
                          value={formData.amount}
                          onChange={(e) =>
                            setFormData({ ...formData, amount: e.target.value })
                          }
                          placeholder="0.00"
                          className="w-full pl-8 pr-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
                          step="0.01"
                          min="0"
                        />
                      </div>
                    </div>

                    {currentState === "Expense" && (
                      <div>
                        <label className="text-sm font-medium text-gray-900 block mb-2">
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
                          className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        >
                          <option value="">Select a category</option>
                          {categoryList.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      disabled={isTransactionLoading}
                      onClick={() => setAddTransaction(false)}
                      className="px-5 py-2.5 text-gray-700 font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      {isTransactionLoading ? "Adding..." : "Add Transaction"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;