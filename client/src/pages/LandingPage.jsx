import React, { useState } from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Auth from "../components/Auth";

const LandingPage = () => {
  const navLinks = ["Home", "Features", "Pricing", "Contact"];
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const closeAuth = () => {
    setAuthOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-600 to-gray-600 bg-clip-text text-transparent">
                Smart-Expense
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={`/${link.toLowerCase()}`}
                  className="text-gray-700 hover:text-gray-600 transition-colors duration-200 font-medium text-sm 
                  tracking-wide relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] 
                  after:bottom-0 after:left-0 after:bg-gray-600 after:origin-bottom-right after:transition-transform 
                  after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {link}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => openAuth("login")}
                className="px-4 py-2 text-black hover:border-gray-200 rounded-lg hover:bg-gray-200 font-medium transition-colors duration-200 text-sm"
              >
                Sign in
              </button>
              <button 
                className="px-4 py-2 text-black border rounded-lg border-gray-300 hover:bg-gray-300 font-medium transition-colors duration-200 text-sm"
                onClick={() => openAuth("signup")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow pt-16">
        <Hero />
      </div>

      {/* Footer Section */}
      <div>
        <Footer />
      </div>

      {/* Auth Modal Overlay */}
      {authOpen && (
        <div className="fixed inset-0  overflow-y-auto z-50">
          {/* Backdrop */}
          <div 
            onClick={closeAuth}
          />
          
          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-transparent transform overflow-hidden rounded-lg shadow-xl transition-all w-full max-w-md">
             
              
              {/* Auth Component */}
              <Auth 
                initialMode={authMode}
                onClose={closeAuth}
                onToggleMode={() => setAuthMode(authMode === "login" ? "signup" : "login")}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;