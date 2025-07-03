import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import ViewerInterface from './components/ViewerInterface';
import AdminInterface from './components/AdminInterface';
import Footer from './components/Footer';
import './index.css';

const AppContent: React.FC = () => {
  const { viewMode, authState } = useAppContext();

  // Only show admin interface if user is authenticated and admin
  const showAdminInterface = viewMode === 'admin' && authState.isAuthenticated && authState.isAdmin;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary-200/30 to-primary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary-100/20 to-secondary-100/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="fade-in">
            {showAdminInterface ? <AdminInterface /> : <ViewerInterface />}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
