import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const ShowAllEnrollStudent = () => {
    const { courseId } = useParams(); // Fetch courseId from URL
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = Cookies.get('token');
    console.log(students)
  

    useEffect(() => {
        const fetchEnrolledStudents = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5004/course/courses/${courseId}/students`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setStudents(response.data.enrolledStudents);
                
                console.log(response.data.students);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch enrolled students.');
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledStudents();
    }, [courseId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6">
            <div className="mb-4 flex justify-center">
                <h1 className="text-2xl font-bold mb-4">Enrolled Students</h1>
                <div className="mb-4">
                    <button
                        
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                        <Link to={`/dashboard/addclass/${courseId}`}>Add Class</Link>
                        
                    </button>
                    <button
                        
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        <Link to={`/dashboard/addassigment/${courseId}`}>Add Assignment</Link>
                    </button>
                </div>
            </div>
            {students.length > 0 ? (
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border text-left">Image</th>
                            <th className="px-4 py-2 border text-left">Full Name</th>
                            <th className="px-4 py-2 border text-left">Email</th>
                            <th className="px-4 py-2 border text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id} className="border-b">
                                <td className="px-4 py-2 text-center">
                                    <img 
                                        src={student.image } 
                                        alt={student.name} 
                                        className="w-12 h-12 object-cover rounded-full"
                                    />
                                </td>
                                <td className="px-4 py-2">{student.fullname }</td>
                                <td className="px-4 py-2">{student.email}</td>
                                <td className="px-4 py-2">
                    <Link
                       to={`/dashboard/enrollsetudent/${courseId}/student/${student._id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        
                        Show Assignments
                    </Link>
                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No students are enrolled in this course yet.</p>
            )}
        </div>
    );
};

export default ShowAllEnrollStudent;
