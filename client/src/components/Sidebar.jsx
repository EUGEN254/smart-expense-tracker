import React from "react";
import {
  Home,
  Receipt,
  PieChart,
  Wallet,
  Settings,
  TrendingUp,
  LogOut,
  FolderOpen,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Sidebar = ({ collapsed = false, onLinkClick = () => {} }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { logout } = useUser();

  const mainLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Budgets",
      path: "/budgets",
      icon: <Wallet className="h-5 w-5" />,
    },
      {
      name: "Categories",
      path: "/categories",
      icon: <FolderOpen className="h-5 w-5" />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <Receipt className="h-4 w-4" />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <PieChart className="h-4 w-4" />,
    },
  ];

  const otherLinks = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  const isActive = (path) => {
    return currentPath === path;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`h-full border-r border-gray-200 flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
      {/* Header/Brand */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-xs sm:text-sm text-gray-900">
                Smart Expense Tracker
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 p-4 space-y-8 overflow-y-auto">
        {/* Main Menu Section */}
        <div className="space-y-3">
          {!collapsed && (
            <div className="px-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Main Menu
              </h2>
            </div>
          )}
          <nav className="space-y-1">
            {mainLinks.map((link, index) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={index}
                  to={link.path}
                  onClick={onLinkClick}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <div
                    className={`${active ? "text-emerald-600" : "text-gray-500"}`}
                  >
                    {link.icon}
                  </div>
                  {!collapsed && (
                    <>
                      <span className="font-medium text-sm">{link.name}</span>
                      {active && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500"></div>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Other Links Section */}
        <div className="space-y-3">
          {!collapsed && (
            <div className="px-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Other
              </h2>
            </div>
          )}
          <nav className="space-y-1">
            {otherLinks.map((link, index) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={index}
                  to={link.path}
                  onClick={onLinkClick}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <div
                    className={`${active ? "text-emerald-600" : "text-gray-500"}`}
                  >
                    {link.icon}
                  </div>
                  {!collapsed && (
                    <>
                      <span className="font-medium text-sm">{link.name}</span>
                      {active && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500"></div>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Logout Button */}
      <div className="border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;