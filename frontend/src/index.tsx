import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

const container = document.getElementById('root');
if (!container) throw new Error('Root container missing in index.html');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>
);
