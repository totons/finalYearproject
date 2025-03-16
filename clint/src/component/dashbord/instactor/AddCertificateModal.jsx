import React, { useState } from 'react';

const AddCertificateModal = ({ studentId, courseId, onClose, onSubmit }) => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  // Handle image change when user selects a file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image) {
      setMessage('Please select an image.');
      return;
    }
  
    // Prepare FormData to send image and other details
    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', studentId); // Pass student ID
    formData.append('courseId', courseId);   // Pass course ID
  
    // Log data before sending it
    console.log('Form Data:', {
      image: image.name,  // Log image file name
      studentId: studentId,
      courseId: courseId,
    });
  
    try {
      const response = await fetch('http://127.0.0.1:5004/api/certificate/', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessage('Certificate added successfully!');
        onSubmit(); // Call the callback to refresh or update the list
      } else {
        setMessage(data.message || 'An error occurred.');
        console.log(data.message)
      }
    } catch (error) {
      setMessage('An error occurred.');
      console.error(error);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add Certificate</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="certificateImage" className="block text-gray-700">Certificate Image</label>
            <input
              type="file"
              id="certificateImage"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 p-2 border rounded"
            />
          </div>
          <div className="mb-4 text-red-500">{message}</div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCertificateModal;
