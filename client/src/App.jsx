import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Reports from "./pages/Reports";
import Auth from "./components/Auth";
import { Toaster } from "sonner";
import LandingPage from "./pages/LandingPage";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* other routes*/}
        <Route path="/home" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          
        </Route>
      </Routes>
    </>
  );
};

export default App;