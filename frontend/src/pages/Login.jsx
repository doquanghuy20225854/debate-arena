import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { login as loginService } from '../services/auth';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useContext(AuthContext);
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      console.log('Login data (sending):', data);
      const res = await loginService(data.email, data.password);
      console.log('Login success', res);
      // save token (for now localStorage; consider httpOnly cookie in production)
      if (res?.accessToken) {
        localStorage.setItem('accessToken', res.accessToken);
      }
      // update auth context
      login(res.user);
      toast.success('Đăng nhập thành công');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error?.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to join debates"
      linkText="Don't have an account?"
      linkTo="/register"
    >
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-form-group">
          <label htmlFor="email" className="auth-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={`auth-input ${errors.email ? 'auth-input-error' : ''}`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <span className="auth-error">{errors.email.message}</span>
          )}
        </div>

        <div className="auth-form-group">
          <label htmlFor="password" className="auth-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••"
            className={`auth-input ${errors.password ? 'auth-input-error' : ''}`}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <span className="auth-error">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="auth-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;

