import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../utils/baseUrl';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

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
        return <div className="text-center text-lg font-semibold">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    return (
        <div className="overflow-x-auto p-6 bg-gray-50 shadow-lg rounded-lg max-w-6xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Pending Courses</h2>
            <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="border px-6 py-3">Title</th>
                        <th className="border px-6 py-3">Instructor</th>
                        <th className="border px-6 py-3">Price</th>
                        <th className="border px-6 py-3">Skills</th>
                        <th className="border px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingCourses.map((course) => (
                        <tr key={course._id} className="bg-white hover:bg-gray-100 transition-colors duration-300">
                            <td className="border px-6 py-4 cursor-pointer" onClick={() => openModal(course)}>
                                {course.title}
                            </td>
                            <td
    className="border px-6 py-4 cursor-pointer"
    onClick={() => openModal2(course.instructor)}
>
    {course.instructor?.fullname || 'Unknown Instructor'}
</td>
                            <td className="border px-6 py-4 text-center font-semibold text-green-500">${course.price}</td>
                            <td className="border px-6 py-4 text-center">{course.skills}</td>
                            <td className="border px-6 py-4 text-center">
                                <button
                                    onClick={() => handlePublish(course._id)}
                                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                                >
                                    Publish
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for displaying course details */}
            <dialog id="courseModal" className="modal">
                <div className="modal-box p-8 bg-white rounded-lg shadow-lg">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {selectedCourse && (
                        <>
                            <h3 className="font-bold text-xl text-gray-800">Course Title: {selectedCourse.title}</h3>
                            <p className="py-2 text-gray-700">Price: ${selectedCourse.price}</p>
                            <p className="py-2 text-gray-700">Skills: {selectedCourse.skills}</p>
                            <p className="py-2 text-gray-700">Description: {selectedCourse.description}</p>
                        </>
                    )}
                </div>
            </dialog>

            {/* Modal for displaying instructor details */}
            <dialog id="courseModal2" className="modal">
                <div className="modal-box p-8 bg-white rounded-lg shadow-lg">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {selectedInstructor && (
                        <>
                            <img src={selectedInstructor.image} alt="Instructor" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-600" />
                            <h3 className="font-bold text-xl text-center"></h3>
                            <p className="py-2 text-center text-gray-600">Email: {selectedInstructor.email}</p>
                            <p className="py-2 text-center text-gray-600">Bio: {selectedInstructor.aboutUs || 'No bio available'}</p>

                            <h4 className="font-semibold text-md mt-4 text-gray-800">Skills: {selectedInstructor.skills || 'No skills listed'}</h4>
                            <h4 className="font-semibold text-md mt-4 text-gray-800">
                                GitHub:{' '}
                                {selectedInstructor.githubLink ? (
                                    <Link
                                        to={selectedInstructor.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {selectedInstructor.githubLink}
                                    </Link>
                                ) : (
                                    'No GitHub link available'
                                )}
                            </h4>

                            <h4 className="font-semibold text-md mt-4 text-gray-800">
                                LinkedIn:{' '}
                                {selectedInstructor.linkedInLink ? (
                                    <Link
                                        to={selectedInstructor.linkedInLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {selectedInstructor.linkedInLink}
                                    </Link>
                                ) : (
                                    'No LinkedIn link available'
                                )}
                            </h4>
                        </>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default PendingCourse;
