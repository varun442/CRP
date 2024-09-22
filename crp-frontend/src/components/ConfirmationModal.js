import React, { useState } from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, action }) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Are you sure you want to {action} this event?
          </h3>
          <div className="mt-2 px-7 py-3">
            {action === 'reject' && (
              <input
                type="text"
                className="mt-2 px-3 py-2 border rounded-md w-full"
                placeholder="Reason for rejection"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            )}
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={() => onConfirm(reason)}
            >
              Yes
            </button>
            <button
              id="cancel-btn"
              className="mt-3 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;