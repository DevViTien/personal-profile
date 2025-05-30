"use client";

import { useEffect } from 'react';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

interface ToastProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

/**
 * Toast Component - Hiển thị thông báo tạm thời
 * Sử dụng cho feedback sau khi gửi email
 */
export default function Toast({ 
  type, 
  message, 
  isVisible, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}: ToastProps) {
  
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
          textColor: 'text-green-800 dark:text-green-200',
          iconColor: 'text-green-600 dark:text-green-400',
          icon: CheckCircleIcon
        };
      case 'error':
        return {
          bgColor: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
          textColor: 'text-red-800 dark:text-red-200',
          iconColor: 'text-red-600 dark:text-red-400',
          icon: ExclamationTriangleIcon
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
          textColor: 'text-yellow-800 dark:text-yellow-200',
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          icon: ExclamationTriangleIcon
        };
      default:
        return {
          bgColor: 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800',
          textColor: 'text-gray-800 dark:text-gray-200',
          iconColor: 'text-gray-600 dark:text-gray-400',
          icon: ExclamationTriangleIcon
        };
    }
  };

  const styles = getToastStyles();
  const IconComponent = styles.icon;

  return (
    <div 
      className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className={`
        ${styles.bgColor} ${styles.textColor}
        p-4 rounded-lg lg:rounded-xl border shadow-lg backdrop-blur-sm
        flex items-start space-x-3
      `}>
        <IconComponent className={`w-5 h-5 ${styles.iconColor} flex-shrink-0 mt-0.5`} />
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-relaxed break-words">
            {message}
          </p>
        </div>
        
        <button
          onClick={onClose}
          className={`${styles.iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
          aria-label="Đóng thông báo"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
