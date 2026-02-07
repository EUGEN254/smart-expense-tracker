import React from "react";
import { FiPlus, FiX, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { useCategory, useDashboard } from "../hooks";

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
  } = useDashboard();

  const { categoryList } = useCategory();

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Main content would go here */}

      {/* Floating Action Button */}
      <button
        onClick={() => setAddTransaction(true)}
        className="fixed bottom-6 right-6 z-30 group"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center">
          <FiPlus className="w-6 h-6 text-white transform group-hover:rotate-90 transition-transform duration-300" />

          {/* Subtle ring effect */}
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 group-hover:border-emerald-400/50 transition-colors"></div>
        </div>

        {/* Tooltip */}
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
              {/* Modal Header */}
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

              {/* Transaction Type Selector */}
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

                {/* Form */}
                <form onSubmit={handleAddTransaction}>
                  <div className="space-y-4">
                    {/* Description */}
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

                    {/* Amount */}
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

                    {/* Category - Only for Expenses */}
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

                  {/* Modal Footer */}
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
