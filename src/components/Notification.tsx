import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface NotificationProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({ type, message, onClose }) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const Icon = icons[type];

  return (
    <div className={`p-4 rounded-lg border ${colors[type]} flex items-center space-x-3`}>
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Notification;
