import React from 'react';

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10">
        <h2 className="text-2xl font-bold mb-4">Notice</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
