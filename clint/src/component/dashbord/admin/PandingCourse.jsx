import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../utils/baseUrl';
import Cookies from 'js-cookie';

const PandingCourse = () => {
    const [pendingCourses, setPendingCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPendingCourses = async () => {
            const token = Cookies.get('token'); // Use your actual token name

            try {
                const response = await axios.get(`${getBaseUrl()}/course/pending`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token in the headers
                    },
                });
                setPendingCourses(response.data); // Assuming response.data contains the list of pending courses
            } catch (err) {
                setError('Failed to fetch pending courses.'); // Set error message
                console.error(err);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchPendingCourses();
    }, []); // Empty dependency array means this effect runs once on mount

    const handlePublish = async (courseId) => {
        const token = Cookies.get('token'); // Use your actual token name

        try {
            const response = await axios.patch(`${getBaseUrl()}/course/publish/${courseId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include token in the headers
                },
            });
            if (response.status === 200) {
                // Update the pendingCourses state to reflect the change
                setPendingCourses((prevCourses) =>
                    prevCourses.filter((course) => course._id !== courseId)
                );
            }
        } catch (err) {
            console.error('Failed to publish the course:', err);
            setError('Failed to publish the course.'); // Set error message
        }
    };

    if (loading) {
        return <div className="text-center text-lg font-semibold">Loading...</div>; // Show loading indicator
    }

    if (error) {
        return <div className="text-center text-red-600">{error}</div>; // Show error message if any
    }

    return (
        <div className="overflow-x-auto p-6 bg-gray-50 shadow-lg rounded-lg max-w-6xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Pending Courses</h2>
            <table className="table-auto w-full border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Instructor</th>
                        <th className="border px-4 py-2">Price</th>
                        {/* <th className="border px-4 py-2">Rating</th> */}
                        <th className="border px-4 py-2">Skills</th>
                        {/* <th className="border px-4 py-2">Enroll Last Date</th> */}
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingCourses.map((course) => (
                        <tr key={course._id} className="bg-white hover:bg-gray-100">
                            <td className="border px-4 py-2">{course.title}</td>
                            <td className="border px-4 py-2">{course.instructor.fullname || 'Unknown Instructor'}</td>
                            <td className="border px-4 py-2">${course.price}</td>
                            {/* <td className="border px-4 py-2">{course.rating}</td> */}
                            <td className="border px-4 py-2">{course.skills}</td> {/* Display skills as a comma-separated list */}
                            {/* <td className="border px-4 py-2">{new Date(course.enrollLastDate).toLocaleDateString()}</td> */}
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handlePublish(course._id)}
                                    className="bg-blue-500 text-white font-semibold py-1 px-3 rounded hover:bg-blue-600 transition-colors duration-200"
                                >
                                    Publish
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PandingCourse;
