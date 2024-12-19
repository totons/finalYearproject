import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const ShowAssignment = () => {
    const { courseId, studentId } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [marks, setMarks] = useState({});
    const [submittedMarks, setSubmittedMarks] = useState({});
    const [total, setTotal] = useState(0); // Adjust this to store a number
    const [showResults, setShowResults] = useState(false); // State to trigger the total marks fetch
    const token = Cookies.get('token');
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchTotalMarks = async () => {
            if (studentId && courseId) {
                try {
                    const response = await axios.get(
                        `http://127.0.0.1:5004/user/${studentId}/${courseId}`
                    );
                    setTotal(response.data.totalMark || 0); // Assuming response.data.totalMark contains the total
                } catch (err) {
                    setError(err.response?.data?.message || 'Failed to fetch student marks.');
                }
            }
        };

        if (showResults) {
            fetchTotalMarks();
        }
    }, [studentId, courseId, showResults]); // This will trigger when the button is clicked

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

            <div className="mt-4 bg-gray-100 p-4 rounded">
                <button
                    onClick={() => setShowResults(true)}
                    className="text-white bg-blue-500 p-2 rounded hover:bg-blue-600"
                >
                    Show Result
                </button>
                <div className="mt-4">
                    <strong>Total Marks for Course:</strong> {total}
                </div>
            </div>
        </div>
    );
};

export default ShowAssignment;
