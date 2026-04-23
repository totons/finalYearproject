import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../utils/baseUrl';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { Loader } from 'lucide-react';

const PendingCourse = () => {
    const [pendingCourses, setPendingCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedInstructor, setSelectedInstructor] = useState(null);

    useEffect(() => {
        const fetchPendingCourses = async () => {
            const token = Cookies.get('token');

            try {
                const response = await axios.get(`${getBaseUrl()}/course/pending`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setPendingCourses(response.data);
            } catch (err) {
                setError('Failed to fetch pending courses.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPendingCourses();
    }, []);

    const handlePublish = async (courseId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.patch(`${getBaseUrl()}/course/publish/${courseId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setPendingCourses((prevCourses) =>
                    prevCourses.filter((course) => course._id !== courseId)
                );
            }
        } catch (err) {
            console.error('Failed to publish the course:', err);
            setError('Failed to publish the course.');
        }
    };

    const openModal = (course) => {
        setSelectedCourse(course);
        document.getElementById('courseModal').showModal();
    };

    const openModal2 = (instructor) => {
        setSelectedInstructor(instructor);
        document.getElementById('courseModal2').showModal();
    };

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
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <p className="text-red-600 text-lg font-semibold">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                        Pending Courses
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">Review and publish courses awaiting approval</p>
                    <div className="mt-4 inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                        {pendingCourses.length} Course{pendingCourses.length !== 1 ? 's' : ''} Pending
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className=" bg-white rounded-2xl  overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-center whitespace-nowrap text-sm font-bold uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-4 text-center whitespace-nowrap text-sm font-bold uppercase tracking-wider">Instructor</th>
                                    <th className="px-6 py-4 text-center whitespace-nowrap text-sm font-bold uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-center whitespace-nowrap text-sm font-bold uppercase tracking-wider">Skills</th>
                                    <th className="px-6 py-4 text-center whitespace-nowrap text-sm font-bold uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {pendingCourses.map((course, index) => (
                                    <tr 
                                        key={course._id} 
                                        className={`hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                    >
                                        <td 
                                            className="px-6 py-4 cursor-pointer text-blue-600 hover:text-blue-800 font-medium text-center whitespace-nowrap"
                                            onClick={() => openModal(course)}
                                        >
                                            {course.title}
                                        </td>
                                        <td
                                            className="px-6 py-4 cursor-pointer text-gray-700 hover:text-blue-600 text-center whitespace-nowrap"
                                            onClick={() => openModal2(course.instructor)}
                                        >
                                            {course.instructor?.fullname || 'Unknown Instructor'}
                                        </td>
                                        <td className="px-6 py-4  font-bold text-green-600 text-center whitespace-nowrap">
                                            ৳ {course.price}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm text-center whitespace-nowrap">
                                                {course.skills}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            <button
                                                onClick={() => handlePublish(course._id)}
                                                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                                            >
                                                Publish
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Card View */}
                {/* <div className="lg:hidden space-y-4">
                    {pendingCourses.map((course) => (
                        <div key={course._id} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 
                                        className="text-lg font-bold text-blue-600 cursor-pointer hover:text-blue-800 mb-2"
                                        onClick={() => openModal(course)}
                                    >
                                        {course.title}
                                    </h3>
                                    <p 
                                        className="text-sm text-gray-600 cursor-pointer hover:text-blue-600"
                                        onClick={() => openModal2(course.instructor)}
                                    >
                                        👨‍🏫 {course.instructor?.fullname || 'Unknown Instructor'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-green-600">${course.price}</p>
                                </div>
                            </div>
                            
                            <div className="pt-2 border-t border-gray-200">
                                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {course.skills}
                                </span>
                            </div>

                            <button
                                onClick={() => handlePublish(course._id)}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                Publish Course
                            </button>
                        </div>
                    ))}
                </div> */}

                {/* Empty State */}
                {pendingCourses.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">All Caught Up!</h3>
                        <p className="text-gray-600">No pending courses at the moment.</p>
                    </div>
                )}
            </div>

            {/* Modal for displaying course details */}
            <dialog id="courseModal" className="modal">
                <div className="modal-box max-w-2xl p-0 bg-white rounded-2xl shadow-2xl overflow-y-auto">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-10 bg-white hover:bg-gray-100">✕</button>
                    </form>
                    {selectedCourse && (
                        <div className="p-4 lg:p-8">
                            <div className="mb-6">
                                <h3 className="text-xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
                                    {selectedCourse.title}
                                </h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                                    <span className="text-2xl">💰</span>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Price</p>
                                        <p className="text-xl font-bold text-green-600">৳ {selectedCourse.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                                    <span className="text-2xl">🎯</span>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Skills</p>
                                        <p className="text-lg font-semibold text-gray-800">{selectedCourse.skills}</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-sm text-gray-600 font-medium mb-2">📝 Description</p>
                                    <p className="text-gray-700 leading-relaxed">{selectedCourse.description}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </dialog>

            {/* Modal for displaying instructor details */}
            <dialog id="courseModal2" className="modal">
                <div className="modal-box max-w-3xl p-0 overflow-y-auto  bg-white rounded-2xl shadow-2xl ">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-10 bg-white hover:bg-gray-100">✕</button>
                    </form>
                    {selectedInstructor && (
                        <div className="p-8">
                            <div className="text-center mb-6">
                                <img 
                                    src={selectedInstructor.image} 
                                    alt="Instructor" 
                                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-600 shadow-lg object-cover"
                                />
                                <h3 className="text-2xl font-bold text-gray-800">{selectedInstructor.fullname}</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 rounded-xl">
                                    <p className="text-sm text-gray-600 font-medium mb-1">📧 Email</p>
                                    <p className="text-gray-800">{selectedInstructor.email}</p>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-sm text-gray-600 font-medium mb-1">📝 Bio</p>
                                    <p className="text-gray-700">{selectedInstructor.aboutUs || 'No bio available'}</p>
                                </div>

                                <div className="p-4 bg-purple-50 rounded-xl">
                                    <p className="text-sm text-gray-600 font-medium mb-1">🎯 Skills</p>
                                    <p className="text-gray-800">{selectedInstructor.skills || 'No skills listed'}</p>
                                </div>

                                {(selectedInstructor.githubLink || selectedInstructor.linkedInLink) && (
                                    <div className="p-4 bg-indigo-50 rounded-xl space-y-3">
                                        <p className="text-sm text-gray-600 font-medium">🔗 Social Links</p>
                                        
                                        {selectedInstructor.githubLink && (
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">GitHub</p>
                                                <Link
                                                    to={selectedInstructor.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                                                >
                                                    {selectedInstructor.githubLink}
                                                </Link>
                                            </div>
                                        )}

                                        {selectedInstructor.linkedInLink && (
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">LinkedIn</p>
                                                <Link
                                                    to={selectedInstructor.linkedInLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                                                >
                                                    {selectedInstructor.linkedInLink}
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default PendingCourse;