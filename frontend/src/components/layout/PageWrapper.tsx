import React from 'react';
import Navbar from './Navbar';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-christmas-green/5 to-snowWhite flex flex-col snow">
      <Navbar />
      <main className="w-full flex-1 pt-28 px-4 py-6">
        <div className="mx-auto w-full max-w-[1200px] p-5">{children}</div>
      </main>
    </div>
  );
};

export default PageWrapper;
