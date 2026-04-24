// import React, { useContext, useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom";
// import Cookies from "js-cookie";
// import { AuthContext } from "../../../provider/AuthProvider";
// import {
//   Calendar,
//   FileText,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   ChevronDown,
//   BookOpen,
//   Download,
//   Upload,
//   BarChart3,
//   Loader,
// } from "lucide-react";
// import Swal from "sweetalert2";
// import { getBaseUrl } from "../../../utils/baseUrl";

// const Classshow = () => {
//   const { courseId } = useParams();
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { user } = useContext(AuthContext);
//   const [submittingAssignments, setSubmittingAssignments] = useState({});
//   const [expandedClass, setExpandedClass] = useState(null);

//   const studentId = user?._id;

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await axios.get(
//           `${getBaseUrl()}/api/${courseId}/classes`
//         );
//         setClasses(response.data.classes || []);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch classes.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClasses();
//   }, [courseId]);

//   const handleAssignmentSubmit = useCallback(
//     async (assignmentId, formData, courseId) => {
//       setSubmittingAssignments((prev) => ({
//         ...prev,
//         [assignmentId]: true,
//       }));

//       try {
//         const url = `${getBaseUrl()}/api/courses/${courseId}/assignments/${assignmentId}/submit`;

//         await axios.post(url, formData, {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("token")}`,
//           },
//         });

//         Swal.fire({
//           icon: "success",
//           title: "Assignment Submitted 🎉",
//           text: "Your assignment was submitted successfully.",
//           confirmButtonColor: "#0ea5e9",
//         });
//       } catch (err) {
//         console.error(err);
//         Swal.fire({
//           icon: "error",
//           title: "Already Submitted",
//           text: "You have already submitted this assignment.",
//           confirmButtonColor: "#ef4444",
//         });
//       } finally {
//         setSubmittingAssignments((prev) => ({
//           ...prev,
//           [assignmentId]: false,
//         }));
//       }
//     },
//     []
//   );

//   const handleSubmissionCheck = useCallback(
//     (assignmentId) => {
//       if (!user?._id) return false;

//       return classes.some((classItem) =>
//         classItem.assignments?.some(
//           (assignment) =>
//             assignment._id === assignmentId &&
//             assignment.submissions?.some(
//               (submission) => submission.studentId === user._id
//             )
//         )
//       );
//     },
//     [classes, user?._id]
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
//         <div className="text-center">
//           <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-700 font-semibold">Loading classes...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 px-4">
//         <div className="max-w-md w-full bg-white rounded-xl border border-red-200 shadow-lg p-6 text-center">
//           <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
//           <p className="text-red-700 font-semibold mb-2">{error}</p>
//           <p className="text-sm text-red-500 mb-6">
//             Unable to load your classes. Please try again.
//           </p>
//           <button
//             className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
//             onClick={() => window.location.reload()}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         {/* <div className="mb-8">
//           <div className="flex items-center gap-3 mb-3">
//             <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
//               Classes
//             </h1>
//           </div>
//           <p className="text-gray-600 text-sm sm:text-base">
//             View lessons, download materials & submit assignments.
//           </p>
//         </div> */}


//         {/* Header */}
//                 <div className="text-center mb-8 mt-5">
//                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
//                         My Class
//                     </h2>
//                     <p className="text-gray-600 text-sm sm:text-base">Review and publish courses awaiting approval</p>
                    
//                 </div>

//         {/* View Results Button */}
//         {studentId && (
//           <Link
//             className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-green-600 hover:to-emerald-700 transition"
//             to={`/dashboard/courses/${courseId}/users/${studentId}`}
//           >
//             <BarChart3 className="w-5 h-5" />
//             View Results
//           </Link>
//         )}

//         {/* Classes List */}
//         {classes.length ? (
//           <div className="space-y-5">
//             {classes.map((classItem, index) => (
//               <div
//                 key={classItem._id}
//                 className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
//               >
//                 {/* Collapsible Header */}
//                 <button
//                   onClick={() =>
//                     setExpandedClass(
//                       expandedClass === classItem._id ? null : classItem._id
//                     )
//                   }
//                   className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-gray-50 transition"
//                 >
//                   <div className="flex items-start gap-4 min-w-0 flex-1">
//                     <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white text-lg font-bold shadow-md flex-shrink-0">
//                       {index + 1}
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <h2 className="text-lg sm:text-xl font-bold text-gray-900">
//                         {classItem.title}
//                       </h2>
//                       <p className="text-gray-600 text-sm mt-1 line-clamp-2">
//                         {classItem.description}
//                       </p>
//                     </div>
//                   </div>
//                   <ChevronDown
//                     className={`w-6 h-6 text-gray-500 transition flex-shrink-0 ml-3 ${
//                       expandedClass === classItem._id ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {/* Expanded Content */}
//                 {expandedClass === classItem._id && (
//                   <div className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white p-5 sm:p-6 space-y-6">
//                     {/* Class Details Grid */}
//                     <div className="grid sm:grid-cols-2 gap-6">
//                       {/* Description */}
//                       <div className="bg-white rounded-lg p-4 border border-gray-200">
//                         <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
//                           Description
//                         </h3>
//                         <p className="text-gray-700 text-sm">
//                           {classItem.description}
//                         </p>
//                       </div>

//                       {/* Class Date & Resources */}
//                       <div className="space-y-4">
//                         <div className="bg-white rounded-lg p-4 border border-gray-200">
//                           <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
//                             <Calendar className="w-4 h-4 text-indigo-600" />
//                             Class Date
//                           </h3>
//                           <p className="text-gray-700 text-sm font-medium">
//                             {new Date(classItem.date).toLocaleString()}
//                           </p>
//                         </div>

//                         <div className="bg-white rounded-lg p-4 border border-gray-200">
//                           <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
//                             <FileText className="w-4 h-4 text-blue-600" />
//                             Resources
//                           </h3>
//                           {classItem.resourcesLink ? (
//                             <a
//                               href={classItem.resourcesLink}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition"
//                             >
//                               <Download className="w-4 h-4" />
//                               Open Resources
//                             </a>
//                           ) : (
//                             <p className="text-gray-600 text-sm">None available</p>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Assignments Section */}
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//                         <FileText className="w-6 h-6 text-indigo-600" />
//                         Assignments ({classItem.assignments.length})
//                       </h3>

//                       {classItem.assignments.length ? (
//                         <div className="space-y-4">
//                           {classItem.assignments.map((assignment) => {
//                             const deadlinePassed =
//                               new Date() > new Date(assignment.submissionDeadline);
//                             const alreadySubmitted = handleSubmissionCheck(
//                               assignment._id
//                             );
//                             const isSubmitting =
//                               submittingAssignments[assignment._id];

//                             return (
//                               <div
//                                 key={assignment._id}
//                                 className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
//                               >
//                                 <div className="flex items-start justify-between gap-4 mb-3">
//                                   <h4 className="text-lg font-semibold text-gray-900">
//                                     {assignment.title}
//                                   </h4>
//                                   {alreadySubmitted && (
//                                     <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex-shrink-0">
//                                       <CheckCircle className="w-4 h-4" />
//                                       Submitted
//                                     </span>
//                                   )}
//                                   {deadlinePassed && !alreadySubmitted && (
//                                     <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex-shrink-0">
//                                       <AlertCircle className="w-4 h-4" />
//                                       Closed
//                                     </span>
//                                   )}
//                                 </div>

//                                 <p className="text-gray-600 text-sm mb-4">
//                                   {assignment.description}
//                                 </p>

//                                 {/* Deadline */}
//                                 <div className="flex items-center gap-2 text-sm text-gray-700 mb-4 p-3 bg-orange-50 rounded-lg">
//                                   <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
//                                   <span>
//                                     <strong>Deadline:</strong>{" "}
//                                     {new Date(
//                                       assignment.submissionDeadline
//                                     ).toLocaleString()}
//                                   </span>
//                                 </div>

//                                 {/* Assignment File */}
//                                 {assignment.fileUrl && (
//                                   <a
//                                     href={`http://localhost:5004/dashboard/showallclass/${assignment.fileUrl}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm mb-4 transition"
//                                   >
//                                     <Download className="w-4 h-4" />
//                                     Download Assignment File
//                                   </a>
//                                 )}

//                                 {/* Submit Form */}
//                                 {!deadlinePassed && !alreadySubmitted ? (
//                                   <form
//                                     onSubmit={(e) => {
//                                       e.preventDefault();
//                                       const fileInput =
//                                         e.target.elements.file;

//                                       if (!fileInput.files.length) {
//                                         Swal.fire({
//                                           icon: "warning",
//                                           title: "No file selected",
//                                           text: "Please choose a file to upload.",
//                                           confirmButtonColor: "#f97316",
//                                         });
//                                         return;
//                                       }

//                                       const formData = new FormData();
//                                       formData.append(
//                                         "file",
//                                         fileInput.files[0]
//                                       );
//                                       formData.append("studentId", user._id);

//                                       handleAssignmentSubmit(
//                                         assignment._id,
//                                         formData,
//                                         courseId
//                                       );
//                                     }}
//                                     className="mt-4 pt-4 border-t border-gray-200"
//                                   >
//                                     <label className="block text-sm font-semibold text-gray-700 mb-3">
//                                       Upload Your Assignment
//                                     </label>
//                                     <input
//                                       type="file"
//                                       name="file"
//                                       className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer"
//                                       required
//                                     />

//                                     <button
//                                       type="submit"
//                                       disabled={isSubmitting}
//                                       className="mt-4 w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition disabled:from-gray-400 disabled:to-gray-400 flex items-center justify-center gap-2"
//                                     >
//                                       {isSubmitting ? (
//                                         <>
//                                           <Loader className="w-4 h-4 animate-spin" />
//                                           Submitting...
//                                         </>
//                                       ) : (
//                                         <>
//                                           <Upload className="w-4 h-4" />
//                                           Submit Assignment
//                                         </>
//                                       )}
//                                     </button>
//                                   </form>
//                                 ) : alreadySubmitted ? (
//                                   <p className="mt-4 text-green-600 font-semibold flex items-center gap-2 p-3 bg-green-50 rounded-lg">
//                                     <CheckCircle className="w-5 h-5" />
//                                     You have successfully submitted this assignment
//                                   </p>
//                                 ) : (
//                                   <p className="mt-4 text-red-600 font-semibold flex items-center gap-2 p-3 bg-red-50 rounded-lg">
//                                     <AlertCircle className="w-5 h-5" />
//                                     Submission deadline has passed
//                                   </p>
//                                 )}
//                               </div>
//                             );
//                           })}
//                         </div>
//                       ) : (
//                         <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
//                           <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                           <p className="text-gray-600 font-medium">
//                             No assignments yet.
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
//             <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//             <p className="text-gray-600 font-medium">
//               No classes available yet.
//             </p>
//             <p className="text-gray-500 text-sm mt-1">
//               Classes will appear here once your instructor adds them.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Classshow;



import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../../../provider/AuthProvider";
import {
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  BookOpen,
  Download,
  Upload,
  BarChart3,
  Loader,
  X,
} from "lucide-react";
import Swal from "sweetalert2";
import { getBaseUrl } from "../../../utils/baseUrl";

const Classshow = () => {
  const { courseId } = useParams();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const [submittingAssignments, setSubmittingAssignments] = useState({});
  const [expandedClass, setExpandedClass] = useState(null);

  // late submission modal states
  const [isLateModalOpen, setIsLateModalOpen] = useState(false);
  const [selectedLateAssignment, setSelectedLateAssignment] = useState(null);
  const [lateReason, setLateReason] = useState("");
  const [lateFile, setLateFile] = useState(null);

  const studentId = user?._id;

  // const fetchClasses = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`${getBaseUrl()}/api/${courseId}/classes`);
  //     setClasses(response.data.classes || []);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Failed to fetch classes.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [courseId]);
const fetchClasses = useCallback(async () => {
  try {
    const token = Cookies.get("token");

    const response = await axios.get(`${getBaseUrl()}/api/${courseId}/classes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setClasses(response.data.classes || []);
  } catch (err) {
    console.error(err);
    setError("Failed to fetch classes.");
  } finally {
    setLoading(false);
  }
}, [courseId]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleAssignmentSubmit = useCallback(async (assignmentId, formData, courseId) => {
    setSubmittingAssignments((prev) => ({
      ...prev,
      [assignmentId]: true,
    }));

    try {
      const url = `${getBaseUrl()}/api/courses/${courseId}/assignments/${assignmentId}/submit`;

      await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Assignment Submitted 🎉",
        text: "Your assignment was submitted successfully.",
        confirmButtonColor: "#0ea5e9",
      });

      await fetchClasses();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          err.response?.data?.message ||
          "You have already submitted this assignment.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setSubmittingAssignments((prev) => ({
        ...prev,
        [assignmentId]: false,
      }));
    }
  }, [fetchClasses]);

  const handleSubmissionCheck = useCallback(
    (assignmentId) => {
      if (!user?._id) return false;

      return classes.some((classItem) =>
        classItem.assignments?.some(
          (assignment) =>
            assignment._id === assignmentId &&
            assignment.submissions?.some(
              (submission) =>
                String(submission.student?._id || submission.student) ===
                String(user._id)
            )
        )
      );
    },
    [classes, user?._id]
  );

  const openLateModal = (assignment) => {
    setSelectedLateAssignment(assignment);
    setLateReason("");
    setLateFile(null);
    setIsLateModalOpen(true);
  };

  const closeLateModal = () => {
    setIsLateModalOpen(false);
    setSelectedLateAssignment(null);
    setLateReason("");
    setLateFile(null);
  };

  const handleLateSubmission = async () => {
    if (!selectedLateAssignment?._id) return;

    if (!lateReason.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Reason required",
        text: "Please write the reason for late submission.",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    if (!lateFile) {
      Swal.fire({
        icon: "warning",
        title: "File required",
        text: "Please choose your assignment file.",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", lateFile);
    formData.append("lateSubmissionReason", lateReason);

    setSubmittingAssignments((prev) => ({
      ...prev,
      [selectedLateAssignment._id]: true,
    }));

    try {
      await axios.post(
        `${getBaseUrl()}/api/courses/${courseId}/assignments/${selectedLateAssignment._id}/submit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Late Assignment Submitted",
        text: "Your late submission has been sent successfully.",
        confirmButtonColor: "#0ea5e9",
      });

      closeLateModal();
      await fetchClasses();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission failed",
        text:
          err.response?.data?.message ||
          "Could not submit late assignment.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setSubmittingAssignments((prev) => ({
        ...prev,
        [selectedLateAssignment._id]: false,
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-700 font-semibold">Loading classes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 px-4">
        <div className="max-w-md w-full bg-white rounded-xl border border-red-200 shadow-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <p className="text-red-700 font-semibold mb-2">{error}</p>
          <p className="text-sm text-red-500 mb-6">
            Unable to load your classes. Please try again.
          </p>
          <button
            className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 mt-5">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
            My Class
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            View classes, resources and submit assignments
          </p>
        </div>

        {studentId && (
          <Link
            className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-green-600 hover:to-emerald-700 transition"
            to={`/dashboard/courses/${courseId}/users/${studentId}`}
          >
            <BarChart3 className="w-5 h-5" />
            View Results
          </Link>
        )}

        {classes.length ? (
          <div className="space-y-5">
            {classes.map((classItem, index) => (
              <div
                key={classItem._id}
                className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedClass(
                      expandedClass === classItem._id ? null : classItem._id
                    )
                  }
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-gray-50 transition"
                >
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white text-lg font-bold shadow-md flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        {classItem.title}
                      </h2>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {classItem.description}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-500 transition flex-shrink-0 ml-3 ${
                      expandedClass === classItem._id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedClass === classItem._id && (
                  <div className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white p-5 sm:p-6 space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                          Description
                        </h3>
                        <p className="text-gray-700 text-sm">
                          {classItem.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-600" />
                            Class Date
                          </h3>
                          <p className="text-gray-700 text-sm font-medium">
                            {new Date(classItem.date).toLocaleString()}
                          </p>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-600" />
                            Resources
                          </h3>
                          {classItem.resourcesLink ? (
                            <a
                              href={classItem.resourcesLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition"
                            >
                              <Download className="w-4 h-4" />
                              Open Resources
                            </a>
                          ) : (
                            <p className="text-gray-600 text-sm">None available</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-indigo-600" />
                        Assignments ({classItem.assignments.length})
                      </h3>

                      {classItem.assignments.length ? (
                        <div className="space-y-4">
                          {classItem.assignments.map((assignment) => {
                            const deadlinePassed =
                              new Date() > new Date(assignment.submissionDeadline);
                            const alreadySubmitted = handleSubmissionCheck(
                              assignment._id
                            );
                            const isSubmitting =
                              submittingAssignments[assignment._id];

                            return (
                              <div
                                key={assignment._id}
                                className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
                              >
                                <div className="flex items-start justify-between gap-4 mb-3">
                                  <h4 className="text-lg font-semibold text-gray-900">
                                    {assignment.title}
                                  </h4>

                                  {alreadySubmitted && (
                                    <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex-shrink-0">
                                      <CheckCircle className="w-4 h-4" />
                                      Submitted
                                    </span>
                                  )}

                                  {deadlinePassed && !alreadySubmitted && (
                                    <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex-shrink-0">
                                      <AlertCircle className="w-4 h-4" />
                                      Closed
                                    </span>
                                  )}
                                </div>

                                <p className="text-gray-600 text-sm mb-3">
                                  {assignment.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-indigo-500" />
                                    <span>
                                      Deadline:{" "}
                                      {new Date(
                                        assignment.submissionDeadline
                                      ).toLocaleString()}
                                    </span>
                                  </div>
                                </div>

                                {/* {assignment.fileUrl && (
                                  <a
                                    href={`http://localhost:5004/dashboard/showallclass/${assignment.fileUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm mb-4 transition"
                                  >
                                    <Download className="w-4 h-4" />
                                    Download Assignment File
                                  </a>
                                )} */}


                                  {assignment.fileUrl && (
  <a
    href={assignment.fileUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm mb-4 transition"
  >
    <Download className="w-4 h-4" />
    Download Assignment File
  </a>
)}


                                {!deadlinePassed && !alreadySubmitted ? (
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      const fileInput = e.target.elements.file;

                                      if (!fileInput.files.length) {
                                        Swal.fire({
                                          icon: "warning",
                                          title: "No file selected",
                                          text: "Please choose a file to upload.",
                                          confirmButtonColor: "#f97316",
                                        });
                                        return;
                                      }

                                      const formData = new FormData();
                                      formData.append("file", fileInput.files[0]);

                                      handleAssignmentSubmit(
                                        assignment._id,
                                        formData,
                                        courseId
                                      );
                                    }}
                                    className="mt-4 pt-4 border-t border-gray-200"
                                  >
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                      Upload Your Assignment
                                    </label>
                                    <input
                                      type="file"
                                      name="file"
                                      className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer"
                                      required
                                    />

                                    <button
                                      type="submit"
                                      disabled={isSubmitting}
                                      className="mt-4 w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition disabled:from-gray-400 disabled:to-gray-400 flex items-center justify-center gap-2"
                                    >
                                      {isSubmitting ? (
                                        <>
                                          <Loader className="w-4 h-4 animate-spin" />
                                          Submitting...
                                        </>
                                      ) : (
                                        <>
                                          <Upload className="w-4 h-4" />
                                          Submit Assignment
                                        </>
                                      )}
                                    </button>
                                  </form>
                                ) : alreadySubmitted ? (
                                  <p className="mt-4 text-green-600 font-semibold flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                                    <CheckCircle className="w-5 h-5" />
                                    You have successfully submitted this assignment
                                  </p>
                                ) : (
                                  <div className="mt-4 space-y-3">
                                    <p className="text-red-600 font-semibold flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                                      <AlertCircle className="w-5 h-5" />
                                      Submission deadline has passed
                                    </p>

                                    <button
                                      type="button"
                                      onClick={() => openLateModal(assignment)}
                                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition"
                                    >
                                      <Upload className="w-4 h-4" />
                                      Request Late Submission
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                          <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 font-medium">
                            No assignments yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">
              No classes available yet.
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Classes will appear here once your instructor adds them.
            </p>
          </div>
        )}
      </div>

      {isLateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">
                Late Submission Request
              </h3>
              <button
                type="button"
                onClick={closeLateModal}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Assignment
                </p>
                <p className="text-sm text-gray-600">
                  {selectedLateAssignment?.title}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reason / Description
                </label>
                <textarea
                  rows={5}
                  value={lateReason}
                  onChange={(e) => setLateReason(e.target.value)}
                  placeholder="Write why you are submitting after the deadline..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Assignment File
                </label>
                <input
                  type="file"
                  onChange={(e) => setLateFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-700 border border-gray-300 rounded-xl px-3 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-5 py-4 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={closeLateModal}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLateSubmission}
                disabled={submittingAssignments[selectedLateAssignment?._id]}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 disabled:opacity-60"
              >
                {submittingAssignments[selectedLateAssignment?._id]
                  ? "Submitting..."
                  : "Submit Late Assignment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classshow;