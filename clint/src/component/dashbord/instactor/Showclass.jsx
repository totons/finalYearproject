import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../../../provider/AuthProvider";
import { BookOpen, Calendar, Link as LinkIcon, FileText, AlertCircle, CheckCircle, Loader } from "lucide-react";
import { getBaseUrl } from "../../../utils/baseUrl";

const Showclass = () => {
  const { courseId } = useParams();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const [submittingAssignments, setSubmittingAssignments] = useState({});

  const studentId = user._id;

  // useEffect(() => {
  //   const fetchClasses = async () => {
  //     try {
  //       const response = await axios.get(`${getBaseUrl()}/api/${courseId}/classes`);
  //       setClasses(response.data.classes);
  //     } catch (err) {
  //       setError("Failed to fetch classes.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchClasses();
  // }, [courseId]);

  useEffect(() => {
  const fetchClasses = async () => {
    try {
      const token = Cookies.get("token");

      const response = await axios.get(
        `${getBaseUrl()}/api/${courseId}/classes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClasses(response.data.classes || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch classes.");
    } finally {
      setLoading(false);
    }
  };

  fetchClasses();
}, [courseId]);

  const handleAssignmentSubmit = useCallback(
    async (assignmentId, formData, courseId) => {
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

        alert("Assignment submitted successfully!");
      } catch (err) {
        console.error(err);
        alert("Error submitting assignment. Please try again.");
      } finally {
        setSubmittingAssignments((prev) => ({
          ...prev,
          [assignmentId]: false,
        }));
      }
    },
    []
  );

  const handleSubmissionCheck = useCallback(
    (assignmentId) => {
      return classes.some((classItem) =>
        classItem.assignments.some(
          (assignment) =>
            assignment._id === assignmentId &&
            assignment.submissions.some((submission) => submission.studentId === user._id)
        )
      );
    },
    [classes, user._id]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                      <div className="text-center">
                          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
                          <p className="text-lg font-semibold text-gray-700">Loading your courses...</p>
                      </div>
                  </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md text-center shadow-lg">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-800 font-semibold text-lg mb-4">{error}</p>
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 md:p-10">
      {/* Header */}
      {/* <div className="mb-12 max-w-7xl mx-auto">
        <div className="flex justify-between gap-3 mb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Class Sessions</h1>
        
          </div>

          
        </div>
        <p className="text-slate-600 text-lg ml-14">{classes.length} {classes.length === 1 ? 'session' : 'sessions'} available</p>
      </div> */}


<div className="text-center mb-8 mt-5">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                        Class Sessions
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">Review and publish courses awaiting approval</p>
                    <div className="mt-4 inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                        {classes.length} {classes.length === 1 ? 'session' : 'sessions'} available
                    </div>
                </div>

<div className="w-full py-2 lg:py-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    
    <Link
      to={`/dashboard/addclass/${courseId}`}
      className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 transition text-center w-full"
    >
      Add Class
    </Link>

    <Link
      to={`/dashboard/addassigment/${courseId}`}
      className="bg-green-500 text-white px-5 py-3 rounded-xl hover:bg-green-600 transition text-center w-full"
    >
      Add Assignment
    </Link>

  </div>
</div>


      {/* Classes Grid */}
      {classes.length > 0 ? (
        <div className=" mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {classes.map((classItem, index) => (
              <div
                key={classItem._id}
                className="group bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-700 rounded-full text-sm font-semibold mb-2">
                        Session {index + 1}
                      </span>
                      <h2 className="text-2xl font-bold">{classItem.title}</h2>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* Description */}
                  <div>
                    <p className="text-slate-700 leading-relaxed">{classItem.description}</p>
                  </div>

                  {/* Meta Information */}
                  <div className="space-y-3 border-t border-b border-slate-200 py-4">
                    {/* Date */}
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-600">Date & Time</p>
                        <p className="font-semibold text-slate-900">
                          {new Date(classItem.date).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Resources Link */}
                    <div className="flex items-start gap-3">
                      <LinkIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-600">Resources</p>
                        <a
                          href={classItem.resourcesLink}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium truncate block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resources
                        </a>
                      </div>
                    </div>

                    {/* Class Link */}
                    <div className="flex items-start gap-3">
                      <LinkIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-600">Class Link</p>
                        <a
                          href={classItem.classLink}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium truncate block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join Class
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Assignments Section */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Assignments ({classItem.assignments.length})
                    </h3>

                    {classItem.assignments.length > 0 ? (
                      <ul className="space-y-3">
                        {classItem.assignments.map((assignment) => {
                          const deadlinePassed = new Date() > new Date(assignment.submissionDeadline);
                          const alreadySubmitted = handleSubmissionCheck(assignment._id);

                          return (
                            <li
                              key={assignment._id}
                              className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:border-blue-300 transition-all"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-slate-900">{assignment.title}</h4>
                                {alreadySubmitted && (
                                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                )}
                              </div>

                              <p className="text-slate-600 text-sm mb-3">{assignment.description}</p>

                              {/* Deadline */}
                              <div className="flex items-center gap-2 mb-3 text-sm">
                                <Calendar className="w-4 h-4 text-slate-500" />
                                <span className={deadlinePassed ? "text-red-600 font-semibold" : "text-slate-600"}>
                                  Deadline: {new Date(assignment.submissionDeadline).toLocaleString()}
                                </span>
                              </div>

                              {/* File Link */}
                              {assignment.fileUrl && (
                                <div className="mb-3">
                                  <a
                                    href={`http://localhost:5004/dashboard/showallclass/${assignment.fileUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline"
                                  >
                                    <FileText className="w-4 h-4" />
                                    {assignment.fileUrl.includes(".pdf") ? "Open PDF" : "Download File"}
                                  </a>
                                </div>
                              )}

                              {/* Status Badges */}
                              <div className="flex gap-2">
                                {deadlinePassed && (
                                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                    Deadline Passed
                                  </span>
                                )}
                                {alreadySubmitted && (
                                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                    Submitted
                                  </span>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-slate-600 italic">No assignments for this session yet.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-200">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-blue-100 rounded-lg">
                <BookOpen className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">No Classes Available</h2>
            <p className="text-slate-600 text-lg">There are no class sessions available for this course yet.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Showclass;