import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', ...rest }) => {
  return (
    <label className="block">
      {label && <div className="mb-1 text-sm font-medium text-gray-700">{label}</div>}
      <input
        className={`w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-christmas-green/50 ${className}`}
        {...rest}
      />
    </label>
  );
};

export default Input;
