import { supabase } from './supabase';
import type { FeeStructure, Board, Grade } from '../types';

// Auth Services
export const authService = {
  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Get user session
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  // Listen to auth changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Profile Services
export const profileService = {
  // Get user profile with role
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create profile (usually called automatically)
  async createProfile(userId: string, email: string, role: 'admin' | 'viewer' = 'viewer') {
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          email,
          username: email,
          role,
        }
      ]);
    
    if (error) throw error;
    return data;
  },

  // Update profile
  async updateProfile(userId: string, updates: { username?: string; role?: 'admin' | 'viewer' }) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
    
    if (error) throw error;
    return data;
  }
};

// Fee Services
export const feeService = {
  // Get all fees
  async getAllFees(): Promise<FeeStructure[]> {
    const { data, error } = await supabase
      .from('fees')
      .select('*')
      .order('board', { ascending: true })
      .order('grade', { ascending: true });
    
    if (error) throw error;
    
    return data.map(fee => ({
      id: fee.id,
      grade: fee.grade as Grade,
      board: fee.board as Board,
      monthlyFee: fee.monthly_fee,
      admissionFee: fee.admission_fee,
      securityDeposit: fee.security_deposit,
      examFee: fee.exam_fee || 0,
      labFee: fee.lab_fee || 0,
      libraryFee: fee.library_fee || 0,
      sportsFee: fee.sports_fee || 0,
      miscFee: fee.misc_fee || 0,
      totalFee: fee.total_fee,
      createdAt: new Date(fee.created_at),
      updatedAt: new Date(fee.updated_at),
    }));
  },

  // Get fee by grade and board
  async getFeeByGradeAndBoard(grade: Grade, board: Board): Promise<FeeStructure | null> {
    const { data, error } = await supabase
      .from('fees')
      .select('*')
      .eq('grade', grade)
      .eq('board', board)
      .maybeSingle();
    
    if (error) throw error;
    if (!data) return null;
    
    return {
      id: data.id,
      grade: data.grade as Grade,
      board: data.board as Board,
      monthlyFee: data.monthly_fee,
      admissionFee: data.admission_fee,
      securityDeposit: data.security_deposit,
      examFee: data.exam_fee || 0,
      labFee: data.lab_fee || 0,
      libraryFee: data.library_fee || 0,
      sportsFee: data.sports_fee || 0,
      miscFee: data.misc_fee || 0,
      totalFee: data.total_fee,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  },

  // Add new fee
  async addFee(fee: Omit<FeeStructure, 'id' | 'createdAt' | 'updatedAt'>): Promise<FeeStructure> {
    const { data, error } = await supabase
      .from('fees')
      .insert([
        {
          grade: fee.grade,
          board: fee.board,
          monthly_fee: fee.monthlyFee,
          admission_fee: fee.admissionFee,
          security_deposit: fee.securityDeposit,
          exam_fee: fee.examFee || null,
          lab_fee: fee.labFee || null,
          library_fee: fee.libraryFee || null,
          sports_fee: fee.sportsFee || null,
          misc_fee: fee.miscFee || null,
          total_fee: fee.totalFee,
        }
      ])
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      grade: data.grade as Grade,
      board: data.board as Board,
      monthlyFee: data.monthly_fee,
      admissionFee: data.admission_fee,
      securityDeposit: data.security_deposit,
      examFee: data.exam_fee || 0,
      labFee: data.lab_fee || 0,
      libraryFee: data.library_fee || 0,
      sportsFee: data.sports_fee || 0,
      miscFee: data.misc_fee || 0,
      totalFee: data.total_fee,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  },

  // Update fee
  async updateFee(id: string, updates: Partial<FeeStructure>): Promise<FeeStructure> {
    const updateData: any = {};
    
    if (updates.grade) updateData.grade = updates.grade;
    if (updates.board) updateData.board = updates.board;
    if (updates.monthlyFee !== undefined) updateData.monthly_fee = updates.monthlyFee;
    if (updates.admissionFee !== undefined) updateData.admission_fee = updates.admissionFee;
    if (updates.securityDeposit !== undefined) updateData.security_deposit = updates.securityDeposit;
    if (updates.examFee !== undefined) updateData.exam_fee = updates.examFee || null;
    if (updates.labFee !== undefined) updateData.lab_fee = updates.labFee || null;
    if (updates.libraryFee !== undefined) updateData.library_fee = updates.libraryFee || null;
    if (updates.sportsFee !== undefined) updateData.sports_fee = updates.sportsFee || null;
    if (updates.miscFee !== undefined) updateData.misc_fee = updates.miscFee || null;
    if (updates.totalFee !== undefined) updateData.total_fee = updates.totalFee;
    
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('fees')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      grade: data.grade as Grade,
      board: data.board as Board,
      monthlyFee: data.monthly_fee,
      admissionFee: data.admission_fee,
      securityDeposit: data.security_deposit,
      examFee: data.exam_fee || 0,
      labFee: data.lab_fee || 0,
      libraryFee: data.library_fee || 0,
      sportsFee: data.sports_fee || 0,
      miscFee: data.misc_fee || 0,
      totalFee: data.total_fee,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  },

  // Delete fee
  async deleteFee(id: string): Promise<void> {
    const { error } = await supabase
      .from('fees')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
