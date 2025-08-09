import { supabase } from './supabase';
import type { FeeStructure, Board, Grade } from '../types';

// Admin Auth Services (Simple - No Supabase Auth)
export const adminService = {
  // Admin login with username and password
  async login(username: string, password: string) {
    const { data, error } = await supabase.rpc('verify_admin_login', {
      input_username: username,
      input_password: password
    });
    
    if (error) throw error;
    
    const result = data?.[0];
    if (result?.is_valid) {
      return result.user_data;
    }
    return null;
  },

  // Verify admin identity (for password recovery)
  async verifyIdentity(username: string, email: string) {
    const { data, error } = await supabase.rpc('verify_admin_identity', {
      input_username: username,
      input_email: email
    });
    
    if (error) throw error;
    
    const result = data?.[0];
    if (result?.is_valid) {
      return result.user_data;
    }
    return null;
  },

  // Update password (after identity verification)
  async updatePassword(username: string, email: string, newPassword: string) {
    const { data, error } = await supabase.rpc('update_admin_password', {
      input_username: username,
      input_email: email,
      new_password: newPassword
    });
    
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
