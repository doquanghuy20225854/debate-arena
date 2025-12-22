import React from 'react';

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-secondary text-black hover:bg-secondary/90',
  danger: 'bg-danger text-white hover:bg-danger/90',
};

const Button = ({ variant = 'primary', christmas = false, children, className = '', ...rest }) => {
  const base = 'px-4 py-2 rounded-md font-medium transition-shadow shadow-sm';
  const christmasClasses = christmas ? 'bg-christmas-red text-white hover:bg-christmas-green/90' : '';
  return (
    <button className={`${base} ${variantClasses[variant]} ${christmas ? christmasClasses : ''} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
