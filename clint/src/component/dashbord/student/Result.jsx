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
    const [totalMarks, setTotalMarks] = useState(0);
    const token = Cookies.get('token');
   const [CertificateData,setCertificateData] = useState()

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

                // Calculate the total marks
                let total = 0;
                response.data.classes.forEach((studentClass) => {
                    studentClass.assignments.forEach((assignment) => {
                        assignment.submissions.forEach((submission) => {
                            if (submission.student === studentId && submission.mark != null) {
                                total += submission.mark;
                            }
                        });
                    });
                });
                setTotalMarks(total);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch enrolled students.');
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledStudents();
    }, [courseId, studentId, token]);

    useEffect(() => {
        const fetchCertificateData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:5004/api/certificate/certificates/${courseId}/${studentId}`
                );
                console.log('Certificate Data:', response.data);  // Log data to console
                setCertificateData(response.data); // Optionally store the data in state
            } catch (err) {
                console.error('Error fetching certificate data:', err);
            }
        };

        fetchCertificateData(); // Automatically fetch certificate data on mount
    }, []); 

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
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                    {assignment.submissions.length > 0 ? (
    assignment.submissions.map((submission) => 
        submission.student === studentId && submission.mark != null && submission.mark !== 0 ? (
            <span 
                key={submission._id} 
                className={submission.mark >= 40 ? "text-green-600 font-bold" : "text-red-600 font-bold"}
            >
                {submission.mark} {submission.mark >= 40 ? "(P)" : "(F)"}
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

            <div className="flex justify-center mt-[30px]">
                Total Marks: {totalMarks}
            </div>
           

            <div className='flex justify-center'>
            {
               CertificateData &&  (
                <Link  className="inline-block px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all" target='_blank' to={`${CertificateData.image}`}>Downlode CertificateData</Link>
               )
 
            }
            </div>
        </div>
    );
};

export default Result;
