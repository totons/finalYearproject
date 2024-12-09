import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const EnrollmentClass = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            const token = Cookies.get('token');
            try {
                // Make API call to fetch enrolled courses
                const response = await axios.get('http://127.0.0.1:5004/user/course', {
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

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-4">Error: {error}</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Enrolled Courses</h1>
            {courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300"
                        >
                            <img
                                src={course.images || 'https://via.placeholder.com/150'}
                                alt={course.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h2>
                                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                                
                            
                                <div className='flex justify-center '>
                                <button className="px-4 flex justify-center  py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-200">
    <Link to={`/dashboard/showallclass/${course._id}`} className="text-white hover:underline">
        View Class
    </Link>
</button>
                                </div>
                            </div>


                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-700 mt-4">You are not enrolled in any courses yet. </p>
            )}
        </div>
    );
};

export default EnrollmentClass;
