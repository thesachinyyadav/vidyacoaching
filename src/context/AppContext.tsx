import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FeeStructure, User, Board, Grade, AuthState } from '../types';
import { adminService, feeService } from '../lib/database';

interface AppContextType {
  // Fee Management
  fees: FeeStructure[];
  addFee: (fee: Omit<FeeStructure, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateFee: (id: string, fee: Partial<FeeStructure>) => Promise<void>;
  deleteFee: (id: string) => Promise<void>;
  getFeeByGradeAndBoard: (grade: Grade, board: Board) => FeeStructure | undefined;
  
  // User & View Management
  currentUser: User | null;
  viewMode: 'admin' | 'viewer';
  setViewMode: (mode: 'admin' | 'viewer') => void;
  
  // Authentication
  authState: AuthState;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Loading state
  loading: boolean;
  
  // Refresh data
  refreshFees: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [fees, setFees] = useState<FeeStructure[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'admin' | 'viewer'>('viewer');
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    username: null,
  });

  // Initialize app - only load fees, no auth check
  useEffect(() => {
    console.log('🚀 AppContext: Initializing app...');
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setLoading(true);
      console.log('📡 AppContext: Starting initialization...');
      
      // Only load fees data - no auth checking
      console.log('💰 AppContext: Loading fees...');
      await loadFees();
      
    } catch (error) {
      console.error('❌ AppContext: Error initializing app:', error);
    } finally {
      setLoading(false);
      console.log('✅ AppContext: Initialization complete');
    }
  };

  const loadFees = async () => {
    try {
      console.log('📊 AppContext: Fetching fees from database...');
      const feesData = await feeService.getAllFees();
      console.log('✅ AppContext: Fees loaded:', feesData.length, 'records');
      console.log('📄 AppContext: Sample fee:', feesData[0]);
      setFees(feesData);
    } catch (error) {
      console.error('❌ AppContext: Error loading fees:', error);
      // Fallback to empty array on error
      setFees([]);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 AppContext: Attempting admin login for:', username);
      const userData = await adminService.login(username, password);
      
      if (userData) {
        const user: User = {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          createdAt: new Date(),
        };
        
        setCurrentUser(user);
        setAuthState({
          isAuthenticated: true,
          isAdmin: true,
          username: userData.username,
        });
        
        console.log('✅ AppContext: Admin login successful');
        return true;
      }
      
      console.log('❌ AppContext: Invalid admin credentials');
      return false;
    } catch (error) {
      console.error('❌ AppContext: Login error:', error);
      return false;
    }
  };

  const logout = (): void => {
    console.log('🚪 AppContext: Logging out admin...');
    setCurrentUser(null);
    setAuthState({
      isAuthenticated: false,
      isAdmin: false,
      username: null,
    });
    setViewMode('viewer');
    console.log('✅ AppContext: Logout successful');
  };

  const refreshFees = async (): Promise<void> => {
    console.log('🔄 AppContext: Refreshing fees data...');
    await loadFees();
  };

  const addFee = async (feeData: Omit<FeeStructure, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    try {
      console.log('➕ AppContext: Adding new fee structure:', feeData);
      const newFee = await feeService.addFee(feeData);
      setFees(prev => [...prev, newFee]);
      console.log('✅ AppContext: Fee structure added successfully');
    } catch (error) {
      console.error('❌ AppContext: Error adding fee:', error);
      throw error;
    }
  };

  const updateFee = async (id: string, feeData: Partial<FeeStructure>): Promise<void> => {
    try {
      console.log('✏️ AppContext: Updating fee structure:', id, feeData);
      const updatedFee = await feeService.updateFee(id, feeData);
      setFees(prev => prev.map(fee => fee.id === id ? updatedFee : fee));
      console.log('✅ AppContext: Fee structure updated successfully');
    } catch (error) {
      console.error('❌ AppContext: Error updating fee:', error);
      throw error;
    }
  };

  const deleteFee = async (id: string): Promise<void> => {
    try {
      console.log('🗑️ AppContext: Deleting fee structure:', id);
      await feeService.deleteFee(id);
      setFees(prev => prev.filter(fee => fee.id !== id));
      console.log('✅ AppContext: Fee structure deleted successfully');
    } catch (error) {
      console.error('❌ AppContext: Error deleting fee:', error);
      throw error;
    }
  };

  const getFeeByGradeAndBoard = (grade: Grade, board: Board): FeeStructure | undefined => {
    return fees.find(fee => fee.grade === grade && fee.board === board);
  };

  const value: AppContextType = {
    fees,
    addFee,
    updateFee,
    deleteFee,
    getFeeByGradeAndBoard,
    currentUser,
    viewMode,
    setViewMode,
    authState,
    login,
    logout,
    loading,
    refreshFees,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
