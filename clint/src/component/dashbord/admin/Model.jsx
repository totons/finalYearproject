import React from 'react';

const Modal = ({ instructor, onClose }) => {
    if (!instructor) return null; // Return null if no instructor info

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h3 className="text-xl font-bold mb-2">{instructor.fullname}</h3>
                <p><strong>Email:</strong> {instructor.email}</p>
                <p><strong>Biography:</strong> {instructor.biography || 'No biography available.'}</p>
                <button onClick={onClose} className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors duration-200">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
