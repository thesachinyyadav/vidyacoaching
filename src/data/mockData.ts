import type { FeeStructure, Grade, Board } from '../types';

// Mock data for different boards and grades
export const mockFeeData: FeeStructure[] = [
  // State Board Fees
  {
    id: '1',
    grade: 'Nursery',
    board: 'State',
    monthlyFee: 800,
    admissionFee: 2000,
    securityDeposit: 1500,
    examFee: 200,
    labFee: 0,
    libraryFee: 100,
    sportsFee: 150,
    miscFee: 100,
    totalFee: 950,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    grade: 'Class 1',
    board: 'State',
    monthlyFee: 1000,
    admissionFee: 2500,
    securityDeposit: 2000,
    examFee: 300,
    labFee: 0,
    libraryFee: 150,
    sportsFee: 200,
    miscFee: 150,
    totalFee: 1200,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    grade: 'Class 5',
    board: 'State',
    monthlyFee: 1500,
    admissionFee: 3000,
    securityDeposit: 2500,
    examFee: 400,
    labFee: 200,
    libraryFee: 200,
    sportsFee: 250,
    miscFee: 200,
    totalFee: 1750,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    grade: 'Class 10',
    board: 'State',
    monthlyFee: 2500,
    admissionFee: 4000,
    securityDeposit: 3000,
    examFee: 600,
    labFee: 400,
    libraryFee: 300,
    sportsFee: 300,
    miscFee: 300,
    totalFee: 2900,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  
  // CBSE Board Fees
  {
    id: '5',
    grade: 'Nursery',
    board: 'CBSE',
    monthlyFee: 1200,
    admissionFee: 3000,
    securityDeposit: 2000,
    examFee: 300,
    labFee: 0,
    libraryFee: 150,
    sportsFee: 200,
    miscFee: 150,
    totalFee: 1400,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '6',
    grade: 'Class 1',
    board: 'CBSE',
    monthlyFee: 1500,
    admissionFee: 3500,
    securityDeposit: 2500,
    examFee: 400,
    labFee: 100,
    libraryFee: 200,
    sportsFee: 250,
    miscFee: 200,
    totalFee: 1750,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '7',
    grade: 'Class 5',
    board: 'CBSE',
    monthlyFee: 2000,
    admissionFee: 4000,
    securityDeposit: 3000,
    examFee: 500,
    labFee: 300,
    libraryFee: 250,
    sportsFee: 300,
    miscFee: 250,
    totalFee: 2350,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '8',
    grade: 'Class 10',
    board: 'CBSE',
    monthlyFee: 3500,
    admissionFee: 5000,
    securityDeposit: 4000,
    examFee: 800,
    labFee: 600,
    libraryFee: 400,
    sportsFee: 400,
    miscFee: 400,
    totalFee: 4100,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  
  // ICSE Board Fees
  {
    id: '9',
    grade: 'Nursery',
    board: 'ICSE',
    monthlyFee: 1500,
    admissionFee: 4000,
    securityDeposit: 2500,
    examFee: 400,
    labFee: 0,
    libraryFee: 200,
    sportsFee: 250,
    miscFee: 200,
    totalFee: 1750,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '10',
    grade: 'Class 1',
    board: 'ICSE',
    monthlyFee: 1800,
    admissionFee: 4500,
    securityDeposit: 3000,
    examFee: 500,
    labFee: 150,
    libraryFee: 250,
    sportsFee: 300,
    miscFee: 250,
    totalFee: 2100,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '11',
    grade: 'Class 5',
    board: 'ICSE',
    monthlyFee: 2500,
    admissionFee: 5000,
    securityDeposit: 3500,
    examFee: 600,
    labFee: 400,
    libraryFee: 300,
    sportsFee: 350,
    miscFee: 300,
    totalFee: 2900,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '12',
    grade: 'Class 10',
    board: 'ICSE',
    monthlyFee: 4000,
    admissionFee: 6000,
    securityDeposit: 4500,
    examFee: 1000,
    labFee: 800,
    libraryFee: 500,
    sportsFee: 500,
    miscFee: 500,
    totalFee: 4700,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const grades: Grade[] = [
  'Nursery', 'LKG', 'UKG',
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12'
];

export const boards: Board[] = ['State', 'CBSE', 'ICSE'];

// Utility functions
export const getFeeByGradeAndBoard = (grade: Grade, board: Board): FeeStructure | undefined => {
  return mockFeeData.find(fee => fee.grade === grade && fee.board === board);
};

export const getFeesByBoard = (board: Board): FeeStructure[] => {
  return mockFeeData.filter(fee => fee.board === board);
};

export const getFeesByGrade = (grade: Grade): FeeStructure[] => {
  return mockFeeData.filter(fee => fee.grade === grade);
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
