import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../utils/baseUrl';
import { Link } from 'react-router-dom';
import { BookOpen, Users, DollarSign, Star, Calendar, AlertCircle, Loader } from 'lucide-react';

const ShowAllClass = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${getBaseUrl()}/course/`)
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCourses(response.data);
                } else {
                    setCourses([]); 
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
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
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-4">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
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
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 mt-5">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                        Active Courses
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">Review and publish courses awaiting approval</p>
                    <div className="mt-4 inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                        {courses.length} Course{courses.length !== 1 ? 's' : ''} Active
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-center whitespace-nowrap text-base font-semibold">#</th>
                                    <th className="px-6 py-4 text-center whitespace-nowrap text-base font-semibold">Course Title</th>
                                    <th className="px-6 py-4 text-center whitespace-nowrap text-base font-semibold">Price</th>
                                    <th className="px-6 py-4 text-center whitespace-nowrap text-base font-semibold">Rating</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Skills</th>
                                    <th className="px-6 py-4 text-center whitespace-nowrap text-base font-semibold">Enrollment Deadline</th>
                                    <th className="px-6 py-4 text-center whitespace-nowrap text-base font-semibold">Status</th>
                                    <th className="px-6 py-4 text-center whitespace-nowrap text-base font-semibold">Students</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {Array.isArray(courses) && courses.length > 0 ? (
                                    courses.map((course, index) => (
                                        <tr key={course._id} className="hover:bg-indigo-50 transition duration-200">
                                            <td className="px-6 py-4 text-center whitespace-nowrap text-base font-medium text-gray-900">{index + 1}</td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap text-base font-medium text-gray-900">{course.title}</td>
                                            <td className="px-6 py-4 text-center text-sm font-bold text-green-600">${course.price}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap text-base text-gray-600">
                                                <div className="flex flex-wrap gap-2">
                                                    {Array.isArray(course.skills) ? 
                                                        course.skills.map((skill, idx) => (
                                                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-base rounded-full">
                                                                {skill}
                                                            </span>
                                                        ))
                                                        : <span className="text-xs">{course.skills}</span>
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 text-center">
                                                {new Date(course.enrollLastDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-sm  whitespace-nowrap  font-semibold ${
                                                    course.isactive 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {course.isactive ? '✓ Published' : '○ Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Link to={`/dashboard/enrollsetudent/${course._id}`}>
                                                    <button className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:from-indigo-700 hover:to-blue-700 transition duration-300">
                                                        <Users className="w-4 h-4" />
                                                        {course.enrolledStudents.length}
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center">
                                            <div className="text-gray-500">
                                                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                                <p className="text-lg font-medium">No courses available</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {Array.isArray(courses) && courses.length > 0 ? (
                        courses.map((course, index) => (
                            <div key={course._id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300">
                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-lg line-clamp-2">{course.title}</h3>
                                        <span className="text-2xl font-bold">{index + 1}</span>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4 space-y-3">
                                    {/* Price */}
                                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <DollarSign className="w-4 h-4" />
                                            <span className="text-sm">Price</span>
                                        </div>
                                        <span className="text-xl font-bold text-green-600">${course.price}</span>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm">Rating</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{course.rating}</span>
                                    </div>

                                    {/* Skills */}
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="text-xs font-semibold text-gray-600 mb-2">Skills</div>
                                        <div className="flex flex-wrap gap-2">
                                            {Array.isArray(course.skills) ? 
                                                course.skills.map((skill, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                                        {skill}
                                                    </span>
                                                ))
                                                : <span className="text-xs text-gray-600">{course.skills}</span>
                                            }
                                        </div>
                                    </div>

                                    {/* Enrollment Date */}
                                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">Deadline</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                            {new Date(course.enrollLastDate).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Status</span>
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                            course.isactive 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {course.isactive ? '✓ Published' : '○ Inactive'}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <Link to={`/dashboard/enrollsetudent/${course._id}`}>
                                    <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 font-semibold hover:from-indigo-700 hover:to-blue-700 transition duration-300 flex items-center justify-center gap-2">
                                        <Users className="w-4 h-4" />
                                        View Enrolled Students ({course.enrolledStudents.length})
                                    </button>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white rounded-xl shadow-md p-8 text-center">
                            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                            <p className="text-gray-600 font-medium">No courses available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShowAllClass;