import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../utils/baseUrl';

const ShowAllClass = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch courses from the API
    useEffect(() => {
        axios.get(`${getBaseUrl()}/course/`)
            .then(response => {
                console.log('API response data:', response.data); // Log the data to inspect
                if (Array.isArray(response.data)) {
                    setCourses(response.data);
                } else {
                    console.warn('Expected array but received:', response.data);
                    setCourses([]); // Fallback to an empty array
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Handle loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">All Courses</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="p-4">#</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Rating</th>
                            <th className="p-4">Skills</th>
                            <th className="p-4">Enrollment Last Date</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(courses) && courses.length > 0 ? (
                            courses.map((course, index) => (
                                <tr key={course._id} className="border-b hover:bg-gray-100 transition-colors">
                                    <td className="p-4 text-center font-semibold text-gray-700">{index + 1}</td>
                                    <td className="p-4 font-medium text-gray-800">{course.title}</td>
                                    <td className="p-4 text-center text-green-600 font-bold">${course.price}</td>
                                    <td className="p-4 text-center text-yellow-500 font-medium">{course.rating}</td>
                                    <td className="p-4 text-center text-yellow-500 font-medium">
                                        {Array.isArray(course.skills) ? course.skills.join(', ') : course.skills}
                                    </td>
                                    <td className="p-4 text-center text-gray-700">
                                        {new Date(course.enrollLastDate).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-white ${course.isactive ? 'bg-green-500' : 'bg-red-500'}`}>
                                            {course.isactive ? "Published" : "Inactive"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="p-4 text-center text-gray-500">No courses available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShowAllClass;
