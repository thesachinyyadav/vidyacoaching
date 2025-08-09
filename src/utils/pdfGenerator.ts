// PDF Generation utility for fee slips
import jsPDF from 'jspdf';
import type { FeeStructure, Board, Grade } from '../types';

interface PdfGeneratorOptions {
  fee: FeeStructure;
  grade: Grade;
  board: Board;
}

export const generateFeeSlipPDF = ({ fee, grade, board }: PdfGeneratorOptions) => {
  // Create new PDF document with better dimensions
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  // Set document properties
  doc.setProperties({
    title: `Monthly Fee Slip - ${grade} (${board} Board)`,
    subject: 'Vidya Coaching Monthly Fee',
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

  // Background design elements
  // Top gradient background
  doc.setFillColor(59, 130, 246); // Blue gradient start
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  doc.setFillColor(99, 102, 241); // Purple gradient end
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Header Section
  yPosition = 15;
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  const title = 'VIDYA COACHING';
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleWidth) / 2, yPosition);
  
  yPosition += 8;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(240, 240, 240);
  const subtitle = 'Excellence in Education';
  const subtitleWidth = doc.getTextWidth(subtitle);
  doc.text(subtitle, (pageWidth - subtitleWidth) / 2, yPosition);

  // Contact info in header
  yPosition += 12;
  doc.setFontSize(9);
  doc.setTextColor(220, 220, 220);
  const contact = '📞 8073465108 | 📧 info@vidyacoaching.com';
  const contactWidth = doc.getTextWidth(contact);
  doc.text(contact, (pageWidth - contactWidth) / 2, yPosition);

  // Main content area
  yPosition = 70;
  
  // Student details card
  const cardY = yPosition;
  const cardHeight = 35;
  
  // White card background with shadow effect
  doc.setFillColor(245, 245, 245); // Shadow
  doc.rect(margin + 1, cardY + 1, pageWidth - (2 * margin), cardHeight, 'F');
  doc.setFillColor(255, 255, 255); // White card
  doc.rect(margin, cardY, pageWidth - (2 * margin), cardHeight, 'F');
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.3);
  doc.rect(margin, cardY, pageWidth - (2 * margin), cardHeight, 'S');

  // Student details content
  yPosition += 12;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(50, 50, 50);
  doc.text('📚 Class Details', margin + 8, yPosition);

  yPosition += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text(`Class/Grade: ${grade}`, margin + 8, yPosition);
  doc.text(`Board: ${board}`, margin + 8, yPosition + 6);
  doc.text(`Academic Year: 2024-25`, margin + 8, yPosition + 12);

  // Issue date on the right
  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  doc.text(`Issue Date: ${today}`, pageWidth - margin - 35, yPosition + 6);

  // Monthly Fee Highlight Section
  yPosition += 35;
  
  // Large fee display card
  const feeCardY = yPosition;
  const feeCardHeight = 45;
  
  // Gradient background for fee card
  doc.setFillColor(16, 185, 129); // Green gradient start
  doc.rect(margin, feeCardY, pageWidth - (2 * margin), feeCardHeight, 'F');
  
  doc.setFillColor(5, 150, 105); // Green gradient end
  doc.rect(margin, feeCardY, pageWidth - (2 * margin), feeCardHeight * 0.7, 'F');

  // Fee amount
  yPosition += 18;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Monthly Fee', margin + 10, yPosition);

  // Large fee amount
  yPosition += 15;
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  const feeAmount = formatCurrency(fee.totalFee);
  const feeAmountWidth = doc.getTextWidth(feeAmount);
  doc.text(feeAmount, (pageWidth - feeAmountWidth) / 2, yPosition);

  // Payment instructions
  yPosition += 35;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text('💳 Payment Information', margin, yPosition);

  yPosition += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  
  const paymentInfo = [
    '• Monthly fees are due by the 5th of each month',
    '• Payment methods: Cash, UPI, Bank Transfer',
    '• Late payment may incur additional charges',
    '• For payment queries, contact: 8073465108'
  ];

  paymentInfo.forEach((info, index) => {
    doc.text(info, margin, yPosition + (index * 5));
  });
  yPosition += paymentInfo.length * 5 + 15;

  // Address section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text('📍 Visit Us', margin, yPosition);

  yPosition += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  const address = [
    'No.31, 1st Cross, Ananthnagar',
    'Electronic City Phase 2',
    'Bangalore - 560100'
  ];

  address.forEach((line, index) => {
    const lineWidth = doc.getTextWidth(line);
    doc.text(line, (pageWidth - lineWidth) / 2, yPosition + (index * 4));
  });

  // Footer with QR code placeholder and branding
  yPosition = pageHeight - 25;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  yPosition += 8;
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  const footerText = `Generated on ${new Date().toLocaleDateString('en-IN')} | Vidya Coaching Fee Management System`;
  const footerWidth = doc.getTextWidth(footerText);
  doc.text(footerText, (pageWidth - footerWidth) / 2, yPosition);

  // Generate clean filename
  const cleanGrade = grade.replace(/\s+/g, '_');
  const filename = `Vidya_Coaching_Monthly_Fee_${cleanGrade}_${board}.pdf`;
  
  // Save the PDF
  doc.save(filename);
};

export default generateFeeSlipPDF;
