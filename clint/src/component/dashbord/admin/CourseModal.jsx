// CourseModal.js
import React from 'react';

const CourseModal = ({ course, instructor, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
                <p className="mb-2"><strong>Instructor:</strong> {instructor.fullname}</p>
                <p className="mb-2"><strong>Description:</strong> {course.description}</p>
                <p className="mb-2"><strong>Price:</strong> ${course.price}</p>
                <p className="mb-2"><strong>Skills:</strong> {course.skills}</p>
                <button onClick={onClose} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default CourseModal;
