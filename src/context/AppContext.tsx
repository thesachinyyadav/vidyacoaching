import React, { createContext, useContext, useState } from 'react';
import type { FeeStructure, User, ViewMode, Board, Grade, AuthState } from '../types';
import { mockFeeData, generateId } from '../data/mockData';

interface AppContextType {
  // Fee Management
  fees: FeeStructure[];
  addFee: (fee: Omit<FeeStructure, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateFee: (id: string, fee: Partial<FeeStructure>) => void;
  deleteFee: (id: string) => void;
  getFeeByGradeAndBoard: (grade: Grade, board: Board) => FeeStructure | undefined;
  
  // User & View Management
  currentUser: User | null;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  
  // Authentication
  authState: AuthState;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  
  // UI State
  loading: boolean;
  error: string | null;
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
  const [fees, setFees] = useState<FeeStructure[]>(mockFeeData);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('viewer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    username: null,
  });

  const login = (username: string, password: string): boolean => {
    // Simple hardcoded authentication for demo
    if (username === 'sakshiyadav' && password === 'syssakshiyada') {
      const adminUser: User = {
        id: '1',
        name: 'Sakshi Yadav',
        email: 'sakshi@vidyacoaching.com',
        role: 'admin',
        createdAt: new Date(),
      };
      
      setAuthState({
        isAuthenticated: true,
        isAdmin: true,
        username: 'sakshiyadav',
      });
      setCurrentUser(adminUser);
      setViewMode('admin');
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      isAdmin: false,
      username: null,
    });
    setCurrentUser(null);
    setViewMode('viewer');
  };

  const addFee = (feeData: Omit<FeeStructure, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newFee: FeeStructure = {
      ...feeData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setFees(prev => [...prev, newFee]);
  };

  const updateFee = (id: string, feeData: Partial<FeeStructure>) => {
    setFees(prev => prev.map(fee => 
      fee.id === id 
        ? { ...fee, ...feeData, updatedAt: new Date() }
        : fee
    ));
  };

  const deleteFee = (id: string) => {
    setFees(prev => prev.filter(fee => fee.id !== id));
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
    error,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
