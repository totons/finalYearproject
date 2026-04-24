import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, AlertCircle, Loader } from 'lucide-react';
import { getBaseUrl } from '../../../utils/baseUrl';

const EnrollmentClass = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            const token = Cookies.get('token');
            try {
                const response = await axios.get(`${getBaseUrl()}/user/course`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCourses(response.data.enrolledCourses);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch enrolled courses.');
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-700">Loading your courses...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-4">
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
                    <div className="flex items-center gap-3 mb-3">
                        <AlertCircle className="w-6 h-6 text-red-500" />
                        <h3 className="text-lg font-semibold text-red-600">Error</h3>
                    </div>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
            <div className=" mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            My Enrolled Courses
                        </h1>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                        Continue your learning journey with these courses
                    </p>
                    {courses.length > 0 && (
                        <div className="mt-4 inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                            {courses.length} Course{courses.length !== 1 ? 's' : ''} Enrolled
                        </div>
                    )}
                </div>

                {/* Courses Grid */}
                {courses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {courses.map((course, index) => (
                            <div
                                key={course._id}
                                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 overflow-hidden border border-gray-200"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden h-48 sm:h-56 bg-gray-200">
                                    <img
                                        src={course.images || 'https://via.placeholder.com/400x300?text=Course+Image'}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition duration-300"></div>
                                    <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                        Active
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="p-5 sm:p-6">
                                    {/* Title */}
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition duration-300">
                                        {course.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {course.description || 'Continue learning and master this course'}
                                    </p>

                                    {/* Course Meta */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                                            <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></div>
                                            <span className="font-medium">Ready to Continue</span>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <Link to={`/dashboard/showallclass/${course._id}`} className="block">
                                        <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center gap-2 group/btn">
                                            View Class
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition duration-300" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center max-w-md w-full border border-gray-200">
                            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                                No Courses Yet
                            </h3>
                            <p className="text-gray-600 mb-6">
                                You haven't enrolled in any courses yet. Explore and enroll in courses to start learning.
                            </p>
                            <Link to="/courses" className="inline-block">
                                <button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg transition duration-300 flex items-center gap-2 mx-auto">
                                    Explore Courses
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnrollmentClass;