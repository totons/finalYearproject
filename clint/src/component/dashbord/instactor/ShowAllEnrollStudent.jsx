import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import AddCertificateModal from './AddCertificateModal';  // Import the modal component
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const ShowAllEnrollStudent = () => {
    const { courseId } = useParams(); // Fetch courseId from URL
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state
    const [selectedStudentId, setSelectedStudentId] = useState(null); // Store selected student ID
    const token = Cookies.get('token');




    const downloadPDF = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5004/course/download-pdf/${courseId}`, {
                responseType: 'blob', // Important for handling file download
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Enrolled_Students.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };



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
        setSelectedStudentId(studentId); // Set the selected student ID
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedStudentId(null); // Clear selected student ID
    };

    const refreshStudentsList = () => {
        // Call fetchEnrolledStudents again to refresh the list
        fetchEnrolledStudents();
        closeModal(); // Close the modal after submitting
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6">
            <div className="mb-4 flex justify-center">
                <h1 className="text-2xl font-bold mb-4">Enrolled Students</h1>
                <div className="mb-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                        <Link to={`/dashboard/addclass/${courseId}`}>Add Class</Link>
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded">
                        <Link to={`/dashboard/addassigment/${courseId}`}>Add Assignment</Link>
                    </button>
                </div>
                  {/* <button className="px-4 flex justify-center  py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-200">
                    <Link to={`/dashboard/showallclasss/${courseId}`} className="text-white hover:underline">
                        View Class
                    </Link>
                </button> */}
            </div>
            {students.length > 0 ? (
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border text-left">Image</th>
                            <th className="px-4 py-2 border text-left">Full Name</th>
                            <th className="px-4 py-2 border text-left">Email</th>
                            <th className="px-4 py-2 border text-left">Action</th>
                            <th className="px-4 py-2 border text-left">Certificate</th>
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
                                <td className="px-4 py-2">
                                    <Link
                                        to={`/dashboard/enrollsetudent/${courseId}/student/${student._id}`}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Show Assignments
                                    </Link>
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => openModal(student._id)} // Open modal and pass student ID
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Add Certificate
                                    </button>
                                </td>
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
                    studentId={selectedStudentId} // Pass selected student ID
                    onClose={closeModal}
                    onSubmit={refreshStudentsList} // Refresh list after adding certificate
                />
            )}



<div className='flex'>
<button
                onClick={downloadPDF}
                className="bg-green-500 text-white px-4 py-2 rounded mx-auto mt-4"
            >
                Download PDF
            </button>
</div>
        </div>
    );
};

export default ShowAllEnrollStudent;
