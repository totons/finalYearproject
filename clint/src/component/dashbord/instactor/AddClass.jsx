import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddClass = () => {
    const { courseId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        resourcesLink: '',
        classLink: '',
        date: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await axios.post(
                `http://127.0.0.1:5004/api/${courseId}/add-class`, 
                formData
            );
            setSuccess(true);
            setFormData({
                title: '',
                description: '',
                resourcesLink: '',
                classLink: '',
                date: ''
            });
            console.log('Class added successfully:', response.data);
        } catch (err) {
            setError('Failed to add class. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add New Class</h1>

            {success && <div className="bg-green-500 text-white p-2 mb-4">Class added successfully!</div>}
            {error && <div className="bg-red-500 text-white p-2 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                        rows="4"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="resourcesLink" className="block text-sm font-medium">Resources Link</label>
                    <input
                        type="url"
                        id="resourcesLink"
                        name="resourcesLink"
                        value={formData.resourcesLink}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="classLink" className="block text-sm font-medium">Class Link</label>
                    <input
                        type="url"
                        id="classLink"
                        name="classLink"
                        value={formData.classLink}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm font-medium">Date</label>
                    <input
                        type="datetime-local"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full px-4 py-2 text-white rounded ${loading ? 'bg-gray-500' : 'bg-blue-500'} disabled:opacity-50`}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Class'}
                </button>
            </form>
        </div>
    );
};

export default AddClass;

