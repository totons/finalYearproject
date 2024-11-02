import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getBaseUrl } from '../../../utils/baseUrl'; // Adjust the path based on your project structure

const ShowAllClass = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/course`);
                setCourses(response.data);
            } catch (err) {
                setError('Failed to fetch courses.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleUnpublish = async (courseId) => {
        const token = Cookies.get('token'); // Adjust token name as needed

        try {
            const response = await axios.patch(`${getBaseUrl()}/course/unpublish/${courseId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setCourses((prevCourses) =>
                    prevCourses.filter((course) => course._id !== courseId)
                );
            }
        } catch (err) {
            console.error('Failed to unpublish the course:', err);
            setError('Failed to unpublish the course.');
        }
    };

    if (loading) {
        return <div className="text-center text-lg font-semibold">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    return (
        <div className="overflow-x-auto p-6 bg-gray-50 shadow-lg rounded-lg max-w-6xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">All Courses</h2>
            <table className="table-auto w-full border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Instructor</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Rating</th>
                        <th className="border px-4 py-2">Skills</th>
                        <th className="border px-4 py-2">Enroll Last Date</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course._id} className="bg-white hover:bg-gray-100">
                            <td className="border px-4 py-2">{course.title}</td>
                            <td className="border px-4 py-2">{course.instructor.fullname || 'Unknown Instructor'}</td>
                            <td className="border px-4 py-2">${course.price}</td>
                            <td className="border px-4 py-2">{course.rating}</td>
                            <td className="border px-4 py-2">{course.skills}</td>
                            <td className="border px-4 py-2">{new Date(course.enrollLastDate).toLocaleDateString()}</td>
                            <td className="border px-4 py-2 flex space-x-2">
                                <button
                                    onClick={() => handleUnpublish(course._id)}
                                    className="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600 transition-colors duration-200"
                                >
                                    Unpublish
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowAllClass;
