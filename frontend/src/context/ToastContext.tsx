import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer from '../components/ui/ToastContainer';
import { ToastData, ToastType } from '../components/ui/Toast';

interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback(
    (type: ToastType, message: string, duration?: number) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: ToastData = {
        id,
        type,
        message,
        duration,
      };

      setToasts((prev) => [newToast, ...prev]);

      // Optional: Play sound effect
      // playToastSound(type);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message: string, duration?: number) => showToast('success', message, duration),
    [showToast]
  );

  const error = useCallback(
    (message: string, duration?: number) => showToast('error', message, duration),
    [showToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => showToast('warning', message, duration),
    [showToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => showToast('info', message, duration),
    [showToast]
  );

  const value: ToastContextType = {
    showToast,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} maxToasts={3} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Optional: Sound effects function
// const playToastSound = (type: ToastType) => {
//   const audio = new Audio();
//   switch (type) {
//     case 'success':
//       audio.src = '/sounds/success.mp3';
//       break;
//     case 'error':
//       audio.src = '/sounds/error.mp3';
//       break;
//     default:
//       return;
//   }
//   audio.volume = 0.3;
//   audio.play().catch(() => {
//     // Ignore errors if audio fails
//   });
// };

