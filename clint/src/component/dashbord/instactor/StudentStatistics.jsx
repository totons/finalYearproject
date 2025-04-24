import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const StudentStatistics = () => {
    const { courseId } = useParams();
    const [statistics, setStatistics] = useState({
        passed: 0,
        failed: 0,
        absent: 0,
        totalStudents: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:5004/course/courses/${courseId}/statistics`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                
                setStatistics(response.data);
            } catch (err) {
                console.error("Error fetching statistics:", err);
                // Fallback to sample data
                setStatistics({
                    passed: 12,
                    failed: 5,
                    absent: 3,
                    totalStudents: 20
                });
                setError('Could not fetch real statistics. Showing sample data.');
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [courseId, token]);

    // Safely calculate total students
    const totalStudents = statistics.totalStudents || 
        (statistics.passed + statistics.failed + statistics.absent);

    // Safely calculate percentages
    const calculatePercentage = (value) => {
        if (totalStudents === 0) return 0;
        return Math.round((value / totalStudents) * 100);
    };

    const data = [
        { name: 'Passed', value: statistics.passed },
        { name: 'Failed', value: statistics.failed },
        { name: 'Absent', value: statistics.absent }
    ];

    const COLORS = ['#4CAF50', '#F44336', '#FFC107'];

    if (loading) return <div className="flex justify-center items-center h-screen">Loading statistics...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Student Statistics</h1>
                <Link 
                    to={`/dashboard/enrollsetudents/${courseId}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Back to Students
                </Link>
            </div>

            {error && <div className="text-yellow-500 mb-4 text-center">{error}</div>}

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-center">Student Performance Distribution</h2>
                
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value} students`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="bg-green-100 p-4 rounded-lg text-center">
                        <h3 className="font-medium text-green-800">Passed</h3>
                        <p className="text-2xl font-bold text-green-600">{statistics.passed}</p>
                        <p className="text-sm text-green-700">
                            {calculatePercentage(statistics.passed)}%
                        </p>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg text-center">
                        <h3 className="font-medium text-red-800">Failed</h3>
                        <p className="text-2xl font-bold text-red-600">{statistics.failed}</p>
                        <p className="text-sm text-red-700">
                            {calculatePercentage(statistics.failed)}%
                        </p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg text-center">
                        <h3 className="font-medium text-yellow-800">Absent</h3>
                        <p className="text-2xl font-bold text-yellow-600">{statistics.absent}</p>
                        <p className="text-sm text-yellow-700">
                            {calculatePercentage(statistics.absent)}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentStatistics;