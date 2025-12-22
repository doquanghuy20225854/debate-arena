import React from 'react';
import Spinner from './Spinner';
import '../../styles/designSystem.css';
import './LoadingButton.css';

const LoadingButton = ({
  loading = false,
  loadingText,
  children,
  variant = 'primary',
  size = 'md',
  disabled,
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'loading-button-primary',
    secondary: 'loading-button-secondary',
    outline: 'loading-button-outline',
  };

  const sizeClasses = {
    sm: 'loading-button-sm',
    md: 'loading-button-md',
    lg: 'loading-button-lg',
  };

  const displayText = loading ? loadingText || 'Loading...' : children;

  return (
    <button
      className={`loading-button ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="loading-button-spinner">
          <Spinner size="sm" />
        </span>
      )}
      <span className={loading ? 'loading-button-text-loading' : ''}>{displayText}</span>
    </button>
  );
};

export default LoadingButton;

