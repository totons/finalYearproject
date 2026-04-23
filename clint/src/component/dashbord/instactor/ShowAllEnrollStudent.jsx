import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import AddCertificateModal from './AddCertificateModal';
import { Users, Download, AlertCircle, Award, Mail, User, FileText, Loader } from 'lucide-react';
import { getBaseUrl } from '../../../utils/baseUrl';

const ShowAllEnrollStudent = () => {
    const { courseId } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [downloadingPDF, setDownloadingPDF] = useState(false);
    const token = Cookies.get('token');

    const downloadPDF = async () => {
        try {
            setDownloadingPDF(true);
            const response = await axios.get(`${getBaseUrl()}/course/download-pdf/${courseId}`, {
                responseType: 'blob',
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
        } finally {
            setDownloadingPDF(false);
        }
    };

    const fetchEnrolledStudents = async () => {
        try {
            const response = await axios.get(`${getBaseUrl()}/course/courses/${courseId}/students`, {
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
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
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
                        Enrolled Students
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">Review and publish courses awaiting approval</p>
                    <div className="mt-4 inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                       Total Students: {students.length}{/* {courses.length} Course{courses.length !== 1 ? 's' : ''} Active */}
                    </div>
                </div>

                {students.length > 0 ? (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden lg:block bg-white rounded-xl shadow overflow-hidden border border-gray-200 mb-8">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-center text-base whitespace-nowrap font-semibold">#</th>
                                            <th className="px-6 py-4 text-center text-base whitespace-nowrap font-semibold">Student</th>
                                            <th className="px-6 py-4 text-center text-base whitespace-nowrap font-semibold">Email</th>
                                            <th className="px-6 py-4 text-center text-base whitespace-nowrap font-semibold">Assignments</th>
                                            <th className="px-6 py-4 text-center text-base whitespace-nowrap font-semibold">Certificate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {students.map((student, index) => (
                                            <tr key={student._id} className="hover:bg-indigo-50 transition duration-200">
                                                <td className="px-6 py-4 text-base text-center font-semibold text-gray-600">{index + 1}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center items-center gap-4">
                                                        <img
                                                            src={student.image}
                                                            alt={student.fullname}
                                                            className="w-10 h-10 object-cover rounded-full ring-2 ring-indigo-200"
                                                        />
                                                        <span className="text-base font-medium text-gray-900">{student.fullname}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center items-center gap-2 text-base text-gray-600">
                                                        <Mail className="w-5 h-5 text-gray-400" />
                                                        {student.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <Link
                                                        to={`/dashboard/enrollsetudent/${courseId}/student/${student._id}`}
                                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition duration-300"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                        View
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => openModal(student._id)}
                                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:from-amber-600 hover:to-amber-700 transition duration-300"
                                                    >
                                                        <Award className="w-4 h-4" />
                                                        Add
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile Card View */}
                        <div className="lg:hidden space-y-4 mb-8">
                            {students.map((student, index) => (
                                <div key={student._id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300">
                                    {/* Card Header */}
                                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center font-bold">
                                                {index + 1}
                                            </div>
                                            <span className="font-semibold">Student #{index + 1}</span>
                                        </div>
                                        <img
                                            src={student.image}
                                            alt={student.fullname}
                                            className="w-12 h-12 object-cover rounded-full ring-2 ring-white"
                                        />
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-4 space-y-3">
                                        {/* Name */}
                                        <div className="flex items-start gap-3">
                                            <User className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase">Full Name</p>
                                                <p className="text-sm font-semibold text-gray-900">{student.fullname}</p>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                                                <p className="text-sm font-semibold text-gray-900 break-all">{student.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Actions */}
                                    <div className="border-t border-gray-200 p-4 space-y-2">
                                        <Link
                                            to={`/dashboard/enrollsetudent/${courseId}/student/${student._id}`}
                                            className=" bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition duration-300 text-center flex items-center justify-center gap-2"
                                        >
                                            <FileText className="w-4 h-4" />
                                            View Assignments
                                        </Link>
                                        <button
                                            onClick={() => openModal(student._id)}
                                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition duration-300 flex items-center justify-center gap-2"
                                        >
                                            <Award className="w-4 h-4" />
                                            Add Certificate
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-200">
                        <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-semibold text-gray-600 mb-2">No Enrolled Students</p>
                        <p className="text-gray-500">No students are enrolled in this course yet.</p>
                    </div>
                )}

                {/* Download PDF Button */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={downloadPDF}
                        disabled={downloadingPDF || students.length === 0}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition duration-300 ${
                            downloadingPDF || students.length === 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg hover:from-green-600 hover:to-green-700'
                        }`}
                    >
                        <Download className="w-5 h-5" />
                        {downloadingPDF ? 'Downloading...' : 'Download PDF'}
                    </button>
                </div>
            </div>

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

export default ShowAllEnrollStudent;