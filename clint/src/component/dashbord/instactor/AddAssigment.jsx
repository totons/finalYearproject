import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AddAssignment = () => {
    const { courseId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submissionDeadline, setSubmissionDeadline] = useState('');
    const [classId, setClassId] = useState('');
    const [file, setFile] = useState(null);
    const [classes, setClasses] = useState([]); // State to store classes

    useEffect(() => {
        // Fetch the list of classes
        const fetchClasses = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5004/api/${courseId}/classes  `);
                const data = await response.json();
                console.log(data.classes);
                if (response.ok) {
                    setClasses(data.classes); // Assuming the response has a "classes" array
                } else {
                    alert(data.message);
                }
            } catch (err) {
                console.error(err);
                alert('Failed to load classes');
            }
        };

        fetchClasses();
    }, [courseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!title || !description || !submissionDeadline || !classId) {
            alert('All fields are required.');
            return;
        }
    console.log(classId)
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('submissionDeadline', submissionDeadline);
        formData.append('classId', classId);
        if (file) formData.append('file', file);
    
        try {
            const response = await fetch(`http://127.0.0.1:5004/api/${courseId}/add-assignment`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                alert('Assignment added successfully');
            } else {
                alert(data.message || 'Failed to add assignment');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to add assignment');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4 text-gray-700">Add Assignment</h1>
            <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter assignment title"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium mb-2">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter assignment description"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium mb-2">Deadline</label>
                <input
                    type="datetime-local"
                    value={submissionDeadline}
                    onChange={(e) => setSubmissionDeadline(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium mb-2">Select Class</label>
                <select
    value={classId}
    onChange={(e) => setClassId(e.target.value)} // Update state with selected class ID
    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
    <option value="">Select a class</option>
    {classes.map((cls) => (
        <option key={cls._id} value={cls._id}>
            {cls.title}
        </option>
    ))}
</select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium mb-2">Upload File</label>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add Assignment
            </button>
        </form>
    );
};

export default AddAssignment;
