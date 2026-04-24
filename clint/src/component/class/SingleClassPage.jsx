import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SectionHeading from '../shared/SectionHeading';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { getBaseUrl } from '../../utils/baseUrl';
import { Loader, Clock, DollarSign, Zap, Calendar, Mail, Linkedin, Github, BookOpen, Users, Trophy } from 'lucide-react';

const SingleClassPage = () => {
    const { id: courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrolling, setEnrolling] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/course/${courseId}`);
                setCourse(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data.message : "Failed to fetch course data");
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId]);

    // const handleEnroll = async () => {
    //     const token = Cookies.get('token');
    //     if (!token) {
    //         Swal.fire({
    //             icon: 'info',
    //             title: 'Please log in',
    //             text: 'You must log in to enroll in this course.',
    //             showConfirmButton: true,
    //         });
    //         return navigate('/login');
    //     }

    //     setEnrolling(true);
    //     try {
    //         await axios.post(
    //             `${getBaseUrl()}/course/courses/${courseId}/enroll`,
    //             {},
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );

    //         Swal.fire({
    //             position: 'center',
    //             icon: 'success',
    //             title: 'You have successfully enrolled!',
    //             showConfirmButton: false,
    //             timer: 1500,
    //         });
    //     } catch (error) {
    //         Swal.fire({
    //             position: 'center',
    //             icon: 'error',
    //             title: error.response?.data?.message || 'Failed to enroll. Please try again.',
    //             showConfirmButton: true,
    //         });
    //     } finally {
    //         setEnrolling(false);
    //     }
    // };
    const handleEnroll = async () => {
  const token = Cookies.get("token");

  if (!token) {
    Swal.fire({
      icon: "info",
      title: "Please log in",
      text: "You must log in to enroll in this course.",
      showConfirmButton: true,
    });
    return navigate("/login");
  }

  setEnrolling(true);

  try {
    const res = await axios.post(
      `${getBaseUrl()}/api/payment/init/${courseId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.free) {
      Swal.fire({
        icon: "success",
        title: "Enrolled successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
      return navigate("/dashboard/enrollClass");
    }

    window.location.href = res.data.paymentUrl;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Payment failed",
      text: error.response?.data?.message || "Could not start payment.",
    });
  } finally {
    setEnrolling(false);
  }
};


    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="relative inline-block">
                        <Loader className="w-16 h-16 text-indigo-600 animate-spin" />
                        <div className="absolute inset-0 bg-indigo-600/10 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-lg font-semibold text-gray-700">Loading Course Details...</p>
                    <p className="text-sm text-gray-500">Please wait while we prepare your course information</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
                <div className="text-center space-y-4 bg-red-50 rounded-2xl p-8 border-2 border-red-200">
                    <p className="text-lg font-semibold text-red-600">Error Loading Course</p>
                    <p className="text-sm text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    const isEnrollmentClosed = new Date() > new Date(course.enrollLastDate);
    const daysLeft = Math.ceil((new Date(course.enrollLastDate) - new Date()) / (1000 * 60 * 60 * 24));

    return (
        <>
            {/* <SectionHeading
                title="Course Details"
                desc="Learn from industry experts and advance your skills"
            /> */}

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 md:px-8">
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                        {/* Course Image & Main Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Course Image */}
                            <div className="relative group overflow-hidden rounded-2xl shadow">
                                <img
                                    src={course.images}
                                    alt={course.title}
                                    className="w-full h-80 sm:h-96 md:h-[450px] object-cover transition-all transform group-hover:scale-110 duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                                {!isEnrollmentClosed && (
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow">
                                        <Zap className="w-4 h-4" />
                                        Open for Enrollment
                                    </div>
                                )}
                            </div>

                            {/* Course Title & Description */}
                            <div className="bg-white rounded-2xl shadow p-6 sm:p-8">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    {course.title}
                                </h1>
                                
                                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                                    Master the essential skills needed in today's industry with our comprehensive course designed by professionals.
                                </p>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-y border-gray-200">
                                    <div className="text-center">
                                        <BookOpen className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Comprehensive</p>
                                        <p className="font-bold text-gray-900">Full Course</p>
                                    </div>
                                    <div className="text-center">
                                        <Trophy className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Skills</p>
                                        <p className="font-bold text-gray-900">{course.skills || 'Multiple'}</p>
                                    </div>
                                    <div className="text-center">
                                        <Users className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Students</p>
                                        <p className="font-bold text-gray-900">{course.students || '100+'}</p>
                                    </div>
                                </div>

                                {/* Skills Section */}
                                <div className="mt-8">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-indigo-600" />
                                        Skills You'll Learn
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {course.skills && course.skills.split(',').map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200"
                                            >
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Price & Enrollment */}
                        <div className="space-y-6">
                            {/* Price Card */}
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow p-6 sm:p-8 text-white">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-5xl sm:text-6xl font-bold">৳ {course.price}</span>
                                    <span className="text-indigo-200">One-time</span>
                                </div>
                                <p className="text-indigo-100 text-sm mb-6">Full access forever</p>

                                {/* Enrollment Status */}
                                <div className={`rounded-lg p-4 mb-6 flex items-center gap-3 ${
                                    isEnrollmentClosed 
                                        ? 'bg-red-500/20 border border-red-400' 
                                        : 'bg-green-500/20 border border-green-400'
                                }`}>
                                    <Calendar className="w-5 h-5 flex-shrink-0" />
                                    <div className="text-sm">
                                        {isEnrollmentClosed ? (
                                            <>
                                                <p className="font-semibold">Enrollment Closed</p>
                                                <p className="text-xs opacity-90">This course is no longer accepting enrollments</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="font-semibold">{daysLeft} Days Left</p>
                                                <p className="text-xs opacity-90">Enroll by {new Date(course.enrollLastDate).toLocaleDateString()}</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Enroll Button */}
                                <button
                                    onClick={handleEnroll}
                                    disabled={isEnrollmentClosed || enrolling}
                                    className={`w-full py-3 sm:py-4 px-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                                        isEnrollmentClosed
                                            ? 'bg-gray-500 cursor-not-allowed opacity-50'
                                            : enrolling
                                            ? 'bg-white text-indigo-600 opacity-75 cursor-not-allowed'
                                            : 'bg-white text-indigo-600 hover:bg-gray-100 hover:shadow-sm transform hover:scale-105'
                                    }`}
                                >
                                    {enrolling ? (
                                        <>
                                            <Loader className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : isEnrollmentClosed ? (
                                        'Enrollment Closed'
                                    ) : (
                                        <>
                                            <Zap className="w-5 h-5" />
                                            Enroll Now
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* What's Included */}
                            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
                                <h3 className="text-lg font-bold text-gray-900">What's Included</h3>
                                <ul className="space-y-3">
                                    {[
                                        'Full course access',
                                        'Live sessions',
                                        'Course materials',
                                        'Certificate of completion',
                                        'Lifetime support'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-700">
                                            <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Instructor Section */}
                    <div className="bg-white rounded-2xl shadow overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 sm:px-8 py-6 sm:py-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                                <Users className="w-8 h-8" />
                                Meet Your Instructor
                            </h2>
                        </div>

                        <div className="p-6 sm:p-8 md:p-10">
                            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                                {/* Instructor Image */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={course.instructor.image}
                                        alt={course.instructor.fullname}
                                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-4 border-indigo-200 shadow object-cover transform transition-transform hover:scale-110"
                                    />
                                </div>

                                {/* Instructor Info */}
                                <div className="flex-1">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                        {course.instructor.fullname}
                                    </h3>
                                    <p className="text-indigo-600 font-semibold mb-4 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                                        Expert Instructor
                                    </p>

                                    <p className="text-gray-600 text-base mb-6 leading-relaxed">
                                        With years of industry experience, this instructor brings real-world knowledge and practical expertise to every lesson.
                                    </p>

                                    {/* Contact & Social */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Mail className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                                            <a 
                                                href={`mailto:${course.instructor.email}`}
                                                className="hover:text-indigo-600 transition-colors"
                                            >
                                                {course.instructor.email}
                                            </a>
                                        </div>

                                        {/* Social Links */}
                                        <div className="flex gap-4 pt-4">
                                            {course.instructor.linkedInLink && (
                                                <a
                                                    href={course.instructor.linkedInLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-semibold text-sm"
                                                >
                                                    <Linkedin className="w-4 h-4" />
                                                    LinkedIn
                                                </a>
                                            )}
                                            {course.instructor.githubLink && (
                                                <a
                                                    href={course.instructor.githubLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm"
                                                >
                                                    <Github className="w-4 h-4" />
                                                    GitHub
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleClassPage;