import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { register as registerService, login as loginService } from '../services/auth';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Register = () => {
  // const navigate = useNavigate(); // TODO: Use for navigation after successful registration
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const password = watch('password');

  const { login } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log('Register data (sending):', data);
      const res = await registerService(data.username, data.email, data.password);
      console.log('Registration response:', res);
      toast.success('Đăng ký thành công');
      // Optionally auto-login: call login API and set auth state
      try {
        const loginRes = await loginService(data.email, data.password);
        if (loginRes?.accessToken) {
          localStorage.setItem('accessToken', loginRes.accessToken);
        }
        login(loginRes.user);
        toast.success('Đã đăng nhập tự động');
        navigate('/');
      } catch (err) {
        // If auto-login fails, redirect to login page
        console.warn('Auto-login after register failed', err);
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error?.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join Debate Arena and start debating"
      linkText="Already have an account?"
      linkTo="/login"
    >
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-form-group">
          <label htmlFor="username" className="auth-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="yourusername"
            className={`auth-input ${errors.username ? 'auth-input-error' : ''}`}
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must be less than 20 characters',
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: 'Username can only contain letters, numbers, and underscores',
              },
            })}
          />
          {errors.username && (
            <span className="auth-error">{errors.username.message}</span>
          )}
        </div>

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

        <div className="auth-form-group">
          <label htmlFor="confirmPassword" className="auth-label">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••"
            className={`auth-input ${errors.confirmPassword ? 'auth-input-error' : ''}`}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <span className="auth-error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="auth-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;

