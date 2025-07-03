# Vidya Coaching Fee Management System

A modern, responsive web application for managing coaching center fees across different educational boards. Built with React, TypeScript, and Tailwind CSS.

## Features

### 🎯 **Dual Interface Design**
- **Viewer Mode**: Student/parent interface for browsing fee structures
- **Admin Mode**: Administrative interface for managing fee data

### 📚 **Multi-Board Support**
- State Board fee structures
- CBSE Board fee structures
- ICSE Board fee structures

### 🎓 **Comprehensive Grade Coverage**
- Early childhood: Nursery, LKG, UKG
- Primary: Classes 1-5
- Secondary: Classes 6-10
- Senior Secondary: Classes 11-12

### 💰 **Detailed Fee Management**
- Monthly fees (tuition, lab, library, sports, miscellaneous)
- One-time fees (admission, security deposit, examination)
- Automatic total calculation
- Currency formatting in Indian Rupees (INR)

### 🎨 **Modern UI/UX**
- Responsive design for all screen sizes
- Clean, intuitive interface
- Professional color scheme
- Lucide React icons
- Smooth transitions and interactions

## Technology Stack

- **Frontend**: React 19+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Development**: Hot Module Replacement (HMR)

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vidya-coaching
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── ViewerInterface.tsx  # Student/parent view
│   └── AdminInterface.tsx   # Admin panel
├── context/            # React Context
│   └── AppContext.tsx  # Global state management
├── data/              # Mock data and utilities
│   └── mockData.ts    # Sample fee structures
├── types/             # TypeScript definitions
│   └── index.ts       # Type definitions
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles with Tailwind
```

## Usage

### Viewer Mode (Default)
1. Select your board (State/CBSE/ICSE) from the dropdown
2. Choose your grade level
3. View the detailed fee structure
4. Download fee information (feature placeholder)

### Admin Mode
1. Click the "Admin" toggle in the header
2. Add new fee structures using the "Add New Fee" button
3. Edit existing fees by clicking the edit icon
4. Delete fee structures with the delete icon
5. All changes are saved in local state

## Fee Structure Components

Each fee structure includes:

### Monthly Fees
- **Tuition Fee**: Core educational fee
- **Lab Fee**: Laboratory usage charges
- **Library Fee**: Library access charges
- **Sports Fee**: Sports activities fee
- **Miscellaneous Fee**: Other recurring charges

### One-time Fees
- **Admission Fee**: Initial enrollment fee
- **Security Deposit**: Refundable deposit
- **Examination Fee**: Assessment charges

## Screenshots

### Viewer Interface
The clean, user-friendly interface allows students and parents to easily browse fee structures by selecting their board and grade.

### Admin Interface
The comprehensive admin panel provides full CRUD operations for managing fee structures across all boards and grades.

## Customization

### Adding New Boards
1. Update the `Board` type in `src/types/index.ts`
2. Add the new board to `boards` array in `src/data/mockData.ts`
3. Add sample data for the new board

### Adding New Grades
1. Update the `Grade` type in `src/types/index.ts`
2. Add the new grade to `grades` array in `src/data/mockData.ts`

### Styling
- Modify `tailwind.config.js` for theme customization
- Update color schemes in the configuration
- Customize component styles in `src/index.css`

## Data Management

Currently uses mock data stored in `src/data/mockData.ts`. To integrate with a real backend:

1. Replace mock data functions with API calls
2. Update the context to handle async operations
3. Add error handling and loading states
4. Implement authentication for admin access

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for the beautiful icons
- Vite for the fast build tool
