// Simplified PDF Generator for fee slips
import jsPDF from 'jspdf';
import type { FeeStructure, Board, Grade } from '../types';

interface PdfGeneratorOptions {
  fee: FeeStructure;
  grade: Grade;
  board: Board;
}

export const generateFeeSlipPDF = ({ fee, grade, board }: PdfGeneratorOptions) => {
  const doc = new jsPDF('portrait', 'mm', 'a4');
  
  // Set document properties
  doc.setProperties({
    title: `Fee Slip - ${grade} (${board})`,
    subject: 'Vidya Coaching Fee Details',
    author: 'Vidya Coaching'
  });

  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = margin;

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-IN')}`;
  };

  // Header Section
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('VIDYA COACHING', pageWidth / 2, 18, { align: 'center' });
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Fee Management System', pageWidth / 2, 28, { align: 'center' });
  
  doc.setFontSize(9);
  doc.text('Contact: 8073465108 | info@vidyacoaching.com', pageWidth / 2, 35, { align: 'center' });

  // Reset position after header
  y = 55;

  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(40, 40, 40);
  doc.text('FEE DETAILS', pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Student Info Box
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.rect(margin, y, pageWidth - 2 * margin, 25);
  
  y += 8;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(`Class: ${grade}`, margin + 5, y);
  doc.text(`Board: ${board}`, margin + 5, y + 7);
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, pageWidth - margin - 40, y);
  
  y += 35;

  // Fee Amount Highlight
  doc.setFillColor(34, 197, 94);
  doc.rect(margin, y, pageWidth - 2 * margin, 30, 'F');
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('MONTHLY FEE', margin + 5, y + 12);
  
  doc.setFontSize(28);
  doc.text(formatCurrency(fee.totalFee), pageWidth / 2, y + 22, { align: 'center' });
  
  y += 45;

  // Fee Breakdown (only if other fees exist)
  const hasBreakdown = fee.monthlyFee > 0 || fee.admissionFee > 0 || fee.securityDeposit > 0 || 
                      (fee.examFee && fee.examFee > 0) || (fee.labFee && fee.labFee > 0) || 
                      (fee.libraryFee && fee.libraryFee > 0) || (fee.sportsFee && fee.sportsFee > 0) || 
                      (fee.miscFee && fee.miscFee > 0);

  if (hasBreakdown && fee.totalFee !== (fee.monthlyFee || 0)) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text('Fee Breakdown:', margin, y);
    y += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);

    const feeItems = [
      { label: 'Monthly Fee', amount: fee.monthlyFee },
      { label: 'Admission Fee', amount: fee.admissionFee },
      { label: 'Security Deposit', amount: fee.securityDeposit },
      { label: 'Exam Fee', amount: fee.examFee },
      { label: 'Lab Fee', amount: fee.labFee },
      { label: 'Library Fee', amount: fee.libraryFee },
      { label: 'Sports Fee', amount: fee.sportsFee },
      { label: 'Miscellaneous Fee', amount: fee.miscFee }
    ];

    feeItems.forEach(item => {
      if (item.amount && item.amount > 0) {
        doc.text(item.label, margin + 5, y);
        doc.text(formatCurrency(item.amount), pageWidth - margin - 30, y);
        y += 5;
      }
    });

    // Total line
    y += 5;
    doc.setDrawColor(100, 100, 100);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('Total Amount', margin + 5, y);
    doc.text(formatCurrency(fee.totalFee), pageWidth - margin - 30, y);
    y += 15;
  }

  // Payment Instructions
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(40, 40, 40);
  doc.text('Payment Instructions:', margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  
  const instructions = [
    '• Payment due by 5th of each month',
    '• Accepted: Cash, UPI, Bank Transfer',
    '• Late payment charges may apply',
    '• Contact: 8073465108 for queries'
  ];

  instructions.forEach(instruction => {
    doc.text(instruction, margin + 5, y);
    y += 5;
  });

  y += 10;

  // Address
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(40, 40, 40);
  doc.text('Address:', margin, y);
  y += 7;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('No.31, 1st Cross, Ananthnagar', margin + 5, y);
  doc.text('Electronic City Phase 2, Bangalore - 560100', margin + 5, y + 4);

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(`Generated on ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, footerY, { align: 'center' });

  // Save PDF
  const filename = `Vidya_Coaching_Fee_${grade.replace(/\s+/g, '_')}_${board}.pdf`;
  doc.save(filename);
};

export default generateFeeSlipPDF;
