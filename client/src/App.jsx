import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Reports from "./pages/Reports";
import LandingPage from "./pages/LandingPage";
import Settings from "./pages/Settings";
import { Toaster } from "./components/Sonner";
import Categories from "./pages/Categories";

const App = () => {
  const { loading } = useUser();

    if (loading) {
    return (
      <div className="min-h-screen bbg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Route - redirect to dashboard if already logged in */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Routes - All authenticated pages use Home layout */}
        <Route element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
            <Route path="categories" element={<Categories />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
