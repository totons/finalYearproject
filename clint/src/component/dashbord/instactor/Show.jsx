// import React, { useEffect, useState } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { Users, BarChart3, BookOpen, ChevronRight, Search, Loader } from 'lucide-react';
// import AddCertificateModal from './AddCertificateModal';
// import { getBaseUrl } from '../../../utils/baseUrl';

// const Show = () => {
//     const { courseId } = useParams();
//     const navigate = useNavigate();
//     const [students, setStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedStudentId, setSelectedStudentId] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const token = Cookies.get('token');

//     const fetchEnrolledStudents = async () => {
//         try {
//             const response = await axios.get(`${getBaseUrl()}/course/courses/${courseId}/students`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });
//             setStudents(response.data.enrolledStudents);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to fetch enrolled students.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchEnrolledStudents();
//     }, [courseId]);

//     const openModal = (studentId) => {
//         setSelectedStudentId(studentId);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedStudentId(null);
//     };

//     const refreshStudentsList = () => {
//         fetchEnrolledStudents();
//         closeModal();
//     };

//     const viewStatistics = () => {
//         navigate(`/dashboard/student-statistics/${courseId}`);
//     };

//     const filteredStudents = students.filter(student =>
//         student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         student.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//                 <div className="text-center">
//                     <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
//                     <p className="text-lg font-semibold text-gray-700">Loading your courses...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
//                     <p className="text-red-800 font-semibold">Error</p>
//                     <p className="text-red-600 mt-2">{error}</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-3 md:p-10">
//             {/* Header Section */}
//             {/* <div className="mb-10">
//                 <div className="flex items-center gap-3 mb-2">
//                     <div className="p-2 bg-blue-100 rounded-lg">
//                         <Users className="w-6 h-6 text-blue-600" />
//                     </div>
//                     <h1 className="text-4xl font-bold text-slate-900">Enrolled Students</h1>
//                 </div>
//                 <p className="text-slate-600 ml-11">{students.length} students enrolled</p>
//             </div> */}

//             <div className="text-center mb-8 mt-5">
//                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
//                         Active Courses
//                     </h2>
//                     <p className="text-gray-600 text-sm sm:text-base">Review and publish courses awaiting approval</p>
//                     <div className="mt-4 inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
//                        {students.length} students enrolled
//                     </div>
//                 </div>

//             {/* Action Buttons */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//                 <Link to={`/dashboard/showallclasss/${courseId}`}>
//                     <button className="w-full group px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2">
//                         <BookOpen className="w-5 h-5" />
//                         View Class
//                         <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </button>
//                 </Link>
//                 <button
//                     onClick={viewStatistics}
//                     className="w-full group px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
//                 >
//                     <BarChart3 className="w-5 h-5" />
//                     View Statistics
//                     <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//             </div>

//             {/* Search Bar */}
//             {students.length > 0 && (
//                 <div className="mb-8">
//                     <div className="relative">
//                         <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
//                         <input
//                             type="text"
//                             placeholder="Search by name or email..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         />
//                     </div>
//                 </div>
//             )}

//             {/* Students Section */}
//             {students.length > 0 ? (
//                 <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
//                     {/* Table for Desktop */}
//                     <div className="hidden md:block overflow-x-auto">
//                         <table className="w-full">
//                             <thead>
//                                 <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
//                                     <th className="px-6 py-4 text-center font-semibold text-slate-700 text-base">Image</th>
//                                     <th className="px-6 py-4 text-center font-semibold text-slate-700 text-base">Full Name</th>
//                                     <th className="px-6 py-4 text-center font-semibold text-slate-700 text-base">Email</th>
//                                     <th className="px-6 py-4 text-center font-semibold text-slate-700 text-base">Action</th>
//                                     <th className="px-6 py-4 text-center font-semibold text-slate-700 text-base">Certificate</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredStudents.map((student, idx) => (
//                                     <tr
//                                         key={student._id}
//                                         className="border-b border-slate-100 hover:bg-blue-50 transition-colors duration-200"
//                                     >
//                                         <td className="px-6 py-4">
//                                             <img
//                                                 src={student.image}
//                                                 alt={student.name}
//                                                 className="w-12 h-12 object-cover rounded-full ring-2 ring-blue-200"
//                                             />
//                                         </td>
//                                         <td className="px-6 py-4 text-center">
//                                             <span className="font-medium text-slate-900">{student.fullname}</span>
//                                         </td>
//                                         <td className="px-6 py-4 text-slate-600 text-center">{student.email}</td>
                                        
//                                         <td className="px-6 py-4 text-center">
//                                             <Link
//                                             to={`/dashboard/enrollsetudent/${courseId}/student/${student._id}`}
//                                             className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200 text-sm"
//                                         >
//                                             Show Assignments
//                                         </Link>
//                                         </td>
//                                         <td className="px-6 py-4 text-center">
//                                             <button
//                                                 onClick={() => openModal(student._id)}
//                                                 className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200 text-sm"
//                                             >
//                                                 Add Certificate
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Card View for Mobile */}
//                     <div className="md:hidden">
//                         <div className="divide-y divide-slate-200">
//                             {filteredStudents.map((student) => (
//                                 <div
//                                     key={student._id}
//                                     className="p-4 hover:bg-blue-50 transition-colors duration-200"
//                                 >
//                                     <div className="flex items-center gap-4 mb-3">
//                                         <img
//                                             src={student.image}
//                                             alt={student.name}
//                                             className="w-14 h-14 object-cover rounded-full ring-2 ring-blue-200"
//                                         />
//                                         <div className="flex-1">
//                                             <p className="font-semibold text-slate-900">{student.fullname}</p>
//                                             <p className="text-sm text-slate-600">{student.email}</p>
//                                         </div>
//                                     </div>
//                                     <button
                                        
//                                         className="w-full mb-3 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200 text-sm"
//                                     >
//                                        <Link
//                                             to={`/dashboard/enrollsetudent/${courseId}/student/${student._id}`}
//                                             className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200 text-sm"
//                                         >
//                                             Show Assignments
//                                         </Link>
//                                     </button>
//                                     <button
//                                         onClick={() => openModal(student._id)}
//                                         className="w-full px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200 text-sm"
//                                     >
//                                         Add Certificate
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* No Results Message */}
//                     {filteredStudents.length === 0 && (
//                         <div className="text-center py-12">
//                             <p className="text-slate-600 font-medium">No students match your search.</p>
//                         </div>
//                     )}
//                 </div>
//             ) : (
//                 <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-slate-200">
//                     <div className="mb-4 flex justify-center">
//                         <div className="p-4 bg-blue-100 rounded-lg">
//                             <Users className="w-8 h-8 text-blue-600" />
//                         </div>
//                     </div>
//                     <p className="text-slate-600 text-lg font-medium">No students enrolled yet</p>
//                     <p className="text-slate-500 mt-2">Students will appear here when they enroll in this course.</p>
//                 </div>
//             )}

//             {/* Modal */}
//             {isModalOpen && selectedStudentId && (
//                 <AddCertificateModal
//                     courseId={courseId}
//                     studentId={selectedStudentId}
//                     onClose={closeModal}
//                     onSubmit={refreshStudentsList}
//                 />
//             )}
//         </div>
//     );
// };

// export default Show;



import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Users,
  BarChart3,
  BookOpen,
  ChevronRight,
  Search,
  Loader,
} from "lucide-react";
import AddCertificateModal from "./AddCertificateModal";
import { getBaseUrl } from "../../../utils/baseUrl";

const Show = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEnrolledStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = Cookies.get("token");

      const response = await axios.get(
        `${getBaseUrl()}/course/courses/${courseId}/students`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(response.data.enrolledStudents || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to fetch enrolled students."
      );
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchEnrolledStudents();
  }, [fetchEnrolledStudents]);

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

  const viewStatistics = () => {
    navigate(`/dashboard/student-statistics/${courseId}`);
  };

  const filteredStudents = students.filter((student) => {
    const name = student.fullname || "";
    const email = student.email || "";

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">
            Loading students...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <p className="text-red-800 font-semibold">Error</p>
          <p className="text-red-600 mt-2">{error}</p>

          <button
            onClick={fetchEnrolledStudents}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-3 md:p-10">
      <div className="text-center mb-8 mt-5">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
          Enrolled Students
        </h2>

        <p className="text-gray-600 text-sm sm:text-base">
          Manage enrolled students and certificates
        </p>

        <div className="mt-4 inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
          {students.length} students enrolled
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link to={`/dashboard/showallclasss/${courseId}`}>
          <button className="w-full group px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2">
            <BookOpen className="w-5 h-5" />
            View Class
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>

        <button
          onClick={viewStatistics}
          className="w-full group px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
        >
          <BarChart3 className="w-5 h-5" />
          View Statistics
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {students.length > 0 && (
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      )}

      {students.length > 0 ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <th className="px-6 py-4 text-center font-semibold text-slate-700 text-base">
                    Image
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-700 text-base">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-700 text-base">
                    Email
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-700 text-base">
                    Action
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-700 text-base">
                    Certificate
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="border-b border-slate-100 hover:bg-blue-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-center">
                      <img
                        src={student.image}
                        alt={student.fullname || "Student"}
                        className="w-12 h-12 object-cover rounded-full ring-2 ring-blue-200 mx-auto"
                      />
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="font-medium text-slate-900">
                        {student.fullname}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600 text-center">
                      {student.email}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <Link
                        to={`/dashboard/enrollsetudent/${courseId}/student/${student._id}`}
                        className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200 text-sm"
                      >
                        Show Assignments
                      </Link>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => openModal(student._id)}
                        className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200 text-sm"
                      >
                        Add Certificate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden">
            <div className="divide-y divide-slate-200">
              {filteredStudents.map((student) => (
                <div
                  key={student._id}
                  className="p-4 hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={student.image}
                      alt={student.fullname || "Student"}
                      className="w-14 h-14 object-cover rounded-full ring-2 ring-blue-200"
                    />

                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">
                        {student.fullname}
                      </p>
                      <p className="text-sm text-slate-600">{student.email}</p>
                    </div>
                  </div>

                  <Link
                    to={`/dashboard/enrollsetudent/${courseId}/student/${student._id}`}
                    className="block w-full mb-3 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200 text-sm text-center"
                  >
                    Show Assignments
                  </Link>

                  <button
                    onClick={() => openModal(student._id)}
                    className="w-full px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200 text-sm"
                  >
                    Add Certificate
                  </button>
                </div>
              ))}
            </div>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 font-medium">
                No students match your search.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-slate-200">
          <div className="mb-4 flex justify-center">
            <div className="p-4 bg-blue-100 rounded-lg">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <p className="text-slate-600 text-lg font-medium">
            No students enrolled yet
          </p>

          <p className="text-slate-500 mt-2">
            Students will appear here when they enroll in this course.
          </p>
        </div>
      )}

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

export default Show;