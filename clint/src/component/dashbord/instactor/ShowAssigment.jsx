import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const ShowAssignment = () => {
    const { courseId, studentId } = useParams();
    const [students, setStudents] = useState([]);
    console.log()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [marks, setMarks] = useState({});
    const [submittedMarks, setSubmittedMarks] = useState({});
    const [total, setTotal] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [writtenMark, setWrittenMark] = useState(0);
    const [attendanceMark, setAttendanceMark] = useState(0);
    
    const [additionalMarksLoaded, setAdditionalMarksLoaded] = useState(false);
    const token = Cookies.get('token');
    const navigate = useNavigate();
    let x = 0;

    if (Array.isArray(students) && students.length > 0 && students[0].assignments) {
      x = students[0].assignments.length;
    }
    
    console.log('Assignment count:', x);
    // Fetch enrolled students
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
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch enrolled students.');
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledStudents();
    }, [courseId, token]);

    // Fetch additional marks (written and attendance) - separate useEffect to ensure it runs on component load
    useEffect(() => {
        const fetchAdditionalMarks = async () => {
            if (studentId && courseId) {
                try {
                    const response = await axios.get(
                       `http://127.0.0.1:5004/course/${courseId}/${studentId}`
                    );
                    
                    console.log(`dara ${response}`)
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

    // Fetch total marks separately
    useEffect(() => {
        const fetchTotalMarks = async () => {
            if (studentId && courseId) {
                try {
                    const response = await axios.get(
                        `http://127.0.0.1:5004/user/${studentId}/${courseId}`
                    );
                    setTotal(response.data.totalMark || 0);
                } catch (err) {
                    console.error('Error fetching total marks:', err);
                }
            }
        };

        // Fetch total marks on load and when showResults changes
        fetchTotalMarks();
    }, [studentId, courseId, showResults]);

    const handleMarkChange = (submissionId, value) => {
        setMarks((prevMarks) => ({
            ...prevMarks,
            [submissionId]: value,
        }));
    };

    const handleSubmitMark = async (submissionId) => {
        const mark = marks[submissionId];
        if (isNaN(mark) || mark === '') {
            setError('Please enter a valid mark.');
            return;
        }

        try {
            const response = await axios.patch(
                `http://127.0.0.1:5004/api/assignments/submit-mark/${submissionId}/${studentId}`,
                { mark: parseInt(mark, 10) },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setError('');
            alert(response.data.message);
            navigate(`/dashboard/enrollsetudent/${courseId}`);
            setSubmittedMarks((prev) => ({
                ...prev,
                [submissionId]: true,
            }));
            setTotal((prevTotal) => prevTotal + parseInt(mark, 10));
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        }
    };

    const handleWrittenMarkChange = (e) => {
        setWrittenMark(e.target.value);
    };

    const handleAttendanceMarkChange = (e) => {
        setAttendanceMark(e.target.value);
    };

    const handleSubmitAdditionalMarks = async () => {
        if ((isNaN(writtenMark) || writtenMark === '') || (isNaN(attendanceMark) || attendanceMark === '')) {
            setError('Please enter valid marks for written and attendance.');
            return;
        }

        try {
            const response = await axios.post(
                `http://127.0.0.1:5004/course/${courseId}`,
                { 
                    studentId: studentId,
                    writtenMark: parseInt(writtenMark, 10),
                    attendanceMark: parseInt(attendanceMark, 10)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setError('');
            alert('Additional marks submitted successfully');
            
            // Recalculate total
            setTotal((prevTotal) => {
                const assignmentMarks = prevTotal - (parseInt(writtenMark) || 0) - (parseInt(attendanceMark) || 0);
                return assignmentMarks + parseInt(writtenMark, 10) + parseInt(attendanceMark, 10);
            });
            
            setShowResults(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit additional marks.');
        }
    };

    // Calculate assignment marks (total minus additional marks)
    const assignmentMarks = total ;

    // Display loading and error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
                                            assignment.submissions.map((submission) =>
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
                                                        <div className="mt-2">
                                                            {submission.mark > 0 || submittedMarks[submission._id] ? (
                                                                <span>{submission.mark || marks[submission._id]}</span>
                                                            ) : (
                                                                <>
                                                                    <input
                                                                        type="number"
                                                                        placeholder="Enter mark"
                                                                        value={marks[submission._id] || ''}
                                                                        onChange={(e) => handleMarkChange(submission._id, e.target.value)}
                                                                        className="border p-1"
                                                                    />
                                                                    <button
                                                                        onClick={() => handleSubmitMark(submission._id)}
                                                                        className="ml-2 text-white p-1 rounded bg-blue-500 hover:bg-blue-600"
                                                                    >
                                                                        Submit Mark
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : null
                                            )
                                        ) : (
                                            <span className="text-red-500">No submission yet.</span>
                                        )}
                                    </td>

                                    <td className="border border-gray-300 px-4 py-2">
                                        {assignment.submissions.length > 0 ? (
                                            assignment.submissions.map((submission) =>
                                                submission.student === studentId && submission.mark != null ? (
                                                    <span key={submission._id}>{submission.mark}</span>
                                                ) : null
                                            )
                                        ) : (
                                            <span>No mark assigned</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : null
                    )}
                </tbody>
            </table>

            <div className="mt-6 p-4 bg-gray-50 border rounded-md">
                <h3 className="text-lg font-semibold mb-4">Additional Marks</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Written Mark</label>
                        <input
                            type="number"
                            min="0"
                            value={writtenMark}
                            onChange={handleWrittenMarkChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter written mark"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Mark</label>
                        <input
                            type="number"
                            min="0"
                            value={attendanceMark}
                            onChange={handleAttendanceMarkChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter attendance mark"
                        />
                    </div>
                </div>
                <button
                    onClick={handleSubmitAdditionalMarks}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                    Submit Additional Marks
                </button>
            </div>

            <div className="mt-6  bg-gray-100 p-4 rounded">
                <button
                    onClick={() => setShowResults(true)}
                    className="text-white hidden bg-blue-500 p-2 rounded hover:bg-blue-600"
                >
                    Show Result
                </button>
                <div className="mt-4 space-y-2">
                    <div><strong>Assignment Marks:</strong> {(assignmentMarks)/(x)}</div>
                    <div><strong>Written Mark:</strong> {writtenMark}</div>
                    <div><strong>Attendance Mark:</strong> {attendanceMark}</div>
                    {/* <div className="pt-2 text-lg font-bold border-t border-gray-300">
                        <strong>Total Marks for Course:</strong> {total}
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ShowAssignment;