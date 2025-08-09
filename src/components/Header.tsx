import React, { useState } from 'react';
import { GraduationCap, Settings, User, Eye, Sparkles, LogIn, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Login from './Login';

const Header: React.FC = () => {
  const { viewMode, setViewMode, currentUser, authState, logout } = useAppContext();
  const [showLogin, setShowLogin] = useState(false);

  const handleAdminAccess = () => {
    if (authState.isAuthenticated && authState.isAdmin) {
      setViewMode('admin');
    } else {
      setShowLogin(true);
    }
  };

  const handleLogout = () => {
    logout();
    setViewMode('viewer');
  };

  return (
    <header className="glass-morphism sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative">
              <div className="hero-gradient p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg floating-element">
                <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <div className="slide-up">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text">Vidya Coaching</h1>
              <p className="text-xs sm:text-sm text-gray-600 font-medium hidden sm:block">Premium Education Hub</p>
            </div>
          </div>

          {/* Navigation and Controls */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* View Mode Toggle - Only show admin option if authenticated */}
            <div className="flex items-center space-x-1 bg-gray-100/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 sm:p-1.5 shadow-inner">
              <button
                onClick={() => setViewMode('viewer')}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  viewMode === 'viewer'
                    ? 'bg-white text-primary-600 shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Viewer</span>
              </button>
              
              {authState.isAuthenticated && authState.isAdmin ? (
                <button
                  onClick={() => setViewMode('admin')}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    viewMode === 'admin'
                      ? 'bg-white text-primary-600 shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </button>
              ) : (
                <button
                  onClick={handleAdminAccess}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 text-gray-600 hover:text-gray-900 hover:bg-white/50"
                >
                  <LogIn className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Login</span>
                </button>
              )}
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-white/20">
              <div className="relative">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2.5 rounded-xl shadow-md">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">
                  {currentUser?.username || 'Guest User'}
                </p>
                <p className="text-xs text-gray-500 capitalize font-medium">
                  {authState.isAuthenticated ? 'admin' : 'viewer'} Mode
                </p>
              </div>
              
              {/* Logout button for authenticated users */}
              {authState.isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 opacity-60"></div>
      
      {/* Login Modal */}
      {showLogin && (
        <Login 
          onCancel={() => setShowLogin(false)}
        />
      )}
    </header>
  );
};

export default Header;
