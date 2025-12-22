import React from 'react';
import './Spinner.css';

const Spinner = ({ size = 'md', text, className = '' }) => {
  const sizeClasses = {
    sm: 'spinner-sm',
    md: 'spinner-md',
    lg: 'spinner-lg',
  };

  return (
    <div className={`spinner-container ${className}`}>
      <div className={`spinner ${sizeClasses[size]}`} role="status" aria-label="Loading">
        <span className="spinner-sr-only">Loading...</span>
      </div>
      {text && <div className="spinner-text">{text}</div>}
    </div>
  );
};

export default Spinner;

