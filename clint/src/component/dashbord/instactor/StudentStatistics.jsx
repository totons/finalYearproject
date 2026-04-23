import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getBaseUrl } from '../../../utils/baseUrl';
import { Loader, ArrowLeft, Users, TrendingUp } from 'lucide-react';

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
                const response = await axios.get(`${getBaseUrl()}/course/courses/${courseId}/statistics`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                
                setStatistics(response.data);
            } catch (err) {
                console.error("Error fetching statistics:", err);
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

    const totalStudents = statistics.totalStudents || 
        (statistics.passed + statistics.failed + statistics.absent);

    const calculatePercentage = (value) => {
        if (totalStudents === 0) return 0;
        return Math.round((value / totalStudents) * 100);
    };

    const data = [
        { name: 'Passed', value: statistics.passed },
        { name: 'Failed', value: statistics.failed },
        { name: 'Absent', value: statistics.absent }
    ];

    const COLORS = ['#10B981', '#EF4444', '#F59E0B'];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="text-center space-y-4">
                    <div className="relative">
                        <Loader className="w-16 h-16 text-indigo-600 animate-spin mx-auto" />
                        <div className="absolute inset-0 bg-indigo-600/10 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-lg font-semibold text-gray-700">Loading Statistics...</p>
                    <p className="text-sm text-gray-500">Please wait while we fetch your data</p>
                </div>
            </div>
        );
    }

    const statCards = [
        {
            label: 'Passed',
            value: statistics.passed,
            percentage: calculatePercentage(statistics.passed),
            bgColor: 'bg-emerald-50',
            textColor: 'text-emerald-600',
            borderColor: 'border-emerald-200',
            accentColor: 'bg-emerald-500',
            icon: '✓'
        },
        {
            label: 'Failed',
            value: statistics.failed,
            percentage: calculatePercentage(statistics.failed),
            bgColor: 'bg-red-50',
            textColor: 'text-red-600',
            borderColor: 'border-red-200',
            accentColor: 'bg-red-500',
            icon: '✕'
        },
        {
            label: 'Absent',
            value: statistics.absent,
            percentage: calculatePercentage(statistics.absent),
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-600',
            borderColor: 'border-amber-200',
            accentColor: 'bg-amber-500',
            icon: '−'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8">
                {/* <Link 
                    to={`/dashboard/enrollsetudents/${courseId}`}
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-4 transition-colors duration-200"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Students</span>
                </Link> */}

                <div className="flex flex-col justify-center sm:flex-row sm:items-center sm:justify-between gap-4">
                    
                    <div className="text-center mb-8 mt-5">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                        Student Statistics
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">Review and publish courses awaiting approval</p>
                    <div className="mt-4 inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                        {/* <Users className="w-4 h-4" /> */}
                            Total Students: <span className="font-semibold">{totalStudents}</span>
                    </div>
                </div>
                    
                    {/* <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                            Student Statistics
                        </h1>
                        <p className="text-gray-600 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Total Students: <span className="font-semibold">{totalStudents}</span>
                        </p>
                    </div> */}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5">
                    <p className="text-amber-800 flex items-center gap-2 text-sm sm:text-base">
                        <span className="text-lg">⚠️</span>
                        {error}
                    </p>
                </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow hover:shadow-sm transition-shadow duration-300 p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-6 h-6 text-indigo-600" />
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                Performance Distribution
                            </h2>
                        </div>
                        
                        <div className="h-64 sm:h-80 md:h-96 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={true}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={window.innerWidth < 640 ? 70 : 90}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        formatter={(value) => `${value} students`}
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: 'none',
                                            borderRadius: '12px',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                    <Legend 
                                        wrapperStyle={{
                                            paddingTop: '20px'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Stats Cards Section */}
                <div className="lg:col-span-1">
                    <div className="space-y-4">
                        {statCards.map((stat, index) => (
                            <div
                                key={index}
                                className={`${stat.bgColor} border-2 ${stat.borderColor} rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className={`font-semibold ${stat.textColor} text-sm sm:text-base`}>
                                        {stat.label}
                                    </h3>
                                    <div className={`${stat.accentColor} text-white w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold`}>
                                        {stat.icon}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <p className={`text-2xl sm:text-3xl font-bold ${stat.textColor}`}>
                                        {stat.value}
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-white/60 rounded-full h-2 overflow-hidden">
                                    <div 
                                        className={`${stat.accentColor} h-full transition-all duration-500 ease-out`}
                                        style={{ width: `${stat.percentage}%` }}
                                    ></div>
                                </div>

                                <p className={`text-xs sm:text-sm ${stat.textColor} font-medium mt-2`}>
                                    {stat.percentage}% of total
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Summary Section */}
            <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-4">Summary</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                        <p className="text-indigo-100 text-sm mb-1">Total Students</p>
                        <p className="text-2xl sm:text-3xl font-bold">{totalStudents}</p>
                    </div>
                    <div>
                        <p className="text-indigo-100 text-sm mb-1">Pass Rate</p>
                        <p className="text-2xl sm:text-3xl font-bold">{calculatePercentage(statistics.passed)}%</p>
                    </div>
                    <div>
                        <p className="text-indigo-100 text-sm mb-1">Fail Rate</p>
                        <p className="text-2xl sm:text-3xl font-bold">{calculatePercentage(statistics.failed)}%</p>
                    </div>
                    <div>
                        <p className="text-indigo-100 text-sm mb-1">Absent Rate</p>
                        <p className="text-2xl sm:text-3xl font-bold">{calculatePercentage(statistics.absent)}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentStatistics;