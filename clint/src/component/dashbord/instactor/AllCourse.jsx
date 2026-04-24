import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import axios from 'axios';
import { getBaseUrl } from '../../../utils/baseUrl';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';

const AllCourse = () => {
    const { user } = useContext(AuthContext);
    console.log(user.courses)
    const [courses, setCourses] = useState([]);
    const token = Cookies.get('token');
    const navigate = useNavigate()
 
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                if (user.courses && user.courses.length > 0) {
                    setCourses(user.courses);
                } 
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        
        fetchCourses();
    }, [user]);

    const handleUpdate = (courseId) => {
        console.log("Update course with ID:", courseId);
        navigate(`/dashboard/courses/update/${courseId}`);
    };

    const handleDelete = async (courseId) => {
        console.log("Attempting to delete course with ID:", courseId);
       
        try {
            await axios.delete(`${getBaseUrl()}/course/${courseId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Course deleted successfully",
                showConfirmButton: false,
                timer: 1500
            });
            
            setCourses(courses.filter(course => course._id !== courseId));
            console.log("Deleted course with ID:", courseId);
        } catch (error) {
            console.error("Error deleting course:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to delete course",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
            <div className=" mx-auto">
                {/* Header Section with Stats */}
                <div className="mb-8">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 tracking-tight">
                            Course Management
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg">Manage and monitor all your courses in one place</p>
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white shadow transform hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium mb-1">Total Courses</p>
                                    <p className="text-3xl sm:text-4xl font-bold">{courses.length}</p>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-full p-3">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm font-medium mb-1">Published</p>
                                    <p className="text-3xl sm:text-4xl font-bold">{courses.filter(c => c.isactive).length}</p>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-full p-3">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 sm:p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-100 text-sm font-medium mb-1">Inactive</p>
                                    <p className="text-3xl sm:text-4xl font-bold">{courses.filter(c => !c.isactive).length}</p>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-full p-3">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block bg-white rounded-2xl shadow overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600">
                                    <th className="p-5 text-left font-bold text-white text-sm uppercase tracking-wider">#</th>
                                    <th className="p-5 text-left font-bold text-white text-sm uppercase tracking-wider">Course Title</th>
                                    <th className="p-5 text-left font-bold text-white text-sm uppercase tracking-wider">Skills Covered</th>
                                    <th className="p-5 text-left font-bold text-white text-sm uppercase tracking-wider">Enrollment Deadline</th>
                                    <th className="p-5 text-center font-bold text-white text-sm uppercase tracking-wider">Status</th>
                                    <th className="p-5 text-center font-bold text-white text-sm uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {courses.map((course, index) => (
                                    <tr key={course._id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:via-indigo-50 hover:to-purple-50 transition-all duration-300 group">
                                        <td className="p-5">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm shadow-md">
                                                {index + 1}
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="font-semibold text-gray-900 text-base group-hover:text-indigo-600 transition-colors">
                                                {course.title}
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-wrap gap-1">
                                                {course.skills.split(',').slice(0, 3).map((skill, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                                                        {skill.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-sm font-medium">{new Date(course.enrollLastDate).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="p-5 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${course.isactive ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'}`}>
                                                <span className={`w-2 h-2 rounded-full ${course.isactive ? 'bg-white' : 'bg-white'} animate-pulse`}></span>
                                                {course.isactive === true ? "Published" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            {course.isactive === false ? (
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => handleUpdate(course._id)}
                                                        className="group/btn bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-white px-5 py-2.5 rounded-xl hover:from-amber-500 hover:via-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-sm flex items-center gap-2 transform hover:scale-105"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Update
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(course._id)}
                                                        className="group/btn bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white px-5 py-2.5 rounded-xl hover:from-red-600 hover:via-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-sm flex items-center gap-2 transform hover:scale-105"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Delete
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-center">
                                                    <Link to={`/dashboard/enrollsetudents/${course._id}`}>
                                                        <button className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 text-white px-5 py-2.5 rounded-xl hover:from-blue-600 hover:via-indigo-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-sm flex items-center gap-2 transform hover:scale-105">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                            </svg>
                                                            {course.enrolledStudents.length} Students
                                                        </button>
                                                    </Link>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile/Tablet Card View */}
                <div className="lg:hidden space-y-4">
                    {courses.map((course, index) => (
                        <div key={course._id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100">
                            <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-20 text-white font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${course.isactive ? 'bg-green-400 text-white' : 'bg-red-400 text-white'}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                            {course.isactive === true ? "Published" : "Inactive"}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-white font-bold text-xl leading-tight">{course.title}</h3>
                            </div>
                            
                            <div className="p-5 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-500 text-xs font-semibold mb-1 uppercase tracking-wide">Skills Covered</p>
                                        <div className="flex flex-wrap gap-1">
                                            {course.skills.split(',').map((skill, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                                                    {skill.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-500 text-xs font-semibold mb-1 uppercase tracking-wide">Enrollment Deadline</p>
                                        <p className="text-gray-900 text-sm font-semibold">{new Date(course.enrollLastDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                </div>
                                
                                <div className="pt-4 border-t border-gray-100">
                                    {course.isactive === false ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdate(course._id)}
                                                className="flex-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-3 rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-sm flex items-center justify-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(course._id)}
                                                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-sm flex items-center justify-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    ) : (
                                        <Link to={`/dashboard/enrollsetudents/${course._id}`} className="block">
                                            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-sm flex items-center justify-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                                View {course.enrolledStudents.length} Enrolled Students
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {courses.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-2xl p-12 sm:p-16 text-center border border-gray-100">
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-4">
                                <svg className="w-12 h-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Courses Available</h3>
                        <p className="text-gray-500 text-lg mb-6">Start building your course catalog by creating your first course</p>
                        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
                            Create Your First Course
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllCourse;