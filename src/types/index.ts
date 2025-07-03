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
  name: string;
  email: string;
  role: 'admin' | 'viewer';
  createdAt: Date;
}

export interface AdminAction {
  id: string;
  userId: string;
  action: 'create' | 'update' | 'delete';
  resourceType: 'fee';
  resourceId: string;
  changes: Record<string, any>;
  timestamp: Date;
}

export type ViewMode = 'admin' | 'viewer';

export interface FeeDisplayProps {
  grade: Grade;
  board: Board;
  fees: FeeStructure[];
}

export interface AdminFeeEditProps {
  fee?: FeeStructure;
  onSave: (fee: Partial<FeeStructure>) => void;
  onCancel: () => void;
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
