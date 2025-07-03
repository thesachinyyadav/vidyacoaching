// PDF Generation utility for fee slips
import jsPDF from 'jspdf';
import type { FeeStructure, Board, Grade } from '../types';

interface PdfGeneratorOptions {
  fee: FeeStructure;
  grade: Grade;
  board: Board;
}

export const generateFeeSlipPDF = ({ fee, grade, board }: PdfGeneratorOptions) => {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: `Fee Slip - ${grade} (${board} Board)`,
    subject: 'Vidya Coaching Fee Structure',
    author: 'Vidya Coaching',
    creator: 'Vidya Coaching Fee Management System'
  });

  // Page dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return `Rs. ${formattedAmount}`;
  };

  // Header Section
  // Logo/Title area
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(40, 116, 240); // Primary blue color
  const title = 'VIDYA COACHING';
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleWidth) / 2, yPosition);
  yPosition += 10;

  // Subtitle
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  const subtitle = 'Excellence in Education - Fee Structure Slip';
  const subtitleWidth = doc.getTextWidth(subtitle);
  doc.text(subtitle, (pageWidth - subtitleWidth) / 2, yPosition);
  yPosition += 20;

  // Draw separator line
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 15;

  // Contact Information Section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  
  const contactInfo = [
    'Contact: 8073465108',
    'Address: No.31, 1st Cross, Ananthnagar',
    'Electronic City Phase 2, Bangalore - 560100',
    'Email: info@vidyacoaching.com'
  ];

  contactInfo.forEach((info, index) => {
    const textWidth = doc.getTextWidth(info);
    doc.text(info, (pageWidth - textWidth) / 2, yPosition + (index * 5));
  });
  yPosition += 35;

  // Draw separator line
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 15;

  // Student Information Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(40, 40, 40);
  doc.text('Fee Structure Details', margin, yPosition);
  yPosition += 15;

  // Class and Board Information
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const studentDetails = [
    { label: 'Class/Grade:', value: grade },
    { label: 'Educational Board:', value: `${board} Board` },
    { label: 'Academic Session:', value: '2024-25' },
    { label: 'Issue Date:', value: new Date().toLocaleDateString('en-IN') }
  ];

  studentDetails.forEach((detail, index) => {
    doc.setFont('helvetica', 'bold');
    doc.text(detail.label, margin, yPosition + (index * 8));
    doc.setFont('helvetica', 'normal');
    doc.text(detail.value, margin + 40, yPosition + (index * 8));
  });
  yPosition += 45;

  // Fee Details Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(40, 40, 40);
  doc.text('Fee Structure', margin, yPosition);
  yPosition += 15;

  // Fee breakdown box
  const boxY = yPosition;
  const boxHeight = 60;
  
  // Draw fee box
  doc.setFillColor(248, 250, 252); // Light blue background
  doc.rect(margin, boxY, pageWidth - (2 * margin), boxHeight, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(margin, boxY, pageWidth - (2 * margin), boxHeight, 'S');

  // Monthly Fee (Main highlight)
  yPosition += 15;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(40, 116, 240);
  doc.text('Monthly Fee:', margin + 10, yPosition);
  
  const monthlyFeeText = formatCurrency(fee.totalFee);
  const feeWidth = doc.getTextWidth(monthlyFeeText);
  doc.setFontSize(20);
  doc.setTextColor(220, 38, 127); // Secondary color
  doc.text(monthlyFeeText, pageWidth - margin - feeWidth - 10, yPosition);

  yPosition += 25;

  // Important Notes Section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(40, 40, 40);
  doc.text('Important Notes:', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  
  const notes = [
    '• Monthly fees are due by the 5th of each month',
    '• Late payment charges may apply after the due date',
    '• All fees are non-refundable once paid',
    '• Fee structure is subject to annual review',
    '• Contact administration for payment methods and queries'
  ];

  notes.forEach((note, index) => {
    doc.text(note, margin, yPosition + (index * 6));
  });
  yPosition += notes.length * 6 + 15;

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  const footerText = `Generated on ${new Date().toLocaleDateString('en-IN')} - Vidya Coaching Fee Management System`;
  const footerWidth = doc.getTextWidth(footerText);
  doc.text(footerText, (pageWidth - footerWidth) / 2, pageHeight - 15);

  // Generate filename based on grade and board
  const filename = `Vidya_Coaching_Fee_Slip_${grade.replace(/\s+/g, '_')}_${board}_Board.pdf`;
  
  // Save the PDF
  doc.save(filename);
};

export default generateFeeSlipPDF;
