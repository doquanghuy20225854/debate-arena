import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth.css';

const AuthLayout = ({ children, title, subtitle, linkText, linkTo }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="auth-logo-icon">🎭</span>
          <span className="auth-logo-text">Debate Arena</span>
        </div>
        <h1 className="auth-title">{title}</h1>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        {children}
        {linkText && linkTo && (
          <div className="auth-link-container">
            <span className="auth-link-text">{linkText}</span>
            <Link to={linkTo} className="auth-link">
              {linkTo === '/login' ? 'Sign in' : 'Sign up'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;

