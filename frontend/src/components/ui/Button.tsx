import React from 'react';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  christmas?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-secondary text-black hover:bg-secondary/90',
  danger: 'bg-danger text-white hover:bg-danger/90',
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', christmas = false, children, className = '', ...rest }) => {
  const base = 'px-4 py-2 rounded-md font-medium transition-shadow shadow-sm';
  const christmasClasses = christmas ? 'bg-christmas-red text-white hover:bg-christmas-green/90' : '';
  return (
    <button className={`${base} ${variantClasses[variant]} ${christmas ? christmasClasses : ''} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
