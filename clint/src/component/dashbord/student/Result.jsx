// import React, { useContext, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { AuthContext } from "../../../provider/AuthProvider";
// import { Loader } from "lucide-react";
// import { getBaseUrl } from "../../../utils/baseUrl";

// const Result = () => {
//   const { courseId, studentId } = useParams();
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [assignmentMarks, setAssignmentMarks] = useState([]);
//   const [totalAssignmentMark, setTotalAssignmentMark] = useState(0);
//   const [writtenMark, setWrittenMark] = useState(0);
//   const [attendanceMark, setAttendanceMark] = useState(0);
//   const [CertificateData, setCertificateData] = useState();
//   const token = Cookies.get("token");
//   const { user } = useContext(AuthContext);

//   // review modal state
//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//   const [selectedReview, setSelectedReview] = useState("");

//   useEffect(() => {
//     const fetchEnrolledStudents = async () => {
//       try {
//         const response = await axios.get(
//           `${getBaseUrl()}/course/courses/${courseId}/students`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setStudents(response.data.classes || []);

//         const marks = [];
//         response.data.classes.forEach((studentClass) => {
//           studentClass.assignments.forEach((assignment) => {
//             assignment.submissions.forEach((submission) => {
//               if (submission.student === studentId && submission.mark != null) {
//                 marks.push(submission.mark);
//               }
//             });
//           });
//         });

//         marks.sort((a, b) => b - a);
//         setAssignmentMarks(marks);

//         let assignmentTotal = 0;
//         if (marks.length > 0) {
//           if (marks.length >= 2) {
//             assignmentTotal = (marks[0] + marks[1]) / 2;
//           } else {
//             assignmentTotal = marks[0];
//           }
//         }
//         setTotalAssignmentMark(assignmentTotal);
//       } catch (err) {
//         setError(
//           err.response?.data?.message || "Failed to fetch enrolled students."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEnrolledStudents();
//   }, [courseId, studentId, token]);

//   useEffect(() => {
//     const fetchAdditionalMarks = async () => {
//       if (studentId && courseId) {
//         try {
//           const response = await axios.get(
//             `${getBaseUrl()}/course/${courseId}/${studentId}`
//           );

//           setWrittenMark(response.data.writtenMark || 0);
//           setAttendanceMark(response.data.attendanceMark || 0);
//         } catch (err) {
//           if (err.response?.status === 404) {
//             setWrittenMark(0);
//             setAttendanceMark(0);
//           } else {
//             console.error("Error fetching additional marks:", err);
//           }
//         }
//       }
//     };

//     fetchAdditionalMarks();
//   }, [courseId, studentId]);

//   useEffect(() => {
//     const fetchCertificateData = async () => {
//       try {
//         const response = await axios.get(
//           `${getBaseUrl()}/api/certificate/certificates/${courseId}/${studentId}`
//         );
//         setCertificateData(response.data);
//       } catch (err) {
//         console.error("Error fetching certificate data:", err);
//       }
//     };

//     fetchCertificateData();
//   }, [courseId, studentId]);

//   const calculateTotalMarks = () => {
//     return Number(totalAssignmentMark || 0) + Number(writtenMark || 0) + Number(attendanceMark || 0);
//   };

//   const totalMarks = calculateTotalMarks();
//   const isPass = totalMarks >= 40;

//   const isFinalEvaluationPending =
//     Number(writtenMark || 0) === 0 && Number(attendanceMark || 0) === 0;

//   const getBscGrade = (mark) => {
//     const num = Number(mark || 0);

//     if (num >= 80) return "A+";
//     if (num >= 75) return "A";
//     if (num >= 70) return "A-";
//     if (num >= 65) return "B+";
//     if (num >= 60) return "B";
//     if (num >= 55) return "B-";
//     if (num >= 50) return "C+";
//     if (num >= 45) return "C";
//     if (num >= 40) return "D";
//     return "F";
//   };

//   const finalGrade = getBscGrade(totalMarks);

//   // ---------- UI STATES ----------
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
//           <p className="text-lg font-semibold text-gray-700">Loading your Result...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
//         <div className="bg-white rounded-2xl shadow-md border border-red-200 px-5 py-6 sm:px-6 sm:py-8 text-center max-w-md w-full">
//           <h2 className="text-base sm:text-lg font-semibold text-red-700 mb-2">
//             Something went wrong
//           </h2>
//           <p className="text-xs sm:text-sm text-red-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="inline-flex items-center justify-center px-4 py-2.5 sm:px-5 sm:py-2.5 bg-red-600 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-red-700 transition w-full sm:w-auto"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
//       <div className="max-w-8xl mx-auto space-y-5 sm:space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-5 md:px-7 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//           <div>
//             <p className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-gray-400 font-semibold">
//               Course Result
//             </p>
//             <h1 className="mt-1 text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
//               Student Performance Summary
//             </h1>
//           </div>

//           <div className="flex flex-col items-start sm:items-end gap-1.5">
//             {isFinalEvaluationPending ? (
//               <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
//                 Result Status:&nbsp;
//                 <span>Pending Final Evaluation</span>
//               </span>
//             ) : (
//               <>
//                 <span
//                   className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
//                     isPass
//                       ? "bg-green-50 text-green-700 border border-green-200"
//                       : "bg-red-50 text-red-700 border border-red-200"
//                   }`}
//                 >
//                   Overall Status:&nbsp;
//                   <span>{isPass ? "Pass" : "Fail"}</span>
//                 </span>

//                 <span
//                   className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
//                     finalGrade === "F"
//                       ? "bg-red-50 text-red-700 border border-red-200"
//                       : "bg-blue-50 text-blue-700 border border-blue-200"
//                   }`}
//                 >
//                   Grade:&nbsp;
//                   <span>{finalGrade}</span>
//                 </span>
//               </>
//             )}

//             <span className="text-[11px] sm:text-xs text-gray-500">
//               Total Marks:{" "}
//               <span className="font-semibold text-gray-800">
//                 {totalMarks.toFixed(2)} / 100
//               </span>
//             </span>
//           </div>
//         </div>

//         {/* Marks Summary Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
//           <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3 sm:py-4">
//             <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">
//               Assignment Average
//             </p>
//             <p className="mt-2 text-xl sm:text-2xl font-bold text-blue-600">
//               {totalAssignmentMark.toFixed(2)}
//             </p>
//             {assignmentMarks.length > 0 && (
//               <p className="mt-1 text-[11px] sm:text-xs text-gray-500">
//                 Top scores:{" "}
//                 <span className="font-medium text-gray-700">
//                   {assignmentMarks.join(", ")}
//                 </span>
//               </p>
//             )}
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3 sm:py-4">
//             <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">
//               Written Exam
//             </p>
//             <p className="mt-2 text-xl sm:text-2xl font-bold text-indigo-600">
//               {writtenMark}
//             </p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3 sm:py-4">
//             <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">
//               Attendance
//             </p>
//             <p className="mt-2 text-xl sm:text-2xl font-bold text-emerald-600">
//               {attendanceMark}
//             </p>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
//           <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
//             <h2 className="text-sm sm:text-base font-semibold text-gray-900">
//               Assignment-wise Breakdown
//             </h2>
//             <span className="text-[10px] sm:text-xs text-gray-500">
//               All submitted assignments for this course
//             </span>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-[800px] w-full text-xs sm:text-sm border-t border-gray-100">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
//                     Class Name
//                   </th>
//                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
//                     Assignment Title
//                   </th>
//                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
//                     Submission
//                   </th>
//                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-semibold text-gray-600 border-b border-gray-200">
//                     Mark
//                   </th>
//                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-semibold text-gray-600 border-b border-gray-200">
//                     Review
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((studentClass) =>
//                   studentClass.assignments.length > 0 ? (
//                     studentClass.assignments.map((assignment) => (
//                       <tr
//                         key={assignment._id}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-800 border-b border-gray-100 align-top">
//                           {studentClass.title}
//                         </td>
//                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 border-b border-gray-100 align-top">
//                           {assignment.title}
//                         </td>
//                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 align-top">
//                           {assignment.submissions?.length > 0 ? (
//                             assignment.submissions.map((submission) =>
//                               submission.student === studentId ? (
//                                 <div key={submission._id}>
//                                   <Link
//                                     to={`${getBaseUrl()}/dashboard/showallclass/${submission.fileUrl}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-blue-600 hover:underline text-xs sm:text-sm font-medium"
//                                   >
//                                     View Submission
//                                   </Link>
//                                 </div>
//                               ) : null
//                             )
//                           ) : (
//                             <span className="text-[11px] text-red-500">
//                               No submission yet
//                             </span>
//                           )}
//                         </td>
//                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 text-center align-top">
//                           {assignment.submissions.length > 0 ? (
//                             assignment.submissions.map((submission) =>
//                               submission.student === studentId &&
//                               submission.mark != null &&
//                               submission.mark !== 0 ? (
//                                 <span
//                                   key={submission._id}
//                                   className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold ${
//                                     submission.mark >= 40
//                                       ? "bg-green-50 text-green-700 border border-green-200"
//                                       : "bg-red-50 text-red-700 border border-red-200"
//                                   }`}
//                                 >
//                                   {submission.mark}
//                                 </span>
//                               ) : null
//                             )
//                           ) : (
//                             <span className="text-[11px] text-gray-500">
//                               No mark assigned
//                             </span>
//                           )}
//                         </td>

//                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 text-center align-top">
//                           {assignment.submissions.length > 0 ? (
//                             assignment.submissions.map((submission) =>
//                               submission.student === studentId ? (
//                                 <button
//                                   key={submission._id}
//                                   type="button"
//                                   onClick={() => {
//                                     setSelectedReview(
//                                       submission.review ||
//                                         "No review has been added yet."
//                                     );
//                                     setIsReviewModalOpen(true);
//                                   }}
//                                   className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[11px] sm:text-xs font-medium hover:bg-blue-100 transition"
//                                 >
//                                   View Review
//                                 </button>
//                               ) : null
//                             )
//                           ) : (
//                             <span className="text-[11px] text-gray-400">
//                               —
//                             </span>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   ) : null
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Total Marks */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-5 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//           <div>
//             <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">
//               Final Course Marks
//             </p>
//             <p className="mt-1.5 text-xl sm:text-2xl font-bold text-gray-900">
//               {totalMarks.toFixed(2)} / 100

//               {isFinalEvaluationPending ? (
//                 <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-semibold text-gray-500">
//                   (Pending Final Evaluation)
//                 </span>
//               ) : (
//                 <>
//                   <span
//                     className={`ml-2 sm:ml-3 text-xs sm:text-sm font-semibold ${
//                       isPass ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     ({isPass ? "Pass" : "Fail"})
//                   </span>

//                   <span
//                     className={`ml-2 sm:ml-3 text-xs sm:text-sm font-semibold ${
//                       finalGrade === "F" ? "text-red-600" : "text-blue-600"
//                     }`}
//                   >
//                     (Grade: {finalGrade})
//                   </span>
//                 </>
//               )}
//             </p>
//           </div>
//         </div>

//         {/* Certificate */}
//         <div className="flex justify-center">
//           {CertificateData ? (
//             <Link
//               className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 mt-1 sm:mt-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition text-xs sm:text-sm font-semibold"
//               target="_blank"
//               to={`${CertificateData.image}`}
//             >
//               🎓 Download Certificate
//             </Link>
//           ) : (
//             <p className="text-[11px] sm:text-xs text-gray-500 mt-2">
//               Certificate will be available once issued.
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Review Modal */}
//       {isReviewModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
//           <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-5 sm:p-6">
//             <h3 className="text-base sm:text-lg font-semibold text-gray-900">
//               Assignment Review
//             </h3>
//             <p className="mt-3 text-sm sm:text-[15px] text-gray-700 whitespace-pre-line">
//               {selectedReview || "No review available for this assignment yet."}
//             </p>
//             <div className="mt-5 flex justify-end">
//               <button
//                 type="button"
//                 onClick={() => setIsReviewModalOpen(false)}
//                 className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Result;























// // import React, { useContext, useEffect, useState } from "react";
// // import { Link, useParams } from "react-router-dom";
// // import Cookies from "js-cookie";
// // import axios from "axios";
// // import { AuthContext } from "../../../provider/AuthProvider";
// // import { Loader } from "lucide-react";
// // import { getBaseUrl } from "../../../utils/baseUrl";

// // const Result = () => {
// //   const { courseId, studentId } = useParams();
// //   const [students, setStudents] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [assignmentMarks, setAssignmentMarks] = useState([]);
// //   const [totalAssignmentMark, setTotalAssignmentMark] = useState(0);
// //   const [writtenMark, setWrittenMark] = useState(0);
// //   const [attendanceMark, setAttendanceMark] = useState(0);
// //   const [CertificateData, setCertificateData] = useState();
// //   const token = Cookies.get("token");
// //   const { user } = useContext(AuthContext);

// //   // 🔹 NEW: review modal state
// //   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
// //   const [selectedReview, setSelectedReview] = useState("");

// //   useEffect(() => {
// //     const fetchEnrolledStudents = async () => {
// //       try {
// //         const response = await axios.get(
// //           `${getBaseUrl()}/course/courses/${courseId}/students`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );
// //         setStudents(response.data.classes || []);

// //         // Collect all assignment marks for this student
// //         const marks = [];
// //         response.data.classes.forEach((studentClass) => {
// //           studentClass.assignments.forEach((assignment) => {
// //             assignment.submissions.forEach((submission) => {
// //               if (
// //                 submission.student === studentId &&
// //                 submission.mark != null
// //               ) {
// //                 marks.push(submission.mark);
// //               }
// //             });
// //           });
// //         });

// //         // Sort marks in descending order
// //         marks.sort((a, b) => b - a);
// //         setAssignmentMarks(marks);

// //         // Calculate average of top two assignments (or one if only one exists)
// //         let assignmentTotal = 0;
// //         if (marks.length > 0) {
// //           if (marks.length >= 2) {
// //             assignmentTotal = (marks[0] + marks[1]) / 2;
// //           } else {
// //             assignmentTotal = marks[0];
// //           }
// //         }
// //         setTotalAssignmentMark(assignmentTotal);
// //       } catch (err) {
// //         setError(
// //           err.response?.data?.message ||
// //             "Failed to fetch enrolled students."
// //         );
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchEnrolledStudents();
// //   }, [courseId, studentId, token]);

// //   useEffect(() => {
// //     const fetchAdditionalMarks = async () => {
// //       if (studentId && courseId) {
// //         try {
// //           const response = await axios.get(
// //             `${getBaseUrl()}/course/${courseId}/${studentId}`
// //           );

// //           setWrittenMark(response.data.writtenMark || 0);
// //           setAttendanceMark(response.data.attendanceMark || 0);
// //         } catch (err) {
// //           if (err.response?.status === 404) {
// //             setWrittenMark(0);
// //             setAttendanceMark(0);
// //           } else {
// //             console.error("Error fetching additional marks:", err);
// //           }
// //         }
// //       }
// //     };

// //     fetchAdditionalMarks();
// //   }, [courseId, studentId]);

// //   useEffect(() => {
// //     const fetchCertificateData = async () => {
// //       try {
// //         const response = await axios.get(
// //           `${getBaseUrl()}/api/certificate/certificates/${courseId}/${studentId}`
// //         );
// //         setCertificateData(response.data);
// //       } catch (err) {
// //         console.error("Error fetching certificate data:", err);
// //       }
// //     };

// //     fetchCertificateData();
// //   }, [courseId, studentId]);

// //   const calculateTotalMarks = () => {
// //     return totalAssignmentMark + writtenMark + attendanceMark;
// //   };

// //   const totalMarks = calculateTotalMarks();
// //   const isPass = totalMarks >= 40;

// //   // ---------- UI STATES ----------
// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
// //                 <div className="text-center">
// //                     <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
// //                     <p className="text-lg font-semibold text-gray-700">Loading your Result...</p>
// //                 </div>
// //             </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
// //         <div className="bg-white rounded-2xl shadow-md border border-red-200 px-5 py-6 sm:px-6 sm:py-8 text-center max-w-md w-full">
// //           <h2 className="text-base sm:text-lg font-semibold text-red-700 mb-2">
// //             Something went wrong
// //           </h2>
// //           <p className="text-xs sm:text-sm text-red-600 mb-4">{error}</p>
// //           <button
// //             onClick={() => window.location.reload()}
// //             className="inline-flex items-center justify-center px-4 py-2.5 sm:px-5 sm:py-2.5 bg-red-600 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-red-700 transition w-full sm:w-auto"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
// //       <div className="max-w-8xl mx-auto space-y-5 sm:space-y-6">
// //         {/* Header */}
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-5 md:px-7 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
// //           <div>
// //             <p className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-gray-400 font-semibold">
// //               Course Result
// //             </p>
// //             <h1 className="mt-1 text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
// //               Student Performance Summary
// //             </h1>
// //             {/* {user && (
// //               <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
// //                 Student ID:{" "}
// //                 <span className="font-medium text-gray-700">
// //                   {studentId}
// //                 </span>
// //               </p>
// //             )} */}
// //           </div>

// //           <div className="flex flex-col items-start sm:items-end gap-1.5">
// //             <span
// //               className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
// //                 isPass
// //                   ? "bg-green-50 text-green-700 border border-green-200"
// //                   : "bg-red-50 text-red-700 border border-red-200"
// //               }`}
// //             >
// //               Overall Status:&nbsp;
// //               <span>{isPass ? "Pass" : "Fail"}</span>
// //             </span>
// //             <span className="text-[11px] sm:text-xs text-gray-500">
// //               Total Marks:{" "}
// //               <span className="font-semibold text-gray-800">
// //                 {totalMarks.toFixed(2)} / 100
// //               </span>
// //             </span>
// //           </div>
// //         </div>

// //         {/* Marks Summary Cards */}
// //         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
// //           <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3 sm:py-4">
// //             <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">
// //               Assignment Average
// //             </p>
// //             <p className="mt-2 text-xl sm:text-2xl font-bold text-blue-600">
// //               {totalAssignmentMark.toFixed(2)}
// //             </p>
// //             {assignmentMarks.length > 0 && (
// //               <p className="mt-1 text-[11px] sm:text-xs text-gray-500">
// //                 Top scores:{" "}
// //                 <span className="font-medium text-gray-700">
// //                   {assignmentMarks.join(", ")}
// //                 </span>
// //               </p>
// //             )}
// //           </div>

// //           <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3 sm:py-4">
// //             <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">
// //               Written Exam
// //             </p>
// //             <p className="mt-2 text-xl sm:text-2xl font-bold text-indigo-600">
// //               {writtenMark}
// //             </p>
// //           </div>

// //           <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3 sm:py-4">
// //             <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">
// //               Attendance
// //             </p>
// //             <p className="mt-2 text-xl sm:text-2xl font-bold text-emerald-600">
// //               {attendanceMark}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Table */}
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
// //           <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
// //             <h2 className="text-sm sm:text-base font-semibold text-gray-900">
// //               Assignment-wise Breakdown
// //             </h2>
// //             <span className="text-[10px] sm:text-xs text-gray-500">
// //               All submitted assignments for this course
// //             </span>
// //           </div>

// //           <div className="overflow-x-auto">
// //             <table className="min-w-[800px] w-full text-xs sm:text-sm border-t border-gray-100">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
// //                     Class Name
// //                   </th>
// //                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
// //                     Assignment Title
// //                   </th>
// //                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
// //                     Submission
// //                   </th>
// //                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-semibold text-gray-600 border-b border-gray-200">
// //                     Mark
// //                   </th>
// //                   {/* 🔹 NEW Review Column */}
// //                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-semibold text-gray-600 border-b border-gray-200">
// //                     Review
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {students.map((studentClass) =>
// //                   studentClass.assignments.length > 0 ? (
// //                     studentClass.assignments.map((assignment) => (
// //                       <tr
// //                         key={assignment._id}
// //                         className="hover:bg-gray-50 transition-colors"
// //                       >
// //                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-800 border-b border-gray-100 align-top">
// //                           {studentClass.title}
// //                         </td>
// //                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 border-b border-gray-100 align-top">
// //                           {assignment.title}
// //                         </td>
// //                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 align-top">
// //                           {assignment.submissions?.length > 0 ? (
// //                             assignment.submissions.map((submission) =>
// //                               submission.student === studentId ? (
// //                                 <div key={submission._id}>
// //                                   <Link
// //                                     to={`http://localhost:5004/dashboard/showallclass/${submission.fileUrl}`}
// //                                     target="_blank"
// //                                     rel="noopener noreferrer"
// //                                     className="text-blue-600 hover:underline text-xs sm:text-sm font-medium"
// //                                   >
// //                                     View Submission
// //                                   </Link>
// //                                 </div>
// //                               ) : null
// //                             )
// //                           ) : (
// //                             <span className="text-[11px] text-red-500">
// //                               No submission yet
// //                             </span>
// //                           )}
// //                         </td>
// //                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 text-center align-top">
// //                           {assignment.submissions.length > 0 ? (
// //                             assignment.submissions.map((submission) =>
// //                               submission.student === studentId &&
// //                               submission.mark != null &&
// //                               submission.mark !== 0 ? (
// //                                 <span
// //                                   key={submission._id}
// //                                   className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold ${
// //                                     submission.mark >= 40
// //                                       ? "bg-green-50 text-green-700 border border-green-200"
// //                                       : "bg-red-50 text-red-700 border border-red-200"
// //                                   }`}
// //                                 >
// //                                   {submission.mark}
// //                                 </span>
// //                               ) : null
// //                             )
// //                           ) : (
// //                             <span className="text-[11px] text-gray-500">
// //                               No mark assigned
// //                             </span>
// //                           )}
// //                         </td>

// //                         {/* 🔹 NEW Review Cell with "View Review" button */}
// //                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 text-center align-top">
// //                           {assignment.submissions.length > 0 ? (
// //                             assignment.submissions.map((submission) =>
// //                               submission.student === studentId ? (
// //                                 <button
// //                                   key={submission._id}
// //                                   type="button"
// //                                   onClick={() => {
// //                                     setSelectedReview(
// //                                       submission.review ||
// //                                         "No review has been added yet."
// //                                     );
// //                                     setIsReviewModalOpen(true);
// //                                   }}
// //                                   className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[11px] sm:text-xs font-medium hover:bg-blue-100 transition"
// //                                 >
// //                                   View Review
// //                                 </button>
// //                               ) : null
// //                             )
// //                           ) : (
// //                             <span className="text-[11px] text-gray-400">
// //                               —
// //                             </span>
// //                           )}
// //                         </td>
// //                       </tr>
// //                     ))
// //                   ) : null
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>

// //         {/* Total Marks */}
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-5 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
// //           <div>
// //             <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">
// //               Final Course Marks
// //             </p>
// //             <p className="mt-1.5 text-xl sm:text-2xl font-bold text-gray-900">
// //               {totalMarks.toFixed(2)} / 100
// //               <span
// //                 className={`ml-2 sm:ml-3 text-xs sm:text-sm font-semibold ${
// //                   isPass ? "text-green-600" : "text-red-600"
// //                 }`}
// //               >
// //                 ({isPass ? "Pass" : "Fail"})
// //               </span>
// //             </p>
// //           </div>
// //         </div>

// //         {/* Certificate */}
// //         <div className="flex justify-center">
// //           {CertificateData ? (
// //             <Link
// //               className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 mt-1 sm:mt-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition text-xs sm:text-sm font-semibold"
// //               target="_blank"
// //               to={`${CertificateData.image}`}
// //             >
// //               🎓 Download Certificate
// //             </Link>
// //           ) : (
// //             <p className="text-[11px] sm:text-xs text-gray-500 mt-2">
// //               Certificate will be available once issued.
// //             </p>
// //           )}
// //         </div>
// //       </div>

// //       {/* 🔹 Review Modal */}
// //       {isReviewModalOpen && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
// //           <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-5 sm:p-6">
// //             <h3 className="text-base sm:text-lg font-semibold text-gray-900">
// //               Assignment Review
// //             </h3>
// //             <p className="mt-3 text-sm sm:text-[15px] text-gray-700 whitespace-pre-line">
// //               {selectedReview || "No review available for this assignment yet."}
// //             </p>
// //             <div className="mt-5 flex justify-end">
// //               <button
// //                 type="button"
// //                 onClick={() => setIsReviewModalOpen(false)}
// //                 className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Result;



import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "../../../provider/AuthProvider";
import { Loader } from "lucide-react";
import { getBaseUrl } from "../../../utils/baseUrl";

const Result = () => {
  const { courseId, studentId } = useParams();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [assignmentMarks, setAssignmentMarks] = useState([]);
  const [totalAssignmentMark, setTotalAssignmentMark] = useState(0);
  const [writtenMark, setWrittenMark] = useState(0);
  const [attendanceMark, setAttendanceMark] = useState(0);
  const [CertificateData, setCertificateData] = useState();

  const { user } = useContext(AuthContext);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState("");

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const response = await axios.get(
          `${getBaseUrl()}/course/courses/${courseId}/students`,
          getAuthHeader()
        );

        const classes = response.data.classes || [];
        setStudents(classes);

        const marks = [];

        classes.forEach((studentClass) => {
          studentClass.assignments?.forEach((assignment) => {
            assignment.submissions?.forEach((submission) => {
              const submittedStudentId =
                submission.student?._id || submission.student;

              if (
                String(submittedStudentId) === String(studentId) &&
                submission.mark != null
              ) {
                marks.push(Number(submission.mark));
              }
            });
          });
        });

        marks.sort((a, b) => b - a);
        setAssignmentMarks(marks);

        let assignmentTotal = 0;

        if (marks.length > 0) {
          if (marks.length >= 2) {
            assignmentTotal = (marks[0] + marks[1]) / 2;
          } else {
            assignmentTotal = marks[0];
          }
        }

        setTotalAssignmentMark(assignmentTotal);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch enrolled students."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledStudents();
  }, [courseId, studentId]);

  useEffect(() => {
    const fetchAdditionalMarks = async () => {
      if (!studentId || !courseId) return;

      try {
        const response = await axios.get(
          `${getBaseUrl()}/course/${courseId}/${studentId}`,
          getAuthHeader()
        );

        setWrittenMark(response.data.writtenMark || 0);
        setAttendanceMark(response.data.attendanceMark || 0);
      } catch (err) {
        if (err.response?.status === 404) {
          setWrittenMark(0);
          setAttendanceMark(0);
        } else {
          console.error("Error fetching additional marks:", err);
        }
      }
    };

    fetchAdditionalMarks();
  }, [courseId, studentId]);

  useEffect(() => {
    const fetchCertificateData = async () => {
      try {
        const response = await axios.get(
          `${getBaseUrl()}/api/certificate/certificates/${courseId}/${studentId}`,
          getAuthHeader()
        );

        setCertificateData(response.data);
      } catch (err) {
        console.error("Error fetching certificate data:", err);
      }
    };

    fetchCertificateData();
  }, [courseId, studentId]);

  const calculateTotalMarks = () => {
    return (
      Number(totalAssignmentMark || 0) +
      Number(writtenMark || 0) +
      Number(attendanceMark || 0)
    );
  };

  const totalMarks = calculateTotalMarks();
  const isPass = totalMarks >= 40;

  const isFinalEvaluationPending =
    Number(writtenMark || 0) === 0 && Number(attendanceMark || 0) === 0;

  const getBscGrade = (mark) => {
    const num = Number(mark || 0);

    if (num >= 80) return "A+";
    if (num >= 75) return "A";
    if (num >= 70) return "A-";
    if (num >= 65) return "B+";
    if (num >= 60) return "B";
    if (num >= 55) return "B-";
    if (num >= 50) return "C+";
    if (num >= 45) return "C";
    if (num >= 40) return "D";
    return "F";
  };

  const finalGrade = getBscGrade(totalMarks);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">
            Loading your Result...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
        <div className="bg-white rounded-2xl shadow-md border border-red-200 px-5 py-6 sm:px-6 sm:py-8 text-center max-w-md w-full">
          <h2 className="text-base sm:text-lg font-semibold text-red-700 mb-2">
            Something went wrong
          </h2>
          <p className="text-xs sm:text-sm text-red-600 mb-4">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-4 py-2.5 sm:px-5 sm:py-2.5 bg-red-600 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-red-700 transition w-full sm:w-auto"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto space-y-5 sm:space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-5 md:px-7 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-gray-400 font-semibold">
              Course Result
            </p>

            <h1 className="mt-1 text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Student Performance Summary
            </h1>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5">
            {isFinalEvaluationPending ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                Result Status:&nbsp;
                <span>Pending Final Evaluation</span>
              </span>
            ) : (
              <>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                    isPass
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  Overall Status:&nbsp;
                  <span>{isPass ? "Pass" : "Fail"}</span>
                </span>

                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                    finalGrade === "F"
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  Grade:&nbsp;
                  <span>{finalGrade}</span>
                </span>
              </>
            )}

            <span className="text-[11px] sm:text-xs text-gray-500">
              Total Marks:{" "}
              <span className="font-semibold text-gray-800">
                {totalMarks.toFixed(2)} / 100
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3 sm:py-4">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">
              Assignment Average
            </p>

            <p className="mt-2 text-xl sm:text-2xl font-bold text-blue-600">
              {totalAssignmentMark.toFixed(2)}
            </p>

            {assignmentMarks.length > 0 && (
              <p className="mt-1 text-[11px] sm:text-xs text-gray-500">
                Top scores:{" "}
                <span className="font-medium text-gray-700">
                  {assignmentMarks.join(", ")}
                </span>
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3 sm:py-4">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">
              Written Exam
            </p>

            <p className="mt-2 text-xl sm:text-2xl font-bold text-indigo-600">
              {writtenMark}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3 sm:py-4">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">
              Attendance
            </p>

            <p className="mt-2 text-xl sm:text-2xl font-bold text-emerald-600">
              {attendanceMark}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">
              Assignment-wise Breakdown
            </h2>

            <span className="text-[10px] sm:text-xs text-gray-500">
              All submitted assignments for this course
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full text-xs sm:text-sm border-t border-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
                    Class Name
                  </th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
                    Assignment Title
                  </th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
                    Submission
                  </th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-semibold text-gray-600 border-b border-gray-200">
                    Mark
                  </th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-semibold text-gray-600 border-b border-gray-200">
                    Review
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.map((studentClass) =>
                  studentClass.assignments?.length > 0
                    ? studentClass.assignments.map((assignment) => (
                        <tr
                          key={assignment._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-800 border-b border-gray-100 align-top">
                            {studentClass.title}
                          </td>

                          <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 border-b border-gray-100 align-top">
                            {assignment.title}
                          </td>

                          <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 align-top">
                            {assignment.submissions?.length > 0 ? (
                              assignment.submissions.map((submission) => {
                                const submittedStudentId =
                                  submission.student?._id || submission.student;

                                return String(submittedStudentId) ===
                                  String(studentId) ? (
                                  <div key={submission._id}>
                                    <Link
                                      to={submission.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline text-xs sm:text-sm font-medium"
                                    >
                                      View Submission
                                    </Link>
                                  </div>
                                ) : null;
                              })
                            ) : (
                              <span className="text-[11px] text-red-500">
                                No submission yet
                              </span>
                            )}
                          </td>

                          <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 text-center align-top">
                            {assignment.submissions?.length > 0 ? (
                              assignment.submissions.map((submission) => {
                                const submittedStudentId =
                                  submission.student?._id || submission.student;

                                return String(submittedStudentId) ===
                                  String(studentId) &&
                                  submission.mark != null &&
                                  submission.mark !== 0 ? (
                                  <span
                                    key={submission._id}
                                    className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold ${
                                      submission.mark >= 40
                                        ? "bg-green-50 text-green-700 border border-green-200"
                                        : "bg-red-50 text-red-700 border border-red-200"
                                    }`}
                                  >
                                    {submission.mark}
                                  </span>
                                ) : null;
                              })
                            ) : (
                              <span className="text-[11px] text-gray-500">
                                No mark assigned
                              </span>
                            )}
                          </td>

                          <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 text-center align-top">
                            {assignment.submissions?.length > 0 ? (
                              assignment.submissions.map((submission) => {
                                const submittedStudentId =
                                  submission.student?._id || submission.student;

                                return String(submittedStudentId) ===
                                  String(studentId) ? (
                                  <button
                                    key={submission._id}
                                    type="button"
                                    onClick={() => {
                                      setSelectedReview(
                                        submission.review ||
                                          "No review has been added yet."
                                      );
                                      setIsReviewModalOpen(true);
                                    }}
                                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[11px] sm:text-xs font-medium hover:bg-blue-100 transition"
                                  >
                                    View Review
                                  </button>
                                ) : null;
                              })
                            ) : (
                              <span className="text-[11px] text-gray-400">
                                —
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    : null
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-5 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">
              Final Course Marks
            </p>

            <p className="mt-1.5 text-xl sm:text-2xl font-bold text-gray-900">
              {totalMarks.toFixed(2)} / 100

              {isFinalEvaluationPending ? (
                <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-semibold text-gray-500">
                  (Pending Final Evaluation)
                </span>
              ) : (
                <>
                  <span
                    className={`ml-2 sm:ml-3 text-xs sm:text-sm font-semibold ${
                      isPass ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ({isPass ? "Pass" : "Fail"})
                  </span>

                  <span
                    className={`ml-2 sm:ml-3 text-xs sm:text-sm font-semibold ${
                      finalGrade === "F" ? "text-red-600" : "text-blue-600"
                    }`}
                  >
                    (Grade: {finalGrade})
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          {CertificateData ? (
            <Link
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 mt-1 sm:mt-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition text-xs sm:text-sm font-semibold"
              target="_blank"
              to={`${CertificateData.image}`}
            >
              🎓 Download Certificate
            </Link>
          ) : (
            <p className="text-[11px] sm:text-xs text-gray-500 mt-2">
              Certificate will be available once issued.
            </p>
          )}
        </div>
      </div>

      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Assignment Review
            </h3>

            <p className="mt-3 text-sm sm:text-[15px] text-gray-700 whitespace-pre-line">
              {selectedReview || "No review available for this assignment yet."}
            </p>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;