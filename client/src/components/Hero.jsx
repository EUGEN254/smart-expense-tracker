import React from "react";
import assets from "../assets/assets";
import { useUser } from "../context/UserContext";

const Hero = ({ openAuth }) => {
  const { user } = useUser();
  return (
    <div className="min-h-screen pt-9">
      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Think, plan and track
                <br />
                <span className="bg-gradient-to-r from-gray-600 to-gray-600 bg-clip-text text-transparent">
                  all in one place
                </span>
              </h1>

              <p className="text-sm md:text-sm text-gray-600 leading-relaxed max-w-2xl">
                Effortlessly manage your expenses and budgets with our
                intelligent expense tracker. Gain insights, save money, and
                achieve your financial goals faster.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              {!user && (
                <button
                  onClick={() => openAuth("signup")}
                  className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-600 text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-800  hover:shadow-lg shadow-md"
                >
                  Get Started Free
                </button>
              )}
              <button className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md">
                Watch Demo →
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8">
              <p className="text-sm text-gray-500 mb-4">
                Trusted by thousands worldwide
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-1">
                  <img
                    src={assets.group_profiles}
                    alt="group-profile"
                    className="w-22"
                  />
                  <div className="text-gray-700 font-medium ml-4">
                    10k+ Users
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img
                src={assets.hero}
                alt="Smart Expense Dashboard"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
