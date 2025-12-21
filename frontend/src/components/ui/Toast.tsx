import React, { useEffect, useState, useRef, useCallback } from 'react';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
  position: number;
}

const Toast: React.FC<ToastProps> = ({ toast, onDismiss, position }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const duration = toast.duration || 4000; // Default 4 seconds

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 300); // Wait for exit animation
  }, [onDismiss, toast.id]);

  // Progress bar countdown
  useEffect(() => {
    if (isPaused || isExiting) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      return;
    }

    const startTime = Date.now();
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        handleDismiss();
      }
    };

    progressIntervalRef.current = setInterval(updateProgress, 16); // ~60fps

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPaused, isExiting, duration, handleDismiss]);

  // Auto dismiss
  useEffect(() => {
    if (isPaused || isExiting) return;

    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [isPaused, isExiting, duration, handleDismiss]);

  // Touch handlers for swipe to dismiss (mobile)
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    // Only swipe horizontally if horizontal movement is greater
    if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
      setSwipeOffset(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (swipeOffset > 100) {
      // Swiped enough to dismiss
      handleDismiss();
    } else {
      // Snap back
      setSwipeOffset(0);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className={`toast toast-${toast.type} ${isExiting ? 'toast-exiting' : ''}`}
      style={{
        transform: `translateX(${swipeOffset}px)`,
        marginTop: position > 0 ? `${position * 12}px` : '0',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleDismiss}
      role="alert"
      aria-live="assertive"
    >
      <div className="toast-content">
        <div className="toast-icon">{icons[toast.type]}</div>
        <div className="toast-message">{toast.message}</div>
        <button
          className="toast-close"
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
      <div className="toast-progress">
        <div
          className="toast-progress-bar"
          style={{
            width: `${progress}%`,
            transition: isPaused ? 'none' : 'width 0.1s linear',
          }}
        />
      </div>
    </div>
  );
};

export default Toast;

