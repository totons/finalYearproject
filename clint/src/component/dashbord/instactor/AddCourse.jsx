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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white  rounded-2xl max-w-5xl mx-auto p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8"
            >
                {/* Header */}
                <div className="text-center pb-4 border-b border-gray-200">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                        Add a New Course
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">Fill in the course details below</p>
                </div>

                {/* Title & Image File Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                            Course Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="title"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                            placeholder="e.g., Web Development Bootcamp"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                            Course Image <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            required
                            className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base file:mr-3 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="w-full">
                    <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base"
                        placeholder="Provide a comprehensive description of the course..."
                    ></textarea>
                </div>

                {/* Enroll Last Date & Skills Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                            Enrollment Deadline <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="enrollLastDate"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                            Skills Covered <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="skills"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                            placeholder="e.g., HTML, CSS, JavaScript, React"
                        />
                    </div>
                </div>

                {/* Price & Rating Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                            Price <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm sm:text-base">$</span>
                            <input
                                type="number"
                                name="price"
                                onChange={handleChange}
                                required
                                className="w-full pl-8 sm:pl-10 pr-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                                placeholder="Enter course price"
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                            Rating
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                name="rating"
                                onChange={handleChange}
                                className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                                placeholder="e.g., 4.5"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-500 text-lg">★</span>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full py-3.5 sm:py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-sm sm:text-base"
                    >
                        Create Course
                    </button>
                </div>

                {/* Footer Note */}
                <p className="text-center text-gray-500 text-xs sm:text-sm pt-2">
                    <span className="text-red-500">*</span> Required fields
                </p>
            </form>
        </div>
    );
};

export default AddCourse;