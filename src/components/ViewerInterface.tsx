import React, { useState } from 'react';
import { Search, Download, Calculator, TrendingUp, Award, BookOpen, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import type { Board, Grade } from '../types';
import { boards, grades } from '../data/mockData';
import { generateFeeSlipPDF } from '../utils/pdfGenerator';

const ViewerInterface: React.FC = () => {
  const { getFeeByGradeAndBoard } = useAppContext();
  const [selectedBoard, setSelectedBoard] = useState<Board>('State');
  const [selectedGrade, setSelectedGrade] = useState<Grade>('Class 1');

  const selectedFee = getFeeByGradeAndBoard(selectedGrade, selectedBoard);

  const handleDownloadPDF = () => {
    if (selectedFee) {
      try {
        generateFeeSlipPDF({
          fee: selectedFee,
          grade: selectedGrade,
          board: selectedBoard
        });
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Unable to generate PDF. Please try again.');
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    { label: 'Limited Students Only', value: 'Quality Focus', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Only Expert Faculty', value: 'Excellence', icon: Award, color: 'from-green-500 to-emerald-500' },
    { label: '5 Years of Excellence', value: 'Proven Track', icon: BookOpen, color: 'from-purple-500 to-pink-500' },
    { label: 'Success Guaranteed', value: 'Results', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="hero-gradient rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white relative">
          <div className="absolute inset-0 bg-black/10 rounded-2xl sm:rounded-3xl"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left mb-6 lg:mb-0 slide-up">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
                  Welcome to <span className="text-yellow-300">Vidya Coaching</span>
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-4 sm:mb-6">
                  Discover transparent fee structures across all educational boards
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                    State Board
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                    CBSE Board
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                    ICSE Board
                  </span>
                </div>
              </div>
              <div className="floating-element hidden sm:block lg:block">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/30">
                  <Calculator className="h-12 w-12 sm:h-16 sm:w-16 text-white mx-auto mb-3 sm:mb-4" />
                  <p className="text-center font-semibold text-sm sm:text-base">Smart Fee Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 fade-in">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className={`stats-card bg-gradient-to-r ${stat.color} p-4 sm:p-6`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{stat.value}</p>
                <p className="text-xs sm:text-sm opacity-90 leading-tight">{stat.label}</p>
              </div>
              <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 opacity-80 flex-shrink-0 ml-2" />
            </div>
          </div>
        ))}
      </div>

      {/* Selection Panel */}
      <div className="card-gradient p-4 sm:p-6 lg:p-8 slide-up">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl flex-shrink-0">
            <Search className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">Find Your Fee Structure</h3>
            <p className="text-sm sm:text-base text-gray-600">Select your board and grade to view detailed fees</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Board Selection */}
          <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              Select Educational Board
            </label>
            <div className="relative">
              <select
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value as Board)}
                className="input-field appearance-none cursor-pointer pr-10 text-sm sm:text-base py-3 sm:py-4"
              >
                {boards.map((board) => (
                  <option key={board} value={board}>
                    {board} Board
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Grade Selection */}
          <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              Select Grade/Class
            </label>
            <div className="relative">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value as Grade)}
                className="input-field appearance-none cursor-pointer pr-10 text-sm sm:text-base py-3 sm:py-4"
              >
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Display */}
      {selectedFee ? (
        <div className="card-gradient p-4 sm:p-6 lg:p-8 slide-up">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl flex-shrink-0">
                <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                  Fee Structure - {selectedGrade}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium">{selectedBoard} Board Educational Program</p>
              </div>
            </div>
            <button 
              className="btn-secondary flex items-center space-x-2 group w-full sm:w-auto justify-center"
              onClick={handleDownloadPDF}
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce" />
              <span className="text-sm sm:text-base">Download PDF</span>
            </button>
          </div>

          {/* Simple Fee Display */}
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Monthly Fee</h4>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-2">
                  {formatCurrency(selectedFee.totalFee)}
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-white/90">
                  {selectedBoard} Board - {selectedGrade}
                </p>
                <p className="text-sm sm:text-base text-white/70 mt-3 sm:mt-4">
                  *Additional one-time fees may apply during admission
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 sm:p-6 border border-blue-100">
              <h5 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Need Detailed Information?</h5>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                Contact our admission team for complete fee breakdown and additional details.
              </p>
              <button className="btn-primary w-full sm:w-auto">
                Contact for Details
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-8 sm:p-12 lg:p-16 text-center">
          <div className="text-gray-400 mb-4 sm:mb-6">
            <Calculator className="h-16 w-16 sm:h-20 sm:w-20 mx-auto animate-pulse" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            Fee Structure Not Available
          </h3>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto mb-4 sm:mb-6">
            The fee structure for {selectedGrade} ({selectedBoard} Board) is not currently available.
            Please contact our administration team for more information.
          </p>
          <button className="btn-primary w-full sm:w-auto">
            Contact Administration
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewerInterface;
