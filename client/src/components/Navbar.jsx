import { User, LogOut, Bell, ChevronDown, Settings,Wallet } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  
  const handleLogout = () => {
    // Your logout logic
    localStorage.removeItem('authToken')
    navigate('/auth')
  }

  return (
    <div className='flex justify-between items-center p-3 md:pb-4 mb-6 border-b border-gray-200 shadow-sm'>
      {/* Left side - App Name/Logo (optional) */}
      <div className='flex items-center gap-3'>
        <Wallet className="w-6 h-6 text-emerald-600" />
        <span className='text-lg font-bold text-gray-900 hidden md:block'>
          Expense Tracker
        </span>
      </div>
      
      {/* Right side - User & Actions */}
      <div className='flex items-center gap-4'>
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-gray-900">Eugen Shitera</p>
              <p className="text-xs text-gray-500">eugen@example.com</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          
          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button 
                onClick={() => navigate('/settings')}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <div className="border-t border-gray-200 my-1"></div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar