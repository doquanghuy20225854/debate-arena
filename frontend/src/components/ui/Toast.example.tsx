import React from 'react';
import { useToast } from '../../context/ToastContext';

/**
 * Example usage of Toast notification system
 */

const ToastExample: React.FC = () => {
  const toast = useToast();

  return (
    <div style={{ padding: '24px', minHeight: '100vh', background: '#fafaf9' }}>
      <h1 style={{ marginBottom: '32px' }}>Toast Notification Examples</h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '400px',
        }}
      >
        <button
          onClick={() => toast.success('Operation completed successfully!')}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Show Success Toast
        </button>

        <button
          onClick={() => toast.error('Something went wrong. Please try again.')}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Show Error Toast
        </button>

        <button
          onClick={() => toast.warning('Please check your input before submitting.')}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Show Warning Toast
        </button>

        <button
          onClick={() => toast.info('New message received from Alex Johnson.')}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Show Info Toast
        </button>

        <button
          onClick={() =>
            toast.success('This toast will stay for 6 seconds', 6000)
          }
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #9333ea 0%, #a855f7 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Show Custom Duration Toast
        </button>

        <button
          onClick={() => {
            toast.success('First toast');
            setTimeout(() => toast.info('Second toast'), 500);
            setTimeout(() => toast.warning('Third toast'), 1000);
          }}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Show Multiple Toasts
        </button>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#ffffff', borderRadius: '16px' }}>
        <h2 style={{ marginBottom: '16px' }}>Usage in Components</h2>
        <pre
          style={{
            background: '#1f2937',
            color: '#f3f4f6',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '14px',
          }}
        >
          {`import { useToast } from '../context/ToastContext';

const MyComponent = () => {
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await submitForm();
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    }
  };

  return <button onClick={handleSubmit}>Submit</button>;
};`}
        </pre>
      </div>
    </div>
  );
};

export default ToastExample;

