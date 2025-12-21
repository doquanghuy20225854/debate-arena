import React from 'react';
import Spinner from './Spinner';
import './PageLoader.css';

interface PageLoaderProps {
  message?: string;
  logo?: React.ReactNode;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  message = 'Loading Debate Arena...',
  logo,
}) => {
  return (
    <div className="page-loader">
      <div className="page-loader-backdrop" />
      <div className="page-loader-content">
        {logo && <div className="page-loader-logo">{logo}</div>}
        <Spinner size="lg" />
        <div className="page-loader-message">{message}</div>
      </div>
    </div>
  );
};

export default PageLoader;

