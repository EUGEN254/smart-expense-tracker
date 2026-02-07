import React, { useState } from "react";
import { useCategory } from "../hooks";
import { FiPlus, FiX, FiTrash2, FiLoader } from "react-icons/fi";

const Categories = () => {
  const {
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
  } = useCategory();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Categories
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Manage your expense categories
            </p>
          </div>
          <button
            onClick={() => setOpenCategoryForm(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 self-start"
          >
            <FiPlus className="w-4 h-4" />
            New Category
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Loading State */}
          {isLoading && categoryList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="relative">
                <div className="w-12 h-12 border-3 border-emerald-100 rounded-full"></div>
                <div className="w-12 h-12 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">
                Loading categories...
              </p>
              <p className="text-sm text-gray-500 mt-1">Please wait a moment</p>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="border-b border-gray-200">
                <div className="px-6 py-4">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-8">
                      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        Category Name
                      </h2>
                    </div>
                    <div className="col-span-4">
                      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        Actions
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-100">
                {categoryList.length === 0 ? (
                  <div className="px-6 py-7 text-center">
                    <div className="mx-auto w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FiPlus className="w-3 h-3 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No categories yet
                    </h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-6">
                      Start by creating your first category to organize expenses
                    </p>
                    <button
                      onClick={() => setOpenCategoryForm(true)}
                      className="inline-flex items-center gap-2 px-3 py-2
                       bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <FiPlus className="w-4 h-4" />
                      Create Category
                    </button>
                  </div>
                ) : (
                  categoryList.map((category, index) => (
                    <div
                      key={category._id || index}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-8">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <div>
                              <span className="text-gray-900 font-medium">
                                {category.name}
                              </span>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {category.count || 0} expenses
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-4 flex justify-end">
                          <button
                            onClick={() => handleDelete(category._id)}
                            disabled={deletingId === category._id}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 active:bg-red-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-red-100 hover:border-red-200"
                          >
                            {deletingId === category._id ? (
                              <>
                                <FiLoader className="w-4 h-4 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              <>
                                <FiTrash2 className="w-4 h-4" />
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {/* Stats Bar */}
        {categoryList.length > 0 && !isLoading && (
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <div>
              Showing <span className="font-medium">{categoryList.length}</span>{" "}
              {categoryList.length === 1 ? "category" : "categories"}
            </div>
            <div className="text-xs text-gray-500">
              Click on a category to view details
            </div>
          </div>
        )}
      </div>

      {/* Create Category Modal */}
      {openCategoryForm && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    New Category
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Add a new expense category
                  </p>
                </div>
                <button
                  onClick={() => setOpenCategoryForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isCreating}
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit}>
                <div className="p-6">
                  <div className="space-y-1 mb-6">
                    <label className="text-sm font-medium text-gray-900">
                      Category Name
                    </label>
                    <p className="text-xs text-gray-500">
                      Enter a descriptive name for your category
                    </p>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={categories}
                      onChange={(e) => setCategories(e.target.value)}
                      placeholder="e.g., Transportation, Groceries..."
                      className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      disabled={isCreating}
                      autoFocus
                    />
                    <div className="absolute right-3 top-3">
                      <div className="w-6 h-6 bg-emerald-50 rounded flex items-center justify-center">
                        <span className="text-xs font-medium text-emerald-700">
                          {categories.length}/50
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                  <button
                    type="button"
                    onClick={() => setOpenCategoryForm(false)}
                    className="px-5 py-2.5 text-gray-700 font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-50"
                    disabled={isCreating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating || !categories.trim()}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    {isCreating ? (
                      <>
                        <FiLoader className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Category"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
