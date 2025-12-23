import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth.css';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const AuthLayout = ({ children, title, subtitle, linkText, linkTo }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('accessToken');
    toast.info('Đã đăng xuất');
    navigate('/login');
  };

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
        {user ? (
          <div className="auth-link-container">
            <span className="auth-link-text">Xin chào, {user.username || user.name || user.email}</span>
            <button className="auth-link" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          linkText && linkTo && (
            <div className="auth-link-container">
              <span className="auth-link-text">{linkText}</span>
              <Link to={linkTo} className="auth-link">
                {linkTo === '/login' ? 'Sign in' : 'Sign up'}
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AuthLayout;

