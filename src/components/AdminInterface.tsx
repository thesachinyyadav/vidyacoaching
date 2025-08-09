import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Save, X, DollarSign, TrendingUp, Users, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import type { FeeStructure } from '../types';
import { boards, grades } from '../data/mockData';

const AdminInterface: React.FC = () => {
  const { fees, addFee, updateFee, deleteFee } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editingFee, setEditingFee] = useState<FeeStructure | null>(null);
  const [formData, setFormData] = useState<Partial<FeeStructure>>({
    grade: 'Class 1',
    board: 'State',
    monthlyFee: 0,
    admissionFee: 0,
    securityDeposit: 0,
    examFee: 0,
    labFee: 0,
    libraryFee: 0,
    sportsFee: 0,
    miscFee: 0,
    totalFee: 0,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
    }).format(amount).replace('₹', 'Rs. ');
  };

  const calculateTotalFee = (data: Partial<FeeStructure>): number => {
    const monthly = data.monthlyFee || 0;
    const lab = data.labFee || 0;
    const library = data.libraryFee || 0;
    const sports = data.sportsFee || 0;
    const misc = data.miscFee || 0;
    return monthly + lab + library + sports + misc;
  };

  const handleInputChange = (field: keyof FeeStructure, value: string | number) => {
    const newData = { ...formData, [field]: value };
    if (field !== 'totalFee') {
      newData.totalFee = calculateTotalFee(newData);
    }
    setFormData(newData);
  };

  const handleEdit = (fee: FeeStructure) => {
    setEditingFee(fee);
    setFormData(fee);
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingFee(null);
    setFormData({
      grade: 'Class 1',
      board: 'State',
      monthlyFee: 0,
      admissionFee: 0,
      securityDeposit: 0,
      examFee: 0,
      labFee: 0,
      libraryFee: 0,
      sportsFee: 0,
      miscFee: 0,
      totalFee: 0,
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingFee) {
      updateFee(editingFee.id, formData);
    } else {
      addFee(formData as Omit<FeeStructure, 'id' | 'createdAt' | 'updatedAt'>);
    }
    setIsEditing(false);
    setEditingFee(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingFee(null);
    setFormData({
      grade: 'Class 1',
      board: 'State',
      monthlyFee: 0,
      admissionFee: 0,
      securityDeposit: 0,
      examFee: 0,
      labFee: 0,
      libraryFee: 0,
      sportsFee: 0,
      miscFee: 0,
      totalFee: 0,
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this fee structure? This action cannot be undone.')) {
      deleteFee(id);
    }
  };

  const adminStats = [
    { label: 'Total Fee Structures', value: fees.length.toString(), icon: DollarSign, color: 'from-blue-500 to-cyan-500' },
    { label: 'Boards Supported', value: '3', icon: Star, color: 'from-purple-500 to-pink-500' },
    { label: 'Grades Covered', value: '15+', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Active Records', value: fees.filter(f => f.totalFee > 0).length.toString(), icon: Users, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Admin Header */}
      <div className="relative overflow-hidden">
        <div className="hero-gradient rounded-3xl p-8 text-white relative">
          <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div className="mb-6 lg:mb-0 slide-up">
                <h2 className="text-4xl font-bold mb-4">Admin Dashboard</h2>
                <p className="text-xl text-blue-100">
                  Manage fee structures across all educational boards
                </p>
              </div>
              <button
                onClick={handleNew}
                className="btn-accent flex items-center space-x-3 text-lg px-8 py-4 group floating-element"
              >
                <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
                <span>Add New Fee Structure</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 fade-in">
        {adminStats.map((stat, index) => (
          <div 
            key={stat.label}
            className={`stats-card bg-gradient-to-r ${stat.color}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
              <stat.icon className="h-8 w-8 opacity-80" />
            </div>
          </div>
        ))}
      </div>

      {/* Edit Form Modal */}
      {isEditing && (
        <div className="card-gradient p-8 slide-up border-2 border-primary-200">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-2xl">
                <Edit3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingFee ? 'Edit Fee Structure' : 'Add New Fee Structure'}
                </h3>
                <p className="text-gray-600">Configure fees for specific board and grade combination</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button onClick={handleSave} className="btn-primary flex items-center space-x-2">
                <Save className="h-5 w-5" />
                <span>Save Changes</span>
              </button>
              <button onClick={handleCancel} className="btn-secondary flex items-center space-x-2">
                <X className="h-5 w-5" />
                <span>Cancel</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Educational Board</label>
              <div className="relative">
                <select
                  value={formData.board}
                  onChange={(e) => handleInputChange('board', e.target.value)}
                  className="input-field appearance-none cursor-pointer pr-10"
                >
                  {boards.map((board) => (
                    <option key={board} value={board}>
                      {board} Board
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Grade/Class</label>
              <div className="relative">
                <select
                  value={formData.grade}
                  onChange={(e) => handleInputChange('grade', e.target.value)}
                  className="input-field appearance-none cursor-pointer pr-10"
                >
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Monthly Fees */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Monthly Tuition Fee</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.monthlyFee}
                  onChange={(e) => handleInputChange('monthlyFee', parseInt(e.target.value) || 0)}
                  className="input-field pl-8"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Laboratory Fee</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.labFee}
                  onChange={(e) => handleInputChange('labFee', parseInt(e.target.value) || 0)}
                  className="input-field pl-8"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Library Fee</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.libraryFee}
                  onChange={(e) => handleInputChange('libraryFee', parseInt(e.target.value) || 0)}
                  className="input-field pl-8"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Sports & Activities Fee</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.sportsFee}
                  onChange={(e) => handleInputChange('sportsFee', parseInt(e.target.value) || 0)}
                  className="input-field pl-8"
                  placeholder="0"
                />
              </div>
            </div>

            {/* One-time Fees */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Admission Fee</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.admissionFee}
                  onChange={(e) => handleInputChange('admissionFee', parseInt(e.target.value) || 0)}
                  className="input-field pl-8"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Security Deposit</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.securityDeposit}
                  onChange={(e) => handleInputChange('securityDeposit', parseInt(e.target.value) || 0)}
                  className="input-field pl-8"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Examination Fee</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.examFee}
                  onChange={(e) => handleInputChange('examFee', parseInt(e.target.value) || 0)}
                  className="input-field pl-8"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Miscellaneous Fee</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.miscFee}
                  onChange={(e) => handleInputChange('miscFee', parseInt(e.target.value) || 0)}
                  className="input-field pl-8"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Total Fee Display */}
            <div className="md:col-span-2 space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Total Monthly Fee</label>
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-4 text-white">
                <div className="text-3xl font-bold">
                  {formatCurrency(formData.totalFee || 0)}
                </div>
                <p className="text-sm text-white/80 mt-1">Calculated automatically</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fee List */}
      <div className="card-gradient p-8 slide-up">
        <div className="flex items-center space-x-4 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-2xl">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Fee Structure Management</h3>
            <p className="text-gray-600">Overview of all configured fee structures</p>
          </div>
          <div className="ml-auto">
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {fees.length} entries
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-hover">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Board & Grade
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Monthly Fee
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Admission Fee
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Total Monthly
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        fee.board === 'State' ? 'bg-blue-500' : 
                        fee.board === 'CBSE' ? 'bg-green-500' : 'bg-purple-500'
                      }`}></div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{fee.grade}</div>
                        <div className="text-sm text-gray-500 font-medium">{fee.board} Board</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(fee.monthlyFee)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(fee.admissionFee)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                      {formatCurrency(fee.totalFee)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(fee)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-xl transition-all duration-200 hover:scale-110"
                        title="Edit fee structure"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(fee.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-xl transition-all duration-200 hover:scale-110"
                        title="Delete fee structure"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInterface;
