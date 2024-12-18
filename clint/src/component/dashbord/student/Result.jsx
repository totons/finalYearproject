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
    const [marks, setMarks] = useState({});  // Store marks for each submission
    const token = Cookies.get('token');
    const [total,setTotal]=useState(0)
    console.log(total)

    const {user}=useContext(AuthContext);

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

    const handleMarkChange = (submissionId, value) => {
        setMarks((prevMarks) => ({
            ...prevMarks,
            [submissionId]: value,  // Update the mark for a specific submission
        }));
    };

 
    

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
                                    <td className="border border-gray-300 px-4 py-2">
                                        {/* Display the mark from the submission if it's already available */}
                                        {assignment.submissions.length > 0 ? (
                                            assignment.submissions.map((submission) => (
                                                submission.student === studentId && submission.mark != null ? (
                                                    <span key={submission._id}>{submission.mark}</span>
                                                ) : null
                                            ))
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

           

            <div className='flex justify-center mt-[30px]'>
                total mark :{user.totalMark}
            </div>
        </div>
    );
};

export default Result;

