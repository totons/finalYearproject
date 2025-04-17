import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import AddCertificateModal from './AddCertificateModal';

const Show = () => {
    const { courseId } = useParams(); // Fetch courseId from URL
    const navigate = useNavigate(); // Add useNavigate hook
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const token = Cookies.get('token');

    // Function to fetch enrolled students
    const fetchEnrolledStudents = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5004/course/courses/${courseId}/students`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setStudents(response.data.enrolledStudents);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch enrolled students.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch students when the component mounts or when courseId changes
    useEffect(() => {
        fetchEnrolledStudents();
    }, [courseId]);

    const openModal = (studentId) => {
        setSelectedStudentId(studentId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStudentId(null);
    };

    const refreshStudentsList = () => {
        fetchEnrolledStudents();
        closeModal();
    };

    // Function to navigate to statistics page
    const viewStatistics = () => {
        navigate(`/dashboard/student-statistics/${courseId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6">
            <div className="mb-4 flex justify-center">
                <h1 className="text-2xl font-bold mb-4">Enrolled Students</h1>
                <div className="mb-4">
                    <button className="px-4 flex justify-center py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-200">
                        <Link to={`/dashboard/showallclasss/${courseId}`} className="text-white hover:underline">
                            View Class
                        </Link>
                    </button>
                </div>
            </div>
            
            {/* Add button for student statistics */}
            <div className="mb-4 flex justify-center">
                <button 
                    onClick={viewStatistics}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 hover:shadow-lg transition duration-200"
                >
                    View Student Statistics
                </button>
            </div>
            
            {students.length > 0 ? (
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border text-left">Image</th>
                            <th className="px-4 py-2 border text-left">Full Name</th>
                            <th className="px-4 py-2 border text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id} className="border-b">
                                <td className="px-4 py-2 text-center">
                                    <img
                                        src={student.image}
                                        alt={student.name}
                                        className="w-12 h-12 object-cover rounded-full"
                                    />
                                </td>
                                <td className="px-4 py-2">{student.fullname}</td>
                                <td className="px-4 py-2">{student.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No students are enrolled in this course yet.</p>
            )}

            {isModalOpen && selectedStudentId && (
                <AddCertificateModal
                    courseId={courseId}
                    studentId={selectedStudentId}
                    onClose={closeModal}
                    onSubmit={refreshStudentsList}
                />
            )}
        </div>
    );
};

export default Show;