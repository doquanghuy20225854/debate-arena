import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`relative bg-white rounded-lg shadow p-4 border border-gray-100 ${className}`}>
      <div className="absolute -top-3 -right-3 text-sm">🎄</div>
      {children}
    </div>
  );
};

export default Card;
