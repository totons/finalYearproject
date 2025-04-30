import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { AuthContext } from '../../../provider/AuthProvider';

const Result = () => {
    const { courseId, studentId } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [assignmentMarks, setAssignmentMarks] = useState([]);
    const [totalAssignmentMark, setTotalAssignmentMark] = useState(0);
    const [writtenMark, setWrittenMark] = useState(0);
    const [attendanceMark, setAttendanceMark] = useState(0);
    const [additionalMarksLoaded, setAdditionalMarksLoaded] = useState(false);
    const [CertificateData, setCertificateData] = useState();
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchEnrolledStudents = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:5004/course/courses/${courseId}/students`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setStudents(response.data.classes);
                console.log(`this is ${response.data.classes}`);
                
                // Collect all assignment marks for this student
                const marks = [];
                response.data.classes.forEach((studentClass) => {
                    studentClass.assignments.forEach((assignment) => {
                        assignment.submissions.forEach((submission) => {
                            if (submission.student === studentId && submission.mark != null) {
                                marks.push(submission.mark);
                            }
                        });
                    });
                });
                
                // Sort marks in descending order
                marks.sort((a, b) => b - a);
                setAssignmentMarks(marks);
                
                // Calculate average of top two assignments (or just the one if only one exists)
                let assignmentTotal = 0;
                if (marks.length > 0) {
                    if (marks.length >= 2) {
                        // Average of top two scores
                        assignmentTotal = (marks[0] + marks[1]) / 2;
                    } else {
                        // Only one assignment
                        assignmentTotal = marks[0];
                    }
                }
                
                setTotalAssignmentMark(assignmentTotal);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch enrolled students.');
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledStudents();
    }, [courseId, studentId, token]);

    useEffect(() => {
        const fetchAdditionalMarks = async () => {
            if (studentId && courseId) {
                try {
                    const response = await axios.get(
                       `http://127.0.0.1:5004/course/${courseId}/${studentId}`
                    );
                    
                    console.log(`data ${response}`);
                    setWrittenMark(response.data.writtenMark || 0);
                    setAttendanceMark(response.data.attendanceMark || 0);
                    setAdditionalMarksLoaded(true);
                } catch (err) {
                    if (err.response?.status === 404) {
                        // This is normal for new students - just set defaults
                        setWrittenMark(0);
                        setAttendanceMark(0);
                        console.log("No existing marks found for this student - this is normal for new students");
                    } else {
                        console.error('Error fetching additional marks:', err);
                    }
                    setAdditionalMarksLoaded(true);
                }
            }
        };
    
        fetchAdditionalMarks();
    }, [courseId, studentId]);

    useEffect(() => {
        const fetchCertificateData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:5004/api/certificate/certificates/${courseId}/${studentId}`
                );
                console.log('Certificate Data:', response.data);
                setCertificateData(response.data);
            } catch (err) {
                console.error('Error fetching certificate data:', err);
            }
        };

        fetchCertificateData();
    }, [courseId, studentId]);

    // Calculate total marks (assignment average + written + attendance)
    const calculateTotalMarks = () => {
        return totalAssignmentMark + writtenMark + attendanceMark;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    const totalMarks = calculateTotalMarks();
    
    return (
        <div className="p-4">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 text-left">Class Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Assignment Title</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Submission</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Mark</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((studentClass) =>
                        studentClass.assignments.length > 0 ? (
                            studentClass.assignments.map((assignment) => (
                                <tr key={assignment._id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{studentClass.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{assignment.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {assignment.submissions?.length > 0 ? (
                                            assignment.submissions.map((submission) => (
                                                submission.student === studentId ? (
                                                    <div key={submission._id}>
                                                        <Link
                                                            to={`http://localhost:5004/dashboard/showallclass/${submission.fileUrl}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500"
                                                        >
                                                            View Submission
                                                        </Link>
                                                    </div>
                                                ) : null
                                            ))
                                        ) : (
                                            <span className="text-red-500">No submission yet.</span>
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {assignment.submissions.length > 0 ? (
                                            assignment.submissions.map((submission) => 
                                                submission.student === studentId && submission.mark != null && submission.mark !== 0 ? (
                                                    <span 
                                                        key={submission._id} 
                                                        className={submission.mark >= 40 ? "text-green-600 font-bold" : "text-red-600 font-bold"}
                                                    >
                                                        {submission.mark}
                                                    </span>
                                                ) : null
                                            )
                                        ) : (
                                            <span className="text-gray-500">No mark assigned</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : null
                    )}
                </tbody>
            </table>

            <div className="mt-[30px]">
                <div className="mt-4 space-y-2">
                    {/* <div><strong>Assignment Marks:</strong> {assignmentMarks.join(', ')}</div> */}
                    <div><strong>Assignment Average </strong> {totalAssignmentMark.toFixed(2)}</div>
                    <div><strong>Written Mark:</strong> {writtenMark}</div>
                    <div><strong>Attendance Mark:</strong> {attendanceMark}</div>
                    <div className="pt-2 text-lg font-bold border-t border-gray-300">
                        <strong>Total Marks for Course:</strong> {totalMarks.toFixed(2)}
                        <span className={totalMarks >= 40 ? 'text-green-600 ml-2' : 'text-red-600 ml-2'}>
                            ({totalMarks >= 40 ? 'Pass' : 'Fail'})
                        </span>
                    </div>
                </div>
            </div>
           
            <div className='flex justify-center'>
                {CertificateData && (
                    <Link 
                        className="inline-block px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all" 
                        target='_blank' 
                        to={`${CertificateData.image}`}
                    >
                        Download Certificate
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Result;