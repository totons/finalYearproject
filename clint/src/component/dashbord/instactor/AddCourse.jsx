import React, { useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../utils/baseUrl';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        enrollLastDate: '',
        skills: '',
        price: 0,
        rating: 0,
        isActive: false,
    });
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = {
            Authorization: `Bearer ${Cookies.get('token')}`,
        };

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('enrollLastDate', formData.enrollLastDate);
        data.append('skills', formData.skills);
        data.append('price', formData.price);
        data.append('rating', formData.rating);
        data.append('images', imageFile);

        try {
            const response = await axios.post(`${getBaseUrl()}/course/add`, data, {
                headers,
            });

            setFormData({
                title: '',
                description: '',
                enrollLastDate: '',
                skills: '',
                price: 0,
                rating: 0,
            });
            setImageFile(null);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Course created successfully!',
                showConfirmButton: false,
                timer: 900,
            });
            navigate('/');

            console.log('Course created:', response.data);
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 bg-white shadow-2xl rounded-lg max-w-xl mx-auto mt-12 space-y-6 transform transition duration-500 hover:shadow-xl">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Add a New Course</h2>

            <label className="block text-gray-700 font-medium">Title</label>
            <input
                name="title"
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter course title"
            />

            <label className="block text-gray-700 font-medium">Image File</label>
            <input
                type="file"
                onChange={handleFileChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />

            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
                name="description"
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter course description"
            ></textarea>

            <label className="block text-gray-700 font-medium">Enroll Last Date</label>
            <input
                type="date"
                name="enrollLastDate"
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />

            <label className="block text-gray-700 font-medium">Skills</label>
            <input
                name="skills"
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter skills covered"
            />

            <label className="block text-gray-700 font-medium">Price</label>
            <input
                type="number"
                name="price"
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter course price"
            />

            <label className="block text-gray-700 font-medium">Rating</label>
            <input
                type="number"
                name="rating"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter course rating"
            />

            <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 transform hover:scale-105"
            >
                Add Course
            </button>
        </form>
    );
};

export default AddCourse;
