// Types for the fee management system
export type Board = 'State' | 'CBSE' | 'ICSE';

export type Grade = 
  | 'Nursery' | 'LKG' | 'UKG'
  | 'Class 1' | 'Class 2' | 'Class 3' | 'Class 4' | 'Class 5'
  | 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10'
  | 'Class 11' | 'Class 12';

export interface FeeStructure {
  id: string;
  grade: Grade;
  board: Board;
  monthlyFee: number;
  admissionFee: number;
  securityDeposit: number;
  examFee?: number;
  labFee?: number;
  libraryFee?: number;
  sportsFee?: number;
  miscFee?: number;
  totalFee: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  username: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AdminRecoveryData {
  username: string;
  email: string;
}
