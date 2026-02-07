import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex relative">
        <Sidebar
          collapsed={sidebarCollapsed}
          onLinkClick={() => setSidebarOpen(false)}
        />

        {/* Collapse/Expand Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute top-4 sm:top-6 md:top-4 right-0 z-20
           w-6 h-6 bg-white text-gray-700 
           rounded-full flex items-center justify-center 
           shadow-lg hover:bg-gray-100 transition-colors 
           border border-gray-300"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <FaChevronRight size={12} />
          ) : (
            <FaChevronLeft size={12} />
          )}
        </button>
      </div>

      {/* Mobile Overlay Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl md:hidden">
            <div className="relative h-full">
              <button
                className="absolute top-4 right-4 z-50 text-gray-600 hover:text-gray-900 text-xl p-2 rounded-full hover:bg-gray-100"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <FaChevronLeft />
              </button>

              <Sidebar
                collapsed={false}
                onLinkClick={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;