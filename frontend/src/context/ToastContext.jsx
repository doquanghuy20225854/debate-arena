import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer from '../components/ui/ToastContainer';

const ToastContext = createContext(undefined);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(
    (type, message, duration) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast = {
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

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message, duration) => showToast('success', message, duration),
    [showToast]
  );

  const error = useCallback(
    (message, duration) => showToast('error', message, duration),
    [showToast]
  );

  const warning = useCallback(
    (message, duration) => showToast('warning', message, duration),
    [showToast]
  );

  const info = useCallback(
    (message, duration) => showToast('info', message, duration),
    [showToast]
  );

  const value = {
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

export const useToast = () => {
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

