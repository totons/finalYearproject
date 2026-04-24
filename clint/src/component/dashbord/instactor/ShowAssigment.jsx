// // // import React, { useEffect, useState, useCallback } from "react";
// // // import { Link, useParams } from "react-router-dom";
// // // import Cookies from "js-cookie";
// // // import axios from "axios";
// // // import { Loader } from "lucide-react";
// // // import { getBaseUrl } from "../../../utils/baseUrl";
// // // import Swal from 'sweetalert2';
// // // const ShowAssignment = () => {
// // //   const { courseId, studentId } = useParams();
// // //   const [students, setStudents] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const [marks, setMarks] = useState({});
// // //   const [submittedMarks, setSubmittedMarks] = useState({});
// // //   const [total, setTotal] = useState(0);
// // //   const [writtenMark, setWrittenMark] = useState(0);
// // //   const [attendanceMark, setAttendanceMark] = useState(0);
// // //   const [additionalMarksLoaded, setAdditionalMarksLoaded] = useState(false);
// // //   const token = Cookies.get("token");

// // //   // --- Review modal state ---
// // //   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
// // //   const [reviewText, setReviewText] = useState("");
// // //   const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
// // //   const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);

// // //   const openReviewModal = (assignmentId, submission) => {
// // //     setSelectedAssignmentId(assignmentId);
// // //     setSelectedSubmissionId(submission._id);
// // //     setReviewText(submission.review || "");
// // //     setIsReviewModalOpen(true);
// // //   };

// // //   const closeReviewModal = () => {
// // //     setIsReviewModalOpen(false);
// // //     setSelectedAssignmentId(null);
// // //     setSelectedSubmissionId(null);
// // //     setReviewText("");
// // //   };

// // //   const handleSubmitReview = async () => {
// // //     if (!selectedAssignmentId || !selectedSubmissionId) return;

// // //     try {
// // //       await axios.patch(
// // //         `${getBaseUrl()}/api/assignments/${selectedAssignmentId}/submissions/${selectedSubmissionId}/review`,
// // //         { review: reviewText },
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );
// // //       Swal.fire({
// // //                 position: 'center',
// // //                 icon: 'success',
// // //                 title: 'Review saved successfully.',
// // //                 showConfirmButton: false,
// // //                 timer: 900,
// // //             });

// // //       // alert("Review saved successfully.");
// // //       closeReviewModal();
// // //       fetchAllData();
// // //     } catch (err) {
// // //       console.error("Error saving review:", err);
// // //       Swal.fire({
// // //                 position: 'center',
// // //                 icon: 'error',
// // //                 title: 'Failed to save review.',
// // //                 showConfirmButton: false,
// // //                 timer: 900,
// // //             });
// // //       // alert(err.response?.data?.message || "Failed to save review.");
// // //     }
// // //   };

// // //   // --------- Fetchers ----------
// // //   const fetchStudentsAndAssignments = useCallback(async () => {
// // //     try {
// // //       const response = await axios.get(
// // //         `${getBaseUrl()}/course/courses/${courseId}/students`,
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );
// // //       setStudents(response.data.classes || []);
// // //       return true;
// // //     } catch (err) {
// // //       console.error("Error fetching students:", err);
// // //       setError(
// // //         err.response?.data?.message || "Failed to fetch students."
// // //       );
// // //       return false;
// // //     }
// // //   }, [courseId, token]);

// // //   const fetchAdditionalMarks = useCallback(async () => {
// // //     if (!studentId || !courseId) return false;

// // //     try {
// // //       const response = await axios.get(
// // //         `${getBaseUrl()}/course/${courseId}/${studentId}`
// // //       );
// // //       setWrittenMark(response.data.writtenMark || 0);
// // //       setAttendanceMark(response.data.attendanceMark || 0);
// // //       setAdditionalMarksLoaded(true);
// // //       return true;
// // //     } catch (err) {
// // //       if (err.response?.status === 404) {
// // //         setWrittenMark(0);
// // //         setAttendanceMark(0);
// // //         console.log(
// // //           "No existing marks found for this student - normal for new students"
// // //         );
// // //         setAdditionalMarksLoaded(true);
// // //         return true;
// // //       }
// // //       console.error("Error fetching additional marks:", err);
// // //       return false;
// // //     }
// // //   }, [courseId, studentId]);

// // //   const fetchTotalMarks = useCallback(async () => {
// // //     try {
// // //       const response = await axios.get(
// // //         `${getBaseUrl()}/user/${studentId}/${courseId}`
// // //       );
// // //       setTotal(response.data.totalMark || 0);
// // //       return true;
// // //     } catch (err) {
// // //       console.error("Error fetching total marks:", err);
// // //       return false;
// // //     }
// // //   }, [courseId, studentId]);

// // //   const fetchAllData = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       await Promise.all([
// // //         fetchStudentsAndAssignments(),
// // //         fetchAdditionalMarks(),
// // //         fetchTotalMarks(),
// // //       ]);
// // //     } catch (error) {
// // //       console.error("Error fetching data:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [fetchStudentsAndAssignments, fetchAdditionalMarks, fetchTotalMarks]);

// // //   useEffect(() => {
// // //     fetchAllData();
// // //   }, [fetchAllData]);

// // //   // --------- Mark handlers ----------
// // //   const handleMarkChange = (submissionId, value) => {
// // //     setMarks((prevMarks) => ({
// // //       ...prevMarks,
// // //       [submissionId]: value,
// // //     }));
// // //   };

// // //   const handleSubmitMark = async (submissionId) => {
// // //     const mark = marks[submissionId];
// // //     if (isNaN(mark) || mark === "") {
// // //       setError("Please enter a valid mark.");
// // //       return;
// // //     }

// // //     try {
// // //       const response = await axios.patch(
// // //         `${getBaseUrl()}/api/assignments/submit-mark/${submissionId}/${studentId}`,
// // //         { mark: parseInt(mark, 10) },
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );

// // //       setSubmittedMarks((prev) => ({
// // //         ...prev,
// // //         [submissionId]: true,
// // //       }));

// // //       alert(response.data.message);
// // //       fetchAllData();
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || "An error occurred.");
// // //     }
// // //   };

// // //   const handleWrittenMarkChange = (e) => {
// // //     setWrittenMark(e.target.value);
// // //   };

// // //   const handleAttendanceMarkChange = (e) => {
// // //     setAttendanceMark(e.target.value);
// // //   };

// // //   const handleSubmitAdditionalMarks = async () => {
// // //     if (
// // //       (isNaN(writtenMark) || writtenMark === "") ||
// // //       (isNaN(attendanceMark) || attendanceMark === "")
// // //     ) {
// // //       setError("Please enter valid marks for written and attendance.");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     let submissionSuccessful = false;

// // //     try {
// // //       await axios.post(
// // //         `${getBaseUrl()}/course/${courseId}`,
// // //         {
// // //           studentId: studentId,
// // //           writtenMark: parseInt(writtenMark, 10),
// // //           attendanceMark: parseInt(attendanceMark, 10),
// // //         },
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );

// // //       Swal.fire({
// // //                 position: 'center',
// // //                 icon: 'success',
// // //                 title: 'Written and Attendance marks added successfully!',
// // //                 showConfirmButton: false,
// // //                 timer: 900,
// // //             });
// // //       // alert("Written and Attendance marks added successfully!");
// // //       submissionSuccessful = true;
// // //     } catch (err) {
// // //       alert(err.response?.data?.message || "Unknown error");
// // //       console.error("Error submitting additional marks:", err);
// // //     }

// // //     try {
// // //       const studentsResponse = await axios.get(
// // //         `${getBaseUrl()}/course/courses/${courseId}/students`,
// // //         {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         }
// // //       );
// // //       setStudents(studentsResponse.data.classes);

// // //       const additionalMarksResponse = await axios.get(
// // //         `${getBaseUrl()}/course/${courseId}/${studentId}`
// // //       );
// // //       setWrittenMark(additionalMarksResponse.data.writtenMark || 0);
// // //       setAttendanceMark(additionalMarksResponse.data.attendanceMark || 0);

// // //       const totalMarksResponse = await axios.get(
// // //         `${getBaseUrl()}/user/${studentId}/${courseId}`
// // //       );
// // //       setTotal(totalMarksResponse.data.totalMark || 0);
// // //     } catch (refreshError) {
// // //       console.error("Error refreshing data:", refreshError);
// // //       if (submissionSuccessful) {
// // //         alert(
// // //           "Marks submitted successfully, but there was an error refreshing the displayed data."
// // //         );
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const totalCourseMarks =
// // //     total + parseInt(writtenMark || 0) + parseInt(attendanceMark || 0);
// // //   const isPass = totalCourseMarks >= 40;

// // //   // ---------- UI States ----------
// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
// // //                 <div className="text-center">
// // //                     <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
// // //                     <p className="text-lg font-semibold text-gray-700">Loading your result...</p>
// // //                 </div>
// // //             </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
// // //         <div className="bg-white rounded-2xl shadow-md border border-red-200 px-6 py-8 text-center max-w-md w-full">
// // //           <h2 className="text-lg font-semibold text-red-700 mb-2">
// // //             Error
// // //           </h2>
// // //           <p className="text-sm text-red-600 mb-4">{error}</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
// // //       <div className="max-w-6xl mx-auto space-y-6">
// // //         {/* Header */}
// // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
// // //           <div>
// // //             {/* <p className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-gray-400 font-semibold">
// // //               Course Assessment
// // //             </p> */}
// // //             <h1 className="mt-1 text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
// // //               Assignment Evaluation
// // //             </h1>
// // //             {/* <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
// // //               Student ID:{" "}
// // //               <span className="font-medium text-gray-700">
// // //                 {studentId}
// // //               </span>
// // //             </p> */}
// // //           </div>

// // //           <div className="flex flex-col items-start sm:items-end gap-1.5">
// // //             <span
// // //               className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-sm font-semibold ${
// // //                 isPass
// // //                   ? "bg-green-50 text-green-700 border border-green-200"
// // //                   : "bg-red-50 text-red-700 border border-red-200"
// // //               }`}
// // //             >
// // //               Overall Status:&nbsp;
// // //               <span>{isPass ? "Pass" : "Fail"}</span>
// // //             </span>
// // //             <span className="text-[11px] sm:text-sm text-gray-500">
// // //               Total Course Marks:{" "}
// // //               <span className="font-semibold text-gray-800">
// // //                 {totalCourseMarks.toFixed(2)} / 100
// // //               </span>
// // //             </span>
// // //           </div>
// // //         </div>

// // //         {/* Table Card */}
// // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
// // //           <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
// // //             <h2 className="text-sm sm:text-xl font-semibold text-gray-900">
// // //               Assignment-wise Breakdown
// // //             </h2>
// // //             <span className="text-[10px] sm:text-sm text-gray-500">
// // //               All submissions and marks for this student
// // //             </span>
// // //           </div>

// // //           <div className="overflow-x-auto">
// // //             <table className="min-w-[880px] w-full text-xs sm:text-sm border-t border-gray-100">
// // //               <thead className="bg-gray-50">
// // //                 <tr>
// // //                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
// // //                     Class Name
// // //                   </th>
// // //                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
// // //                     Assignment Title
// // //                   </th>
// // //                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
// // //                     Submission
// // //                   </th>
// // //                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
// // //                     Mark 
// // //                   </th>
// // //                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
// // //                     Review
// // //                   </th>
// // //                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-semibold text-gray-600 border-b border-gray-200">
// // //                     Final Mark
// // //                   </th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {students.map((studentClass) =>
// // //                   studentClass.assignments.length > 0 ? (
// // //                     studentClass.assignments.map((assignment) => (
// // //                       <tr
// // //                         key={assignment._id}
// // //                         className="hover:bg-gray-50 transition-colors"
// // //                       >
// // //                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-800 border-b border-gray-100 align-top">
// // //                           {studentClass.title}
// // //                         </td>
// // //                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 border-b border-gray-100 align-top">
// // //                           {assignment.title}
// // //                         </td>
// // //                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 align-top">
// // //                           {assignment.submissions?.length > 0 ? (
// // //                             assignment.submissions.map((submission) =>
// // //                               submission.student === studentId ? (
// // //                                 <div key={submission._id} className="space-y-1">
// // //                                   <Link
// // //                                     to={`http://localhost:5004/dashboard/showallclass/${submission.fileUrl}`}
// // //                                     target="_blank"
// // //                                     rel="noopener noreferrer"
// // //                                     className="text-blue-600 hover:underline text-xs sm:text-sm font-medium"
// // //                                   >
// // //                                     View Submission
// // //                                   </Link>
// // //                                   {/* {submission.review && (
// // //                                     <p className="text-[11px] text-gray-500 italic line-clamp-2">
// // //                                       “{submission.review}”
// // //                                     </p>
// // //                                   )} */}
// // //                                 </div>
// // //                               ) : null
// // //                             )
// // //                           ) : (
// // //                             <span className="text-[11px] text-red-500">
// // //                               No submission yet
// // //                             </span>
// // //                           )}
// // //                         </td>

// // //                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 align-top">
// // //                           {assignment.submissions?.length > 0 ? (
// // //                             assignment.submissions.map((submission) =>
// // //                               submission.student === studentId ? (
// // //                                 <div
// // //                                   key={submission._id}
// // //                                   className="space-y-2"
// // //                                 >
// // //                                   {/* Mark */}
// // //                                   {submission.mark > 0 ||
// // //                                   submittedMarks[submission._id] ? (
// // //                                     <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-[11px] sm:text-xs font-semibold">
// // //                                       {submission.mark || marks[submission._id]}
// // //                                     </span>
// // //                                   ) : (
// // //                                     <div className="flex flex-col sm:flex-row gap-2">
// // //                                       <input
// // //                                         type="number"
// // //                                         placeholder="Enter mark"
// // //                                         value={marks[submission._id] || ""}
// // //                                         onChange={(e) =>
// // //                                           handleMarkChange(
// // //                                             submission._id,
// // //                                             e.target.value
// // //                                           )
// // //                                         }
// // //                                         className="border border-gray-300 rounded-md px-2 py-1 text-xs sm:text-sm w-full sm:w-24 focus:outline-none focus:ring-1 focus:ring-blue-500"
// // //                                       />
// // //                                       <button
// // //                                         onClick={() =>
// // //                                           handleSubmitMark(submission._id)
// // //                                         }
// // //                                         className="inline-flex items-center justify-center px-3 py-1.5 text-xs sm:text-sm rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
// // //                                       >
// // //                                         Submit
// // //                                       </button>
// // //                                     </div>
// // //                                   )}

// // //                                   {/* Review button */}
// // //                                   {/* <button
// // //                                     type="button"
// // //                                     onClick={() =>
// // //                                       openReviewModal(assignment._id, submission)
// // //                                     }
// // //                                     className="inline-flex items-center justify-center px-3 py-1.5 text-[11px] sm:text-xs rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
// // //                                   >
// // //                                     {submission.review
// // //                                       ? "Edit Review"
// // //                                       : "Add Review"}
// // //                                   </button> */}
// // //                                 </div>
// // //                               ) : null
// // //                             )
// // //                           ) : (
// // //                             <span className="text-[11px] text-gray-500">
// // //                               -
// // //                             </span>
// // //                           )}
// // //                         </td>


// // //                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 border-b border-gray-100 align-top">
// // //                           {assignment.submissions?.length > 0 ? (
// // //                             assignment.submissions.map((submission) =>
// // //                               submission.student === studentId ? (
// // //                                 <div
// // //                                   key={submission._id}
// // //                                   className="space-y-2"
// // //                                 >
// // //                                   {/* Mark */}
// // //                                   {/* {submission.mark > 0 ||
// // //                                   submittedMarks[submission._id] ? (
// // //                                     <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-[11px] sm:text-xs font-semibold">
// // //                                       {submission.mark || marks[submission._id]}
// // //                                     </span>
// // //                                   ) : (
// // //                                     <div className="flex flex-col sm:flex-row gap-2">
// // //                                       <input
// // //                                         type="number"
// // //                                         placeholder="Enter mark"
// // //                                         value={marks[submission._id] || ""}
// // //                                         onChange={(e) =>
// // //                                           handleMarkChange(
// // //                                             submission._id,
// // //                                             e.target.value
// // //                                           )
// // //                                         }
// // //                                         className="border border-gray-300 rounded-md px-2 py-1 text-xs sm:text-sm w-full sm:w-24 focus:outline-none focus:ring-1 focus:ring-blue-500"
// // //                                       />
// // //                                       <button
// // //                                         onClick={() =>
// // //                                           handleSubmitMark(submission._id)
// // //                                         }
// // //                                         className="inline-flex items-center justify-center px-3 py-1.5 text-xs sm:text-sm rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
// // //                                       >
// // //                                         Submit
// // //                                       </button>
// // //                                     </div>
// // //                                   )} */}

// // //                                   {/* Review button */}
// // //                                   <button
// // //                                     type="button"
// // //                                     onClick={() =>
// // //                                       openReviewModal(assignment._id, submission)
// // //                                     }
// // //                                     className="inline-flex items-center justify-center px-3 py-1.5 text-[11px] sm:text-xs rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
// // //                                   >
// // //                                     {submission.review
// // //                                       ? "Edit Review"
// // //                                       : "Add Review"}
// // //                                   </button>
// // //                                 </div>
// // //                               ) : null
// // //                             )
// // //                           ) : (
// // //                             <span className="text-[11px] text-gray-500">
// // //                               -
// // //                             </span>
// // //                           )}
// // //                         </td>

// // //                         <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 text-center align-top">
// // //                           {assignment.submissions.length > 0 ? (
// // //                             assignment.submissions.map((submission) =>
// // //                               submission.student === studentId &&
// // //                               submission.mark != null ? (
// // //                                 <span
// // //                                   key={submission._id}
// // //                                   className={`inline-flex px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold ${
// // //                                     submission.mark >= 40
// // //                                       ? "bg-green-50 text-green-700 border border-green-200"
// // //                                       : "bg-red-50 text-red-700 border border-red-200"
// // //                                   }`}
// // //                                 >
// // //                                   {submission.mark}
// // //                                 </span>
// // //                               ) : null
// // //                             )
// // //                           ) : (
// // //                             <span className="text-[11px] text-gray-500">
// // //                               No mark assigned
// // //                             </span>
// // //                           )}
// // //                         </td>
// // //                       </tr>
// // //                     ))
// // //                   ) : null
// // //                 )}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </div>

// // //         {/* Additional Marks Card */}
// // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-5 py-4 sm:py-5">
// // //           <h3 className="text-sm sm:text	base font-semibold text-gray-900 mb-3">
// // //             Additional Marks (Written & Attendance)
// // //           </h3>
// // //           <div className="flex flex-col md:flex-row gap-4">
// // //             <div className="flex-1">
// // //               <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // //                 Written Mark
// // //               </label>
// // //               <input
// // //                 type="number"
// // //                 min="0"
// // //                 value={writtenMark}
// // //                 onChange={handleWrittenMarkChange}
// // //                 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
// // //                 placeholder="Enter written mark"
// // //               />
// // //             </div>
// // //             <div className="flex-1">
// // //               <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // //                 Attendance Mark
// // //               </label>
// // //               <input
// // //                 type="number"
// // //                 min="0"
// // //                 value={attendanceMark}
// // //                 onChange={handleAttendanceMarkChange}
// // //                 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
// // //                 placeholder="Enter attendance mark"
// // //               />
// // //             </div>
// // //           </div>
// // //           <button
// // //             onClick={handleSubmitAdditionalMarks}
// // //             disabled={loading}
// // //             className={`mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white ${
// // //               loading
// // //                 ? "bg-gray-400 cursor-not-allowed"
// // //                 : "bg-emerald-600 hover:bg-emerald-700"
// // //             } transition`}
// // //           >
// // //             {loading ? "Submitting..." : "Submit Additional Marks"}
// // //           </button>
// // //         </div>

// // //         {/* Summary Card */}
// // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-5 py-4 sm:py-5">
// // //           <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
// // //             Course Marks Summary
// // //           </h3>
// // //           <div className="space-y-1 text-xs sm:text-sm text-gray-700">
// // //             <div>
// // //               <strong>Assignment Marks (Total):</strong> {total}
// // //             </div>
// // //             <div>
// // //               <strong>Written Mark:</strong> {writtenMark}
// // //             </div>
// // //             <div>
// // //               <strong>Attendance Mark:</strong> {attendanceMark}
// // //             </div>
// // //             <div className="pt-2 mt-2 border-t border-gray-200 text-base sm:text-lg font-bold">
// // //               <span>Total Marks for Course: {totalCourseMarks.toFixed(2)}</span>
// // //               <span
// // //                 className={`ml-2 sm:ml-3 text-sm sm:text-base ${
// // //                   isPass ? "text-green-600" : "text-red-600"
// // //                 }`}
// // //               >
// // //                 ({isPass ? "Pass" : "Fail"})
// // //               </span>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Review Modal */}
// // //       {isReviewModalOpen && (
// // //         <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
// // //           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 sm:p-6">
// // //             <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
// // //               {selectedSubmissionId ? "Add / Edit Review" : "Add Review"}
// // //             </h3>
// // //             <p className="text-[11px] sm:text-xs text-gray-500 mb-3">
// // //               Write feedback for this submission. This review can be shown to
// // //               the student.
// // //             </p>
// // //             <textarea
// // //               rows={4}
// // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
// // //               placeholder="Type your review here..."
// // //               value={reviewText}
// // //               onChange={(e) => setReviewText(e.target.value)}
// // //             />
// // //             <div className="mt-4 flex justify-end gap-2">
// // //               <button
// // //                 type="button"
// // //                 onClick={closeReviewModal}
// // //                 className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-100"
// // //               >
// // //                 Cancel
// // //               </button>
// // //               <button
// // //                 type="button"
// // //                 onClick={handleSubmitReview}
// // //                 className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700"
// // //               >
// // //                 Save Review
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default ShowAssignment;










// // import React, { useEffect, useState, useCallback } from "react";
// // import { Link, useParams } from "react-router-dom";
// // import Cookies from "js-cookie";
// // import axios from "axios";
// // import { Loader } from "lucide-react";
// // import { getBaseUrl } from "../../../utils/baseUrl";
// // import Swal from "sweetalert2";

// // const ShowAssignment = () => {
// //   const { courseId, studentId } = useParams();
// //   const [students, setStudents] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [marks, setMarks] = useState({});
// //   const [submittedMarks, setSubmittedMarks] = useState({});
// //   const [total, setTotal] = useState(0);
// //   const [writtenMark, setWrittenMark] = useState(0);
// //   const [attendanceMark, setAttendanceMark] = useState(0);
// //   const [additionalMarksLoaded, setAdditionalMarksLoaded] = useState(false);
// //   const token = Cookies.get("token");

// //   // --- Review modal state ---
// //   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
// //   const [reviewText, setReviewText] = useState("");
// //   const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
// //   const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);

// //   const openReviewModal = (assignmentId, submission) => {
// //     setSelectedAssignmentId(assignmentId);
// //     setSelectedSubmissionId(submission._id);
// //     setReviewText(submission.review || "");
// //     setIsReviewModalOpen(true);
// //   };

// //   const closeReviewModal = () => {
// //     setIsReviewModalOpen(false);
// //     setSelectedAssignmentId(null);
// //     setSelectedSubmissionId(null);
// //     setReviewText("");
// //   };

// //   const handleSubmitReview = async () => {
// //     if (!selectedAssignmentId || !selectedSubmissionId) return;

// //     try {
// //       await axios.patch(
// //         `${getBaseUrl()}/api/assignments/${selectedAssignmentId}/submissions/${selectedSubmissionId}/review`,
// //         { review: reviewText },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       Swal.fire({
// //         position: "center",
// //         icon: "success",
// //         title: "Review saved successfully.",
// //         showConfirmButton: false,
// //         timer: 900,
// //       });

// //       closeReviewModal();
// //       fetchAllData();
// //     } catch (err) {
// //       console.error("Error saving review:", err);
// //       Swal.fire({
// //         position: "center",
// //         icon: "error",
// //         title: "Failed to save review.",
// //         showConfirmButton: false,
// //         timer: 900,
// //       });
// //     }
// //   };

// //   // --------- Fetchers ----------
// //   const fetchStudentsAndAssignments = useCallback(async () => {
// //     try {
// //       const response = await axios.get(
// //         `${getBaseUrl()}/course/courses/${courseId}/students`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       setStudents(response.data.classes || []);
// //       return true;
// //     } catch (err) {
// //       console.error("Error fetching students:", err);
// //       setError(err.response?.data?.message || "Failed to fetch students.");
// //       return false;
// //     }
// //   }, [courseId, token]);

// //   const fetchAdditionalMarks = useCallback(async () => {
// //     if (!studentId || !courseId) return false;

// //     try {
// //       const response = await axios.get(`${getBaseUrl()}/course/${courseId}/${studentId}`);
// //       setWrittenMark(response.data.writtenMark || 0);
// //       setAttendanceMark(response.data.attendanceMark || 0);
// //       setAdditionalMarksLoaded(true);
// //       return true;
// //     } catch (err) {
// //       if (err.response?.status === 404) {
// //         setWrittenMark(0);
// //         setAttendanceMark(0);
// //         console.log("No existing marks found for this student - normal for new students");
// //         setAdditionalMarksLoaded(true);
// //         return true;
// //       }
// //       console.error("Error fetching additional marks:", err);
// //       return false;
// //     }
// //   }, [courseId, studentId]);

// //   const fetchTotalMarks = useCallback(async () => {
// //     try {
// //       const response = await axios.get(`${getBaseUrl()}/user/${studentId}/${courseId}`);
// //       setTotal(response.data.totalMark || 0);
// //       return true;
// //     } catch (err) {
// //       console.error("Error fetching total marks:", err);
// //       return false;
// //     }
// //   }, [courseId, studentId]);

// //   const fetchAllData = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       await Promise.all([
// //         fetchStudentsAndAssignments(),
// //         fetchAdditionalMarks(),
// //         fetchTotalMarks(),
// //       ]);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [fetchStudentsAndAssignments, fetchAdditionalMarks, fetchTotalMarks]);

// //   useEffect(() => {
// //     fetchAllData();
// //   }, [fetchAllData]);

// //   // --------- Mark handlers ----------
// //   const handleMarkChange = (submissionId, value) => {
// //     setMarks((prevMarks) => ({
// //       ...prevMarks,
// //       [submissionId]: value,
// //     }));
// //   };

// //   const handleSubmitMark = async (submissionId) => {
// //     const mark = marks[submissionId];
// //     if (isNaN(mark) || mark === "") {
// //       setError("Please enter a valid mark.");
// //       return;
// //     }

// //     try {
// //       const response = await axios.patch(
// //         `${getBaseUrl()}/api/assignments/submit-mark/${submissionId}/${studentId}`,
// //         { mark: parseInt(mark, 10) },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setSubmittedMarks((prev) => ({
// //         ...prev,
// //         [submissionId]: true,
// //       }));

// //       alert(response.data.message);
// //       fetchAllData();
// //     } catch (err) {
// //       setError(err.response?.data?.message || "An error occurred.");
// //     }
// //   };

// //   const handleWrittenMarkChange = (e) => {
// //     setWrittenMark(e.target.value);
// //   };

// //   const handleAttendanceMarkChange = (e) => {
// //     setAttendanceMark(e.target.value);
// //   };

// //   const handleSubmitAdditionalMarks = async () => {
// //     if (
// //       isNaN(writtenMark) ||
// //       writtenMark === "" ||
// //       isNaN(attendanceMark) ||
// //       attendanceMark === ""
// //     ) {
// //       setError("Please enter valid marks for written and attendance.");
// //       return;
// //     }

// //     setLoading(true);
// //     let submissionSuccessful = false;

// //     try {
// //       await axios.post(
// //         `${getBaseUrl()}/course/${courseId}`,
// //         {
// //           studentId: studentId,
// //           writtenMark: parseInt(writtenMark, 10),
// //           attendanceMark: parseInt(attendanceMark, 10),
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       Swal.fire({
// //         position: "center",
// //         icon: "success",
// //         title: "Written and Attendance marks added successfully!",
// //         showConfirmButton: false,
// //         timer: 900,
// //       });

// //       submissionSuccessful = true;
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Unknown error");
// //       console.error("Error submitting additional marks:", err);
// //     }

// //     try {
// //       const studentsResponse = await axios.get(
// //         `${getBaseUrl()}/course/courses/${courseId}/students`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       setStudents(studentsResponse.data.classes);

// //       const additionalMarksResponse = await axios.get(
// //         `${getBaseUrl()}/course/${courseId}/${studentId}`
// //       );
// //       setWrittenMark(additionalMarksResponse.data.writtenMark || 0);
// //       setAttendanceMark(additionalMarksResponse.data.attendanceMark || 0);

// //       const totalMarksResponse = await axios.get(
// //         `${getBaseUrl()}/user/${studentId}/${courseId}`
// //       );
// //       setTotal(totalMarksResponse.data.totalMark || 0);
// //     } catch (refreshError) {
// //       console.error("Error refreshing data:", refreshError);
// //       if (submissionSuccessful) {
// //         alert(
// //           "Marks submitted successfully, but there was an error refreshing the displayed data."
// //         );
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // --------- Final Result Logic ----------
// //   const totalCourseMarks =
// //     Number(total || 0) +
// //     Number(writtenMark || 0) +
// //     Number(attendanceMark || 0);

// //   // written=0 and attendance=0 হলে final evaluation pending
// //   const isFinalEvaluationPending =
// //     Number(writtenMark || 0) === 0 && Number(attendanceMark || 0) === 0;

// //   const getBscGrade = (mark) => {
// //     const num = Number(mark || 0);

// //     if (num >= 80) return "A+";
// //     if (num >= 75) return "A";
// //     if (num >= 70) return "A-";
// //     if (num >= 65) return "B+";
// //     if (num >= 60) return "B";
// //     if (num >= 55) return "B-";
// //     if (num >= 50) return "C+";
// //     if (num >= 45) return "C";
// //     if (num >= 40) return "D";
// //     return "F";
// //   };

// //   const finalGrade = getBscGrade(totalCourseMarks);
// //   const isPass = totalCourseMarks >= 40;

// //   // ---------- UI States ----------
// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
// //         <div className="text-center">
// //           <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
// //           <p className="text-lg font-semibold text-gray-700">Loading your result...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
// //         <div className="bg-white rounded-2xl shadow-md border border-red-200 px-6 py-8 text-center max-w-md w-full">
// //           <h2 className="text-lg font-semibold text-red-700 mb-2">Error</h2>
// //           <p className="text-sm text-red-600 mb-4">{error}</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
// //       <div className="max-w-6xl mx-auto space-y-6">
// //         {/* Header */}
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
// //           <div>
// //             <h1 className="mt-1 text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
// //               Assignment Evaluation
// //             </h1>
// //           </div>

// //           <div className="flex flex-col items-start sm:items-end gap-1.5">
// //             {isFinalEvaluationPending ? (
// //               <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-sm font-semibold bg-gray-50 text-gray-700 border border-gray-200">
// //                 Result Status:&nbsp;
// //                 <span>Pending Final Evaluation</span>
// //               </span>
// //             ) : (
// //               <div className="flex flex-wrap gap-2">
// //                 <span
// //                   className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-sm font-semibold ${
// //                     isPass
// //                       ? "bg-green-50 text-green-700 border border-green-200"
// //                       : "bg-red-50 text-red-700 border border-red-200"
// //                   }`}
// //                 >
// //                   Overall Status:&nbsp;
// //                   <span>{isPass ? "Pass" : "Fail"}</span>
// //                 </span>

// //                 <span
// //                   className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-sm font-semibold ${
// //                     finalGrade === "F"
// //                       ? "bg-red-50 text-red-700 border border-red-200"
// //                       : "bg-blue-50 text-blue-700 border border-blue-200"
// //                   }`}
// //                 >
// //                   Grade:&nbsp;
// //                   <span>{finalGrade}</span>
// //                 </span>
// //               </div>
// //             )}

// //             <span className="text-[11px] sm:text-sm text-gray-500">
// //               Total Course Marks:{" "}
// //               <span className="font-semibold text-gray-800">
// //                 {totalCourseMarks.toFixed(2)} / 100
// //               </span>
// //             </span>
// //           </div>
// //         </div>

// //         {/* Table Card */}
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
// //           <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
// //             <h2 className="text-sm sm:text-xl font-semibold text-gray-900">
// //               Assignment-wise Breakdown
// //             </h2>
// //             <span className="text-[10px] sm:text-sm text-gray-500">
// //               All submissions and marks for this student
// //             </span>
// //           </div>

// //           <div className="overflow-x-auto">
// //             <table className="min-w-[880px] w-full text-xs sm:text-sm border-t border-gray-100">
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
// //                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
// //                     Mark
// //                   </th>
// //                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
// //                     Review
// //                   </th>
// //                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-semibold text-gray-600 border-b border-gray-200">
// //                     Final Mark
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {students.map((studentClass) =>
// //                   studentClass.assignments.length > 0
// //                     ? studentClass.assignments.map((assignment) => (
// //                         <tr
// //                           key={assignment._id}
// //                           className="hover:bg-gray-50 transition-colors"
// //                         >
// //                           <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-800 border-b border-gray-100 align-top">
// //                             {studentClass.title}
// //                           </td>
// //                           <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 border-b border-gray-100 align-top">
// //                             {assignment.title}
// //                           </td>
// //                           <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 align-top">
// //                             {assignment.submissions?.length > 0 ? (
// //                               assignment.submissions.map((submission) =>
// //                                 submission.student === studentId ? (
// //                                   <div key={submission._id} className="space-y-1">
// //                                     <Link
// //                                       to={`${getBaseUrl()}/dashboard/showallclass/${submission.fileUrl}`}
// //                                       target="_blank"
// //                                       rel="noopener noreferrer"
// //                                       className="text-blue-600 hover:underline text-xs sm:text-sm font-medium"
// //                                     >
// //                                       View Submission
// //                                     </Link>
// //                                   </div>
// //                                 ) : null
// //                               )
// //                             ) : (
// //                               <span className="text-[11px] text-red-500">
// //                                 No submission yet
// //                               </span>
// //                             )}
// //                           </td>

// //                           <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 align-top">
// //                             {assignment.submissions?.length > 0 ? (
// //                               assignment.submissions.map((submission) =>
// //                                 submission.student === studentId ? (
// //                                   <div key={submission._id} className="space-y-2">
// //                                     {submission.mark > 0 || submittedMarks[submission._id] ? (
// //                                       <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-[11px] sm:text-xs font-semibold">
// //                                         {submission.mark || marks[submission._id]}
// //                                       </span>
// //                                     ) : (
// //                                       <div className="flex flex-col sm:flex-row gap-2">
// //                                         <input
// //                                           type="number"
// //                                           placeholder="Enter mark"
// //                                           value={marks[submission._id] || ""}
// //                                           onChange={(e) =>
// //                                             handleMarkChange(
// //                                               submission._id,
// //                                               e.target.value
// //                                             )
// //                                           }
// //                                           className="border border-gray-300 rounded-md px-2 py-1 text-xs sm:text-sm w-full sm:w-24 focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                                         />
// //                                         <button
// //                                           onClick={() =>
// //                                             handleSubmitMark(submission._id)
// //                                           }
// //                                           className="inline-flex items-center justify-center px-3 py-1.5 text-xs sm:text-sm rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
// //                                         >
// //                                           Submit
// //                                         </button>
// //                                       </div>
// //                                     )}
// //                                   </div>
// //                                 ) : null
// //                               )
// //                             ) : (
// //                               <span className="text-[11px] text-gray-500">-</span>
// //                             )}
// //                           </td>

// //                           <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 border-b border-gray-100 align-top">
// //                             {assignment.submissions?.length > 0 ? (
// //                               assignment.submissions.map((submission) =>
// //                                 submission.student === studentId ? (
// //                                   <div key={submission._id} className="space-y-2">
// //                                     <button
// //                                       type="button"
// //                                       onClick={() =>
// //                                         openReviewModal(assignment._id, submission)
// //                                       }
// //                                       className="inline-flex items-center justify-center px-3 py-1.5 text-[11px] sm:text-xs rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
// //                                     >
// //                                       {submission.review ? "Edit Review" : "Add Review"}
// //                                     </button>
// //                                   </div>
// //                                 ) : null
// //                               )
// //                             ) : (
// //                               <span className="text-[11px] text-gray-500">-</span>
// //                             )}
// //                           </td>

// //                           <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 text-center align-top">
// //                             {assignment.submissions.length > 0 ? (
// //                               assignment.submissions.map((submission) =>
// //                                 submission.student === studentId &&
// //                                 submission.mark != null ? (
// //                                   <span
// //                                     key={submission._id}
// //                                     className="inline-flex px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200"
// //                                   >
// //                                     {submission.mark}
// //                                   </span>
// //                                 ) : null
// //                               )
// //                             ) : (
// //                               <span className="text-[11px] text-gray-500">
// //                                 No mark assigned
// //                               </span>
// //                             )}
// //                           </td>
// //                         </tr>
// //                       ))
// //                     : null
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>

// //         {/* Additional Marks Card */}
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-5 py-4 sm:py-5">
// //           <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
// //             Additional Marks (Written & Attendance)
// //           </h3>
// //           <div className="flex flex-col md:flex-row gap-4">
// //             <div className="flex-1">
// //               <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                 Written Mark
// //               </label>
// //               <input
// //                 type="number"
// //                 min="0"
// //                 value={writtenMark}
// //                 onChange={handleWrittenMarkChange}
// //                 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                 placeholder="Enter written mark"
// //               />
// //             </div>
// //             <div className="flex-1">
// //               <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                 Attendance Mark
// //               </label>
// //               <input
// //                 type="number"
// //                 min="0"
// //                 value={attendanceMark}
// //                 onChange={handleAttendanceMarkChange}
// //                 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                 placeholder="Enter attendance mark"
// //               />
// //             </div>
// //           </div>
// //           <button
// //             onClick={handleSubmitAdditionalMarks}
// //             disabled={loading}
// //             className={`mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white ${
// //               loading
// //                 ? "bg-gray-400 cursor-not-allowed"
// //                 : "bg-emerald-600 hover:bg-emerald-700"
// //             } transition`}
// //           >
// //             {loading ? "Submitting..." : "Submit Additional Marks"}
// //           </button>
// //         </div>

// //         {/* Summary Card */}
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-5 py-4 sm:py-5">
// //           <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
// //             Course Marks Summary
// //           </h3>
// //           <div className="space-y-1 text-xs sm:text-sm text-gray-700">
// //             <div>
// //               <strong>Assignment Marks (Total):</strong> {total}
// //             </div>
// //             <div>
// //               <strong>Written Mark:</strong> {writtenMark}
// //             </div>
// //             <div>
// //               <strong>Attendance Mark:</strong> {attendanceMark}
// //             </div>

// //             <div className="pt-2 mt-2 border-t border-gray-200 text-base sm:text-lg font-bold">
// //               <span>Total Marks for Course: {totalCourseMarks.toFixed(2)}</span>

// //               {isFinalEvaluationPending ? (
// //                 <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-500">
// //                   (Pending Final Evaluation)
// //                 </span>
// //               ) : (
// //                 <>
// //                   <span
// //                     className={`ml-2 sm:ml-3 text-sm sm:text-base ${
// //                       isPass ? "text-green-600" : "text-red-600"
// //                     }`}
// //                   >
// //                     ({isPass ? "Pass" : "Fail"})
// //                   </span>

// //                   <span
// //                     className={`ml-2 sm:ml-3 text-sm sm:text-base ${
// //                       finalGrade === "F" ? "text-red-600" : "text-blue-600"
// //                     }`}
// //                   >
// //                     (Grade: {finalGrade})
// //                   </span>
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Review Modal */}
// //       {isReviewModalOpen && (
// //         <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
// //           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 sm:p-6">
// //             <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
// //               {selectedSubmissionId ? "Add / Edit Review" : "Add Review"}
// //             </h3>
// //             <p className="text-[11px] sm:text-xs text-gray-500 mb-3">
// //               Write feedback for this submission. This review can be shown to the student.
// //             </p>
// //             <textarea
// //               rows={4}
// //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
// //               placeholder="Type your review here..."
// //               value={reviewText}
// //               onChange={(e) => setReviewText(e.target.value)}
// //             />
// //             <div className="mt-4 flex justify-end gap-2">
// //               <button
// //                 type="button"
// //                 onClick={closeReviewModal}
// //                 className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-100"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={handleSubmitReview}
// //                 className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700"
// //               >
// //                 Save Review
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ShowAssignment;









// // // import React, { useEffect, useState, useCallback } from 'react';

// // // const ShowAssignment = () => {
// // //     const courseId = 'sample-course';
// // //     const studentId = 'sample-student';
    
// // //     const [students, setStudents] = useState([]);
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState('');
// // //     const [marks, setMarks] = useState({});
// // //     const [submittedMarks, setSubmittedMarks] = useState({});
// // //     const [total, setTotal] = useState(0);
// // //     const [writtenMark, setWrittenMark] = useState(0);
// // //     const [attendanceMark, setAttendanceMark] = useState(0);
// // //     const [additionalMarksLoaded, setAdditionalMarksLoaded] = useState(false);
// // //     const [showSuccessAlert, setShowSuccessAlert] = useState(false);

// // //     let assignmentCount = 0;
// // //     if (Array.isArray(students) && students.length > 0 && students[0].assignments) {
// // //         assignmentCount = students[0].assignments.length;
// // //     }

// // //     const fetchStudentsAndAssignments = useCallback(async () => {
// // //         return true;
// // //     }, [courseId]);

// // //     const fetchAdditionalMarks = useCallback(async () => {
// // //         if (!studentId || !courseId) return false;
// // //         setWrittenMark(0);
// // //         setAttendanceMark(0);
// // //         setAdditionalMarksLoaded(true);
// // //         return true;
// // //     }, [courseId, studentId]);

// // //     const fetchTotalMarks = useCallback(async () => {
// // //         setTotal(0);
// // //         return true;
// // //     }, [courseId, studentId]);

// // //     const fetchAllData = useCallback(async () => {
// // //         setLoading(true);
// // //         try {
// // //             const results = await Promise.all([
// // //                 fetchStudentsAndAssignments(),
// // //                 fetchAdditionalMarks(),
// // //                 fetchTotalMarks()
// // //             ]);
// // //             if (results.some(result => !result)) {
// // //                 console.log("Some data fetching operations failed");
// // //             }
// // //         } catch (error) {
// // //             console.error("Error fetching data:", error);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     }, [fetchStudentsAndAssignments, fetchAdditionalMarks, fetchTotalMarks]);

// // //     useEffect(() => {
// // //         fetchAllData();
// // //     }, [fetchAllData]);

// // //     const handleMarkChange = (submissionId, value) => {
// // //         setMarks((prevMarks) => ({
// // //             ...prevMarks,
// // //             [submissionId]: value,
// // //         }));
// // //     };

// // //     const handleSubmitMark = async (submissionId) => {
// // //         const mark = marks[submissionId];
// // //         if (isNaN(mark) || mark === '') {
// // //             setError('Please enter a valid mark.');
// // //             return;
// // //         }

// // //         try {
// // //             setSubmittedMarks((prev) => ({
// // //                 ...prev,
// // //                 [submissionId]: true,
// // //             }));
// // //             setShowSuccessAlert(true);
// // //             setTimeout(() => setShowSuccessAlert(false), 3000);
// // //             fetchAllData();
// // //         } catch (err) {
// // //             setError(err.response?.data?.message || 'An error occurred.');
// // //         }
// // //     };

// // //     const handleWrittenMarkChange = (e) => {
// // //         setWrittenMark(e.target.value);
// // //     };

// // //     const handleAttendanceMarkChange = (e) => {
// // //         setAttendanceMark(e.target.value);
// // //     };

// // //     const handleSubmitAdditionalMarks = async () => {
// // //         if ((isNaN(writtenMark) || writtenMark === '') || (isNaN(attendanceMark) || attendanceMark === '')) {
// // //             setError('Please enter valid marks for written and attendance.');
// // //             return;
// // //         }

// // //         setLoading(true);
// // //         try {
// // //             setShowSuccessAlert(true);
// // //             setTimeout(() => setShowSuccessAlert(false), 3000);
// // //             await fetchAllData();
// // //         } catch (err) {
// // //             setError(err.response?.data?.message || 'Unknown error');
// // //             console.error('Error submitting additional marks:', err);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     const totalCourseMarks = total + parseInt(writtenMark || 0) + parseInt(attendanceMark || 0);
// // //     const isPassing = totalCourseMarks >= 40;

// // //     if (loading) {
// // //         return (
// // //             <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
// // //                 <div className="text-center">
// // //                     <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
// // //                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                     </svg>
// // //                     <p className="text-gray-600 font-medium">Loading data...</p>
// // //                 </div>
// // //             </div>
// // //         );
// // //     }

// // //     if (error) {
// // //         return (
// // //             <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
// // //                 <div className="max-w-2xl mx-auto">
// // //                     <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-start gap-3">
// // //                         <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
// // //                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// // //                         </svg>
// // //                         <div>
// // //                             <p className="text-red-700 font-medium">Error</p>
// // //                             <p className="text-red-600 text-sm">{error}</p>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         );
// // //     }

// // //     return (
// // //         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
// // //             <div className="max-w-6xl mx-auto">
// // //                 {/* Success Alert */}
// // //                 {showSuccessAlert && (
// // //                     <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded flex items-start gap-3 animate-fade-in">
// // //                         <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
// // //                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// // //                         </svg>
// // //                         <p className="text-green-700 font-medium">Operation completed successfully!</p>
// // //                     </div>
// // //                 )}

// // //                 {/* Header */}
// // //                 <div className="mb-8">
// // //                     <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Student Assignments</h1>
// // //                     <p className="text-gray-600">View and grade student submissions</p>
// // //                 </div>

// // //                 {/* Assignments Table */}
// // //                 <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
// // //                     <div className="overflow-x-auto">
// // //                         <table className="w-full">
// // //                             <thead>
// // //                                 <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
// // //                                     <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Class Name</th>
// // //                                     <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Assignment Title</th>
// // //                                     <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Submission</th>
// // //                                     <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Mark</th>
// // //                                 </tr>
// // //                             </thead>
// // //                             <tbody className="divide-y divide-gray-200">
// // //                                 {students.map((studentClass) =>
// // //                                     studentClass.assignments && studentClass.assignments.length > 0 ? (
// // //                                         studentClass.assignments.map((assignment) => (
// // //                                             <tr key={assignment._id} className="hover:bg-indigo-50 transition">
// // //                                                 <td className="px-4 sm:px-6 py-4 text-sm text-gray-800 font-medium">{studentClass.title}</td>
// // //                                                 <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{assignment.title}</td>
// // //                                                 <td className="px-4 sm:px-6 py-4">
// // //                                                     {assignment.submissions?.length > 0 ? (
// // //                                                         assignment.submissions.map((submission) =>
// // //                                                             submission.student === studentId ? (
// // //                                                                 <div key={submission._id} className="space-y-3">
// // //                                                                     <a
// // //                                                                         href={`http://localhost:5004/dashboard/showallclass/${submission.fileUrl}`}
// // //                                                                         target="_blank"
// // //                                                                         rel="noopener noreferrer"
// // //                                                                         className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
// // //                                                                     >
// // //                                                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
// // //                                                                         </svg>
// // //                                                                         View Submission
// // //                                                                     </a>
// // //                                                                     {submission.mark > 0 || submittedMarks[submission._id] ? (
// // //                                                                         <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
// // //                                                                             Mark: {submission.mark || marks[submission._id]}
// // //                                                                         </div>
// // //                                                                     ) : (
// // //                                                                         <div className="flex flex-col sm:flex-row gap-2">
// // //                                                                             <input
// // //                                                                                 type="number"
// // //                                                                                 placeholder="Enter mark"
// // //                                                                                 value={marks[submission._id] || ''}
// // //                                                                                 onChange={(e) => handleMarkChange(submission._id, e.target.value)}
// // //                                                                                 className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //                                                                             />
// // //                                                                             <button
// // //                                                                                 onClick={() => handleSubmitMark(submission._id)}
// // //                                                                                 className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition"
// // //                                                                             >
// // //                                                                                 Submit
// // //                                                                             </button>
// // //                                                                         </div>
// // //                                                                     )}
// // //                                                                 </div>
// // //                                                             ) : null
// // //                                                         )
// // //                                                     ) : (
// // //                                                         <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded">
// // //                                                             No submission
// // //                                                         </span>
// // //                                                     )}
// // //                                                 </td>
// // //                                                 <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-gray-800">
// // //                                                     {assignment.submissions?.length > 0 ? (
// // //                                                         assignment.submissions.map((submission) =>
// // //                                                             submission.student === studentId && submission.mark != null ? (
// // //                                                                 <span key={submission._id} className="inline-block px-3 py-1 bg-blue-100 text-blue-800 font-bold rounded">
// // //                                                                     {submission.mark}
// // //                                                                 </span>
// // //                                                             ) : null
// // //                                                         )
// // //                                                     ) : (
// // //                                                         <span className="text-gray-500">-</span>
// // //                                                     )}
// // //                                                 </td>
// // //                                             </tr>
// // //                                         ))
// // //                                     ) : null
// // //                                 )}
// // //                             </tbody>
// // //                         </table>
// // //                     </div>
// // //                 </div>

// // //                 {/* Additional Marks Section */}
// // //                 <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
// // //                     <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
// // //                         <h3 className="text-xl font-bold text-white flex items-center gap-2">
// // //                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //                             </svg>
// // //                             Additional Marks
// // //                         </h3>
// // //                     </div>
// // //                     <div className="p-6">
// // //                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
// // //                             <div>
// // //                                 <label className="block text-sm font-semibold text-gray-700 mb-2">Written Mark</label>
// // //                                 <input
// // //                                     type="number"
// // //                                     min="0"
// // //                                     value={writtenMark}
// // //                                     onChange={handleWrittenMarkChange}
// // //                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //                                     placeholder="Enter written mark"
// // //                                 />
// // //                             </div>
// // //                             <div>
// // //                                 <label className="block text-sm font-semibold text-gray-700 mb-2">Attendance Mark</label>
// // //                                 <input
// // //                                     type="number"
// // //                                     min="0"
// // //                                     value={attendanceMark}
// // //                                     onChange={handleAttendanceMarkChange}
// // //                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //                                     placeholder="Enter attendance mark"
// // //                                 />
// // //                             </div>
// // //                         </div>
// // //                         <button
// // //                             onClick={handleSubmitAdditionalMarks}
// // //                             disabled={loading}
// // //                             className={`w-full px-6 py-3 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
// // //                                 loading
// // //                                     ? 'bg-gray-400 text-white cursor-not-allowed'
// // //                                     : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 active:scale-95'
// // //                             }`}
// // //                         >
// // //                             {loading ? (
// // //                                 <>
// // //                                     <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
// // //                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                                     </svg>
// // //                                     Submitting...
// // //                                 </>
// // //                             ) : (
// // //                                 <>
// // //                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// // //                                     </svg>
// // //                                     Submit Additional Marks
// // //                                 </>
// // //                             )}
// // //                         </button>
// // //                     </div>
// // //                 </div>

// // //                 {/* Marks Summary */}
// // //                 <div className="bg-white rounded-xl shadow-lg overflow-hidden">
// // //                     <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
// // //                         <h3 className="text-xl font-bold text-white flex items-center gap-2">
// // //                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// // //                             </svg>
// // //                             Marks Summary
// // //                         </h3>
// // //                     </div>
// // //                     <div className="p-6">
// // //                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
// // //                             <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
// // //                                 <p className="text-gray-600 text-sm font-medium mb-1">Assignment Marks</p>
// // //                                 <p className="text-3xl font-bold text-blue-600">{total}</p>
// // //                             </div>
// // //                             <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
// // //                                 <p className="text-gray-600 text-sm font-medium mb-1">Written Mark</p>
// // //                                 <p className="text-3xl font-bold text-green-600">{writtenMark}</p>
// // //                             </div>
// // //                             <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
// // //                                 <p className="text-gray-600 text-sm font-medium mb-1">Attendance Mark</p>
// // //                                 <p className="text-3xl font-bold text-orange-600">{attendanceMark}</p>
// // //                             </div>
// // //                         </div>

// // //                         <div className={`rounded-lg p-6 text-white ${isPassing ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-red-600 to-pink-600'}`}>
// // //                             <p className="text-sm font-medium mb-2 opacity-90">Total Course Marks</p>
// // //                             <div className="flex items-center justify-between">
// // //                                 <p className="text-4xl font-bold">{totalCourseMarks.toFixed(2)}</p>
// // //                                 <div className="text-right">
// // //                                     <p className="text-lg font-bold">{isPassing ? 'PASS' : 'FAIL'}</p>
// // //                                     <p className="text-sm opacity-90">{isPassing ? 'Score ≥ 40' : 'Score < 40'}</p>
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default ShowAssignment;









// import React, { useEffect, useState, useCallback } from "react";
// import { Link, useParams } from "react-router-dom";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { Loader } from "lucide-react";
// import { getBaseUrl } from "../../../utils/baseUrl";
// import Swal from "sweetalert2";

// const ShowAssignment = () => {
//   const { courseId, studentId } = useParams();
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [marks, setMarks] = useState({});
//   const [submittedMarks, setSubmittedMarks] = useState({});
//   const [total, setTotal] = useState(0);
//   const [writtenMark, setWrittenMark] = useState(0);
//   const [attendanceMark, setAttendanceMark] = useState(0);
//   const token = Cookies.get("token");

//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//   const [reviewText, setReviewText] = useState("");
//   const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
//   const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);

//   const openReviewModal = (assignmentId, submission) => {
//     setSelectedAssignmentId(assignmentId);
//     setSelectedSubmissionId(submission._id);
//     setReviewText(submission.review || "");
//     setIsReviewModalOpen(true);
//   };

//   const closeReviewModal = () => {
//     setIsReviewModalOpen(false);
//     setSelectedAssignmentId(null);
//     setSelectedSubmissionId(null);
//     setReviewText("");
//   };

//   const handleSubmitReview = async () => {
//     if (!selectedAssignmentId || !selectedSubmissionId) return;

//     try {
//       await axios.patch(
//         `${getBaseUrl()}/api/assignments/${selectedAssignmentId}/submissions/${selectedSubmissionId}/review`,
//         { review: reviewText },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Review saved successfully.",
//         showConfirmButton: false,
//         timer: 900,
//       });

//       closeReviewModal();
//       fetchAllData();
//     } catch (err) {
//       console.error("Error saving review:", err);
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: "Failed to save review.",
//         showConfirmButton: false,
//         timer: 900,
//       });
//     }
//   };

//   const fetchStudentsAndAssignments = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         `${getBaseUrl()}/course/courses/${courseId}/students`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setStudents(response.data.classes || []);
//       return true;
//     } catch (err) {
//       console.error("Error fetching students:", err);
//       setError(err.response?.data?.message || "Failed to fetch students.");
//       return false;
//     }
//   }, [courseId, token]);

//   const fetchAdditionalMarks = useCallback(async () => {
//     if (!studentId || !courseId) return false;

//     try {
//       const response = await axios.get(`${getBaseUrl()}/course/${courseId}/${studentId}`);
//       setWrittenMark(response.data.writtenMark || 0);
//       setAttendanceMark(response.data.attendanceMark || 0);
//       return true;
//     } catch (err) {
//       if (err.response?.status === 404) {
//         setWrittenMark(0);
//         setAttendanceMark(0);
//         return true;
//       }
//       console.error("Error fetching additional marks:", err);
//       return false;
//     }
//   }, [courseId, studentId]);

//   const fetchTotalMarks = useCallback(async () => {
//     try {
//       const response = await axios.get(`${getBaseUrl()}/user/${studentId}/${courseId}`);
//       setTotal(response.data.totalMark || 0);
//       return true;
//     } catch (err) {
//       console.error("Error fetching total marks:", err);
//       return false;
//     }
//   }, [courseId, studentId]);

//   const fetchAllData = useCallback(async () => {
//     setLoading(true);
//     try {
//       await Promise.all([
//         fetchStudentsAndAssignments(),
//         fetchAdditionalMarks(),
//         fetchTotalMarks(),
//       ]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [fetchStudentsAndAssignments, fetchAdditionalMarks, fetchTotalMarks]);

//   useEffect(() => {
//     fetchAllData();
//   }, [fetchAllData]);

//   const handleMarkChange = (submissionId, value) => {
//     setMarks((prevMarks) => ({
//       ...prevMarks,
//       [submissionId]: value,
//     }));
//   };

//   const handleSubmitMark = async (submissionId) => {
//     const mark = marks[submissionId];
//     if (isNaN(mark) || mark === "") {
//       setError("Please enter a valid mark.");
//       return;
//     }

//     try {
//       const response = await axios.patch(
//         `${getBaseUrl()}/api/assignments/submit-mark/${submissionId}/${studentId}`,
//         { mark: parseInt(mark, 10) },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSubmittedMarks((prev) => ({
//         ...prev,
//         [submissionId]: true,
//       }));

//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title: response.data.message || "Mark submitted successfully",
//         showConfirmButton: false,
//         timer: 900,
//       });

//       fetchAllData();
//     } catch (err) {
//       setError(err.response?.data?.message || "An error occurred.");
//     }
//   };

//   const handleWrittenMarkChange = (e) => {
//     setWrittenMark(e.target.value);
//   };

//   const handleAttendanceMarkChange = (e) => {
//     setAttendanceMark(e.target.value);
//   };

//   const handleSubmitAdditionalMarks = async () => {
//     if (
//       isNaN(writtenMark) ||
//       writtenMark === "" ||
//       isNaN(attendanceMark) ||
//       attendanceMark === ""
//     ) {
//       setError("Please enter valid marks for written and attendance.");
//       return;
//     }

//     setLoading(true);
//     let submissionSuccessful = false;

//     try {
//       await axios.post(
//         `${getBaseUrl()}/course/${courseId}`,
//         {
//           studentId: studentId,
//           writtenMark: parseInt(writtenMark, 10),
//           attendanceMark: parseInt(attendanceMark, 10),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Written and Attendance marks added successfully!",
//         showConfirmButton: false,
//         timer: 900,
//       });

//       submissionSuccessful = true;
//     } catch (err) {
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: err.response?.data?.message || "Unknown error",
//         showConfirmButton: false,
//         timer: 1200,
//       });
//       console.error("Error submitting additional marks:", err);
//     }

//     try {
//       const studentsResponse = await axios.get(
//         `${getBaseUrl()}/course/courses/${courseId}/students`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setStudents(studentsResponse.data.classes);

//       const additionalMarksResponse = await axios.get(
//         `${getBaseUrl()}/course/${courseId}/${studentId}`
//       );
//       setWrittenMark(additionalMarksResponse.data.writtenMark || 0);
//       setAttendanceMark(additionalMarksResponse.data.attendanceMark || 0);

//       const totalMarksResponse = await axios.get(
//         `${getBaseUrl()}/user/${studentId}/${courseId}`
//       );
//       setTotal(totalMarksResponse.data.totalMark || 0);
//     } catch (refreshError) {
//       console.error("Error refreshing data:", refreshError);
//       if (submissionSuccessful) {
//         Swal.fire({
//           position: "center",
//           icon: "warning",
//           title: "Saved, but refresh failed",
//           showConfirmButton: false,
//           timer: 1200,
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const totalCourseMarks =
//     Number(total || 0) +
//     Number(writtenMark || 0) +
//     Number(attendanceMark || 0);

// const getBangladeshUniversityGrade = (mark) => {
//   const m = Number(mark || 0);

//   if (m >= 80) return "A+";
//   if (m >= 75) return "A";
//   if (m >= 70) return "A-";
//   if (m >= 65) return "B+";
//   if (m >= 60) return "B";
//   if (m >= 55) return "B-";
//   if (m >= 50) return "C+";
//   if (m >= 45) return "C";
//   if (m >= 40) return "D";
//   return "F";
// };

// const shouldShowCourseGrade =
//   Number(writtenMark || 0) !== 0 && Number(attendanceMark || 0) !== 0;

// const courseGrade = getBangladeshUniversityGrade(totalCourseMarks);
    
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
//           <p className="text-lg font-semibold text-gray-700">Loading your result...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
//         <div className="bg-white rounded-2xl shadow-md border border-red-200 px-6 py-8 text-center max-w-md w-full">
//           <h2 className="text-lg font-semibold text-red-700 mb-2">Error</h2>
//           <p className="text-sm text-red-600 mb-4">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//           <div>
//             <h1 className="mt-1 text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
//               Assignment Evaluation
//             </h1>
//           </div>

//           <div className="flex flex-col items-start sm:items-end gap-1.5">
//             <span className="text-[11px] sm:text-sm text-gray-500">
//               Total Course Marks:{" "}
// <span className="font-semibold text-gray-800">
//   {totalCourseMarks.toFixed(2)} / 100
//   {shouldShowCourseGrade && ` Grade: ${courseGrade}`}
// </span>
//             </span>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
//           <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
//             <h2 className="text-sm sm:text-xl font-semibold text-gray-900">
//               Assignment-wise Breakdown
//             </h2>
//             <span className="text-[10px] sm:text-sm text-gray-500">
//               All submissions and marks for this student
//             </span>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-[1100px] w-full text-xs sm:text-sm border-t border-gray-100">
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
//                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
//                     Late Note
//                   </th>
//                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
//                     Mark
//                   </th>
//                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-gray-600 border-b border-gray-200">
//                     Review
//                   </th>
//                   <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-semibold text-gray-600 border-b border-gray-200">
//                     Final Mark
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((studentClass) =>
//                   studentClass.assignments.length > 0
//                     ? studentClass.assignments.map((assignment) => (
//                         <tr
//                           key={assignment._id}
//                           className="hover:bg-gray-50 transition-colors"
//                         >
//                           <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-800 border-b border-gray-100 align-top">
//                             {studentClass.title}
//                           </td>

//                           <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 border-b border-gray-100 align-top">
//                             {assignment.title}
//                           </td>

//                           <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 align-top">
//                             {assignment.submissions?.length > 0 ? (
//                               assignment.submissions.map((submission) =>
//                                 String(submission.student?._id || submission.student) ===
//                                 String(studentId) ? (
//                                   <div key={submission._id} className="space-y-2">
//                                     <Link
//                                       to={`${getBaseUrl()}/dashboard/showallclass/${submission.fileUrl}`}
//                                       target="_blank"
//                                       rel="noopener noreferrer"
//                                       className="text-blue-600 hover:underline text-xs sm:text-sm font-medium"
//                                     >
//                                       View Submission
//                                     </Link>

//                                     {submission.isLateSubmission && (
//                                       <span className="block w-fit inline-flex px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200 text-[11px] sm:text-xs font-semibold">
//                                         Late Submission
//                                       </span>
//                                     )}
//                                   </div>
//                                 ) : null
//                               )
//                             ) : (
//                               <span className="text-[11px] text-red-500">
//                                 No submission yet
//                               </span>
//                             )}
//                           </td>

//                           <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 border-b border-gray-100 align-top">
//                             {assignment.submissions?.length > 0 ? (
//                               assignment.submissions.map((submission) =>
//                                 String(submission.student?._id || submission.student) ===
//                                 String(studentId) ? (
//                                   <div key={submission._id} className="space-y-2">
//                                     {submission.isLateSubmission ? (
//                                       <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
//                                         <p className="text-[11px] sm:text-xs font-semibold text-amber-700 mb-1">
//                                           Late Submission Reason
//                                         </p>
//                                         <p className="text-[11px] sm:text-xs text-amber-800 whitespace-pre-line">
//                                           {submission.lateSubmissionReason ||
//                                             "No reason provided"}
//                                         </p>
//                                       </div>
//                                     ) : (
//                                       <span className="text-[11px] text-gray-500">
//                                         On time
//                                       </span>
//                                     )}
//                                   </div>
//                                 ) : null
//                               )
//                             ) : (
//                               <span className="text-[11px] text-gray-500">-</span>
//                             )}
//                           </td>

//                           <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 align-top">
//                             {assignment.submissions?.length > 0 ? (
//                               assignment.submissions.map((submission) =>
//                                 String(submission.student?._id || submission.student) ===
//                                 String(studentId) ? (
//                                   <div key={submission._id} className="space-y-2">
//                                     {submission.mark > 0 ||
//                                     submittedMarks[submission._id] ? (
//                                       <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-[11px] sm:text-xs font-semibold">
//                                         {submission.mark || marks[submission._id]}
//                                       </span>
//                                     ) : (
//                                       <div className="flex flex-col sm:flex-row gap-2">
//                                         <input
//                                           type="number"
//                                           placeholder="Enter mark"
//                                           value={marks[submission._id] || ""}
//                                           onChange={(e) =>
//                                             handleMarkChange(
//                                               submission._id,
//                                               e.target.value
//                                             )
//                                           }
//                                           className="border border-gray-300 rounded-md px-2 py-1 text-xs sm:text-sm w-full sm:w-24 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                         />
//                                         <button
//                                           onClick={() =>
//                                             handleSubmitMark(submission._id)
//                                           }
//                                           className="inline-flex items-center justify-center px-3 py-1.5 text-xs sm:text-sm rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//                                         >
//                                           Submit
//                                         </button>
//                                       </div>
//                                     )}
//                                   </div>
//                                 ) : null
//                               )
//                             ) : (
//                               <span className="text-[11px] text-gray-500">-</span>
//                             )}
//                           </td>

//                           <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 border-b border-gray-100 align-top">
//                             {assignment.submissions?.length > 0 ? (
//                               assignment.submissions.map((submission) =>
//                                 String(submission.student?._id || submission.student) ===
//                                 String(studentId) ? (
//                                   <div key={submission._id} className="space-y-2">
//                                     <button
//                                       type="button"
//                                       onClick={() =>
//                                         openReviewModal(assignment._id, submission)
//                                       }
//                                       className="inline-flex items-center justify-center px-3 py-1.5 text-[11px] sm:text-xs rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//                                     >
//                                       {submission.review
//                                         ? "Edit Review"
//                                         : "Add Review"}
//                                     </button>
//                                   </div>
//                                 ) : null
//                               )
//                             ) : (
//                               <span className="text-[11px] text-gray-500">-</span>
//                             )}
//                           </td>

//                           <td className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 text-center align-top">
//                             {assignment.submissions.length > 0 ? (
//                               assignment.submissions.map((submission) =>
//                                 String(submission.student?._id || submission.student) ===
//                                   String(studentId) &&
//                                 submission.mark != null ? (
//                                   <span
//                                     key={submission._id}
//                                     className="inline-flex px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200"
//                                   >
//                                     {submission.mark}
//                                   </span>
//                                 ) : null
//                               )
//                             ) : (
//                               <span className="text-[11px] text-gray-500">
//                                 No mark assigned
//                               </span>
//                             )}
//                           </td>
//                         </tr>
//                       ))
//                     : null
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-5 py-4 sm:py-5">
//           <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
//             Additional Marks (Written & Attendance)
//           </h3>
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                 Written Mark
//               </label>
//               <input
//                 type="number"
//                 min="0"
//                 value={writtenMark}
//                 onChange={handleWrittenMarkChange}
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 placeholder="Enter written mark"
//               />
//             </div>
//             <div className="flex-1">
//               <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                 Attendance Mark
//               </label>
//               <input
//                 type="number"
//                 min="0"
//                 value={attendanceMark}
//                 onChange={handleAttendanceMarkChange}
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 placeholder="Enter attendance mark"
//               />
//             </div>
//           </div>
//           <button
//             onClick={handleSubmitAdditionalMarks}
//             disabled={loading}
//             className={`mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-emerald-600 hover:bg-emerald-700"
//             } transition`}
//           >
//             {loading ? "Submitting..." : "Submit Additional Marks"}
//           </button>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-5 py-4 sm:py-5">
//           <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
//             Course Marks Summary
//           </h3>
//           <div className="space-y-1 text-xs sm:text-sm text-gray-700">
//             <div>
//               <strong>Assignment Marks (Total):</strong> {total}
//             </div>
//             <div>
//               <strong>Written Mark:</strong> {writtenMark}
//             </div>
//             <div>
//               <strong>Attendance Mark:</strong> {attendanceMark}
//             </div>
//             <div className="pt-2 mt-2 border-t border-gray-200 text-base sm:text-lg font-bold">
//               {/* <span>Total Marks for Course: {totalCourseMarks.toFixed(2)}</span> */}

//               <span>
//   Total Marks for Course: {totalCourseMarks.toFixed(2)}
//   {shouldShowCourseGrade && ` Grade: ${courseGrade}`}
// </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {isReviewModalOpen && (
//         <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 sm:p-6">
//             <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
//               {selectedSubmissionId ? "Add / Edit Review" : "Add Review"}
//             </h3>
//             <p className="text-[11px] sm:text-xs text-gray-500 mb-3">
//               Write feedback for this submission. This review can be shown to the student.
//             </p>
//             <textarea
//               rows={4}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
//               placeholder="Type your review here..."
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//             />
//             <div className="mt-4 flex justify-end gap-2">
//               <button
//                 type="button"
//                 onClick={closeReviewModal}
//                 className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleSubmitReview}
//                 className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700"
//               >
//                 Save Review
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowAssignment;



import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { Loader } from "lucide-react";
import { getBaseUrl } from "../../../utils/baseUrl";
import Swal from "sweetalert2";

const ShowAssignment = () => {
  const { courseId, studentId } = useParams();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [marks, setMarks] = useState({});
  const [submittedMarks, setSubmittedMarks] = useState({});
  const [total, setTotal] = useState(0);
  const [writtenMark, setWrittenMark] = useState(0);
  const [attendanceMark, setAttendanceMark] = useState(0);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  const openReviewModal = (assignmentId, submission) => {
    setSelectedAssignmentId(assignmentId);
    setSelectedSubmissionId(submission._id);
    setReviewText(submission.review || "");
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedAssignmentId(null);
    setSelectedSubmissionId(null);
    setReviewText("");
  };

  const fetchStudentsAndAssignments = useCallback(async () => {
    try {
      const response = await axios.get(
        `${getBaseUrl()}/course/courses/${courseId}/students`,
        getAuthHeader()
      );

      setStudents(response.data.classes || []);
      return true;
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.response?.data?.message || "Failed to fetch students.");
      return false;
    }
  }, [courseId]);

  const fetchAdditionalMarks = useCallback(async () => {
    if (!studentId || !courseId) return false;

    try {
      const response = await axios.get(
        `${getBaseUrl()}/course/${courseId}/${studentId}`,
        getAuthHeader()
      );

      setWrittenMark(response.data.writtenMark || 0);
      setAttendanceMark(response.data.attendanceMark || 0);
      return true;
    } catch (err) {
      if (err.response?.status === 404) {
        setWrittenMark(0);
        setAttendanceMark(0);
        return true;
      }

      console.error("Error fetching additional marks:", err);
      return false;
    }
  }, [courseId, studentId]);

  const fetchTotalMarks = useCallback(async () => {
    try {
      const response = await axios.get(
        `${getBaseUrl()}/user/${studentId}/${courseId}`,
        getAuthHeader()
      );

      setTotal(response.data.totalMark || 0);
      return true;
    } catch (err) {
      console.error("Error fetching total marks:", err);
      return false;
    }
  }, [courseId, studentId]);

  const fetchAllData = useCallback(async () => {
    setLoading(true);

    try {
      await Promise.all([
        fetchStudentsAndAssignments(),
        fetchAdditionalMarks(),
        fetchTotalMarks(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchStudentsAndAssignments, fetchAdditionalMarks, fetchTotalMarks]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleSubmitReview = async () => {
    if (!selectedAssignmentId || !selectedSubmissionId) return;

    try {
      await axios.patch(
        `${getBaseUrl()}/api/assignments/${selectedAssignmentId}/submissions/${selectedSubmissionId}/review`,
        { review: reviewText },
        getAuthHeader()
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Review saved successfully.",
        showConfirmButton: false,
        timer: 900,
      });

      closeReviewModal();
      fetchAllData();
    } catch (err) {
      console.error("Error saving review:", err);

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to save review.",
        showConfirmButton: false,
        timer: 900,
      });
    }
  };

  const handleMarkChange = (submissionId, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [submissionId]: value,
    }));
  };

  const handleSubmitMark = async (submissionId) => {
    const mark = marks[submissionId];

    if (isNaN(mark) || mark === "") {
      setError("Please enter a valid mark.");
      return;
    }

    try {
      const response = await axios.patch(
        `${getBaseUrl()}/api/assignments/submit-mark/${submissionId}/${studentId}`,
        { mark: parseInt(mark, 10) },
        getAuthHeader()
      );

      setSubmittedMarks((prev) => ({
        ...prev,
        [submissionId]: true,
      }));

      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.message || "Mark submitted successfully",
        showConfirmButton: false,
        timer: 900,
      });

      fetchAllData();
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleSubmitAdditionalMarks = async () => {
    if (
      isNaN(writtenMark) ||
      writtenMark === "" ||
      isNaN(attendanceMark) ||
      attendanceMark === ""
    ) {
      setError("Please enter valid marks for written and attendance.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${getBaseUrl()}/course/${courseId}`,
        {
          studentId,
          writtenMark: parseInt(writtenMark, 10),
          attendanceMark: parseInt(attendanceMark, 10),
        },
        getAuthHeader()
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Written and Attendance marks added successfully!",
        showConfirmButton: false,
        timer: 900,
      });

      await fetchAllData();
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.response?.data?.message || "Unknown error",
        showConfirmButton: false,
        timer: 1200,
      });

      console.error("Error submitting additional marks:", err);
      setLoading(false);
    }
  };

  const totalCourseMarks =
    Number(total || 0) + Number(writtenMark || 0) + Number(attendanceMark || 0);

  const getBangladeshUniversityGrade = (mark) => {
    const m = Number(mark || 0);

    if (m >= 80) return "A+";
    if (m >= 75) return "A";
    if (m >= 70) return "A-";
    if (m >= 65) return "B+";
    if (m >= 60) return "B";
    if (m >= 55) return "B-";
    if (m >= 50) return "C+";
    if (m >= 45) return "C";
    if (m >= 40) return "D";
    return "F";
  };

  const shouldShowCourseGrade =
    Number(writtenMark || 0) !== 0 && Number(attendanceMark || 0) !== 0;

  const courseGrade = getBangladeshUniversityGrade(totalCourseMarks);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">
            Loading your result...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="mt-1 text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Assignment Evaluation
          </h1>

          <span className="text-[11px] sm:text-sm text-gray-500">
            Total Course Marks:{" "}
            <span className="font-semibold text-gray-800">
              {totalCourseMarks.toFixed(2)} / 100
              {shouldShowCourseGrade && ` Grade: ${courseGrade}`}
            </span>
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
            <h2 className="text-sm sm:text-xl font-semibold text-gray-900">
              Assignment-wise Breakdown
            </h2>
            <span className="text-[10px] sm:text-sm text-gray-500">
              All submissions and marks for this student
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full text-xs sm:text-sm border-t border-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 border-b">
                    Class Name
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 border-b">
                    Assignment Title
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 border-b">
                    Submission
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 border-b">
                    Late Note
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 border-b">
                    Mark
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 border-b">
                    Review
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 border-b">
                    Final Mark
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.map((studentClass) =>
                  studentClass.assignments?.length > 0
                    ? studentClass.assignments.map((assignment) => (
                        <tr key={assignment._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 border-b align-top">
                            {studentClass.title}
                          </td>

                          <td className="px-4 py-3 border-b align-top">
                            {assignment.title}
                          </td>

                          <td className="px-4 py-3 border-b align-top">
                            {assignment.submissions?.length > 0 ? (
                              assignment.submissions.map((submission) =>
                                String(
                                  submission.student?._id || submission.student
                                ) === String(studentId) ? (
                                  <div key={submission._id} className="space-y-2">
                                    <Link
                                      to={submission.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline font-medium"
                                    >
                                      View Submission
                                    </Link>

                                    {submission.isLateSubmission && (
                                      <span className="block w-fit px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold">
                                        Late Submission
                                      </span>
                                    )}
                                  </div>
                                ) : null
                              )
                            ) : (
                              <span className="text-red-500">
                                No submission yet
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-3 border-b align-top">
                            {assignment.submissions?.map((submission) =>
                              String(
                                submission.student?._id || submission.student
                              ) === String(studentId) ? (
                                submission.isLateSubmission ? (
                                  <div
                                    key={submission._id}
                                    className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2"
                                  >
                                    <p className="font-semibold text-amber-700 mb-1">
                                      Late Submission Reason
                                    </p>
                                    <p className="text-amber-800 whitespace-pre-line">
                                      {submission.lateSubmissionReason ||
                                        "No reason provided"}
                                    </p>
                                  </div>
                                ) : (
                                  <span key={submission._id}>On time</span>
                                )
                              ) : null
                            )}
                          </td>

                          <td className="px-4 py-3 border-b align-top">
                            {assignment.submissions?.map((submission) =>
                              String(
                                submission.student?._id || submission.student
                              ) === String(studentId) ? (
                                <div key={submission._id} className="space-y-2">
                                  {submission.mark > 0 ||
                                  submittedMarks[submission._id] ? (
                                    <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 font-semibold">
                                      {submission.mark || marks[submission._id]}
                                    </span>
                                  ) : (
                                    <div className="flex gap-2">
                                      <input
                                        type="number"
                                        placeholder="Enter mark"
                                        value={marks[submission._id] || ""}
                                        onChange={(e) =>
                                          handleMarkChange(
                                            submission._id,
                                            e.target.value
                                          )
                                        }
                                        className="border rounded-md px-2 py-1 w-24"
                                      />
                                      <button
                                        onClick={() =>
                                          handleSubmitMark(submission._id)
                                        }
                                        className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ) : null
                            )}
                          </td>

                          <td className="px-4 py-3 border-b align-top">
                            {assignment.submissions?.map((submission) =>
                              String(
                                submission.student?._id || submission.student
                              ) === String(studentId) ? (
                                <button
                                  key={submission._id}
                                  type="button"
                                  onClick={() =>
                                    openReviewModal(assignment._id, submission)
                                  }
                                  className="px-3 py-1.5 rounded-md border text-gray-700 hover:bg-gray-100"
                                >
                                  {submission.review
                                    ? "Edit Review"
                                    : "Add Review"}
                                </button>
                              ) : null
                            )}
                          </td>

                          <td className="px-4 py-3 border-b text-center align-top">
                            {assignment.submissions?.map((submission) =>
                              String(
                                submission.student?._id || submission.student
                              ) === String(studentId) &&
                              submission.mark != null ? (
                                <span
                                  key={submission._id}
                                  className="inline-flex px-2.5 py-1 rounded-full bg-gray-50 text-gray-700 border font-semibold"
                                >
                                  {submission.mark}
                                </span>
                              ) : null
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

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-5 py-4 sm:py-5">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
            Additional Marks (Written & Attendance)
          </h3>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="number"
              min="0"
              value={writtenMark}
              onChange={(e) => setWrittenMark(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter written mark"
            />

            <input
              type="number"
              min="0"
              value={attendanceMark}
              onChange={(e) => setAttendanceMark(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter attendance mark"
            />
          </div>

          <button
            onClick={handleSubmitAdditionalMarks}
            className="mt-4 px-5 py-2.5 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700"
          >
            Submit Additional Marks
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 sm:px-5 py-4 sm:py-5">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
            Course Marks Summary
          </h3>

          <div className="space-y-1 text-sm text-gray-700">
            <div>
              <strong>Assignment Marks (Total):</strong> {total}
            </div>
            <div>
              <strong>Written Mark:</strong> {writtenMark}
            </div>
            <div>
              <strong>Attendance Mark:</strong> {attendanceMark}
            </div>

            <div className="pt-2 mt-2 border-t text-lg font-bold">
              Total Marks for Course: {totalCourseMarks.toFixed(2)}
              {shouldShowCourseGrade && ` Grade: ${courseGrade}`}
            </div>
          </div>
        </div>
      </div>

      {isReviewModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5">
            <h3 className="text-lg font-semibold mb-2">Add / Edit Review</h3>

            <textarea
              rows={4}
              className="w-full border rounded-lg px-3 py-2 resize-none"
              placeholder="Type your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeReviewModal}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmitReview}
                className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
              >
                Save Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowAssignment;