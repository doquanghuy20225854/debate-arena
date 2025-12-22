import React from 'react';
import Toast from './Toast';
import './Toast.css';

const ToastContainer = ({
  toasts,
  onDismiss,
  maxToasts = 3,
}) => {
  const visibleToasts = toasts.slice(0, maxToasts);

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {visibleToasts.map((toast, index) => (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
          position={index}
        />
      ))}
    </div>
  );
};

export default ToastContainer;

