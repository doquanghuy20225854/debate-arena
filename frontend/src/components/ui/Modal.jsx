import React from 'react';

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500">✖</button>
        </div>
        <div className="min-h-[120px]">{children}</div>
        <div className="mt-4 text-sm text-gray-400">(Snow animation placeholder)</div>
      </div>
    </div>
  );
};

export default Modal;
