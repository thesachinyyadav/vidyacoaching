import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FeeStructure, User, ViewMode, Board, Grade, AuthState } from '../types';
import { authService, profileService, feeService } from '../lib/database';

interface AppContextType {
  // Fee Management
  fees: FeeStructure[];
  addFee: (fee: Omit<FeeStructure, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateFee: (id: string, fee: Partial<FeeStructure>) => Promise<void>;
  deleteFee: (id: string) => Promise<void>;
  getFeeByGradeAndBoard: (grade: Grade, board: Board) => FeeStructure | undefined;
  
  // User & View Management
  currentUser: User | null;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  
  // Authentication
  authState: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  
  // Loading state
  loading: boolean;
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
  const [viewMode, setViewMode] = useState<ViewMode>('viewer');
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    username: null,
  });

  // Initialize app and check auth state
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setLoading(true);
      
      // Check if user is already logged in
      const session = await authService.getSession();
      if (session?.user) {
        await handleAuthUser(session.user);
      }
      
      // Load fees data
      await loadFees();
      
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthUser = async (user: any) => {
    try {
      const profile = await profileService.getProfile(user.id);
      
      const userData: User = {
        id: user.id,
        name: profile.username || user.email,
        email: user.email,
        role: profile.role,
        createdAt: new Date(profile.created_at),
      };

      setCurrentUser(userData);
      setAuthState({
        isAuthenticated: true,
        isAdmin: profile.role === 'admin',
        username: profile.username || user.email,
      });
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const loadFees = async () => {
    try {
      const feesData = await feeService.getAllFees();
      setFees(feesData);
    } catch (error) {
      console.error('Error loading fees:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { user } = await authService.signIn(email, password);
      if (user) {
        await handleAuthUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.signOut();
      setCurrentUser(null);
      setAuthState({
        isAuthenticated: false,
        isAdmin: false,
        username: null,
      });
      setViewMode('viewer');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const addFee = async (feeData: Omit<FeeStructure, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    try {
      const newFee = await feeService.addFee(feeData);
      setFees(prev => [...prev, newFee]);
    } catch (error) {
      console.error('Error adding fee:', error);
      throw error;
    }
  };

  const updateFee = async (id: string, feeData: Partial<FeeStructure>): Promise<void> => {
    try {
      const updatedFee = await feeService.updateFee(id, feeData);
      setFees(prev => prev.map(fee => fee.id === id ? updatedFee : fee));
    } catch (error) {
      console.error('Error updating fee:', error);
      throw error;
    }
  };

  const deleteFee = async (id: string): Promise<void> => {
    try {
      await feeService.deleteFee(id);
      setFees(prev => prev.filter(fee => fee.id !== id));
    } catch (error) {
      console.error('Error deleting fee:', error);
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
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
