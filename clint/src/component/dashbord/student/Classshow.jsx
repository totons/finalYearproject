import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../../../provider/AuthProvider";

const Classshow = () => {
  const { courseId } = useParams();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const [submittingAssignments, setSubmittingAssignments] = useState({});

  const studentId = user._id;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5004/api/${courseId}/classes`);
        setClasses(response.data.classes);
      } catch (err) {
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
        const url = `http://127.0.0.1:5004/api/courses/${courseId}/assignments/${assignmentId}/submit`;

        await axios.post(url, formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        alert("Assignment submitted successfully!");
      } catch (err) {
        console.error(err);
        alert("Already submitting assignment");
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mx-4 text-center text-red-600 bg-red-50 rounded-lg border border-red-200">
        {error}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4 px-4 flex">
        <h1>Class</h1>
        <Link
          className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          to={`/dashboard/courses/${courseId}/users/${studentId}`}
        >
          Result
        </Link>
      </h1>

      {classes.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
          {classes.map((classItem, index) => (
            <div
              key={classItem._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Class {index + 1}: {classItem.title}
                </h2>
                <p className="text-gray-600 mb-4">{classItem.description}</p>
                <p>
                  <span className="font-medium text-gray-700">Resources: </span>
                  <a
                    href={classItem.resourcesLink}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {classItem.resourcesLink}
                  </a>
                </p>
                <p>
                  <span className="font-medium text-gray-700">
                    Class Link:{" "}
                  </span>
                  <a
                    href={classItem.classLink}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {classItem.classLink}
                  </a>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Date: </span>
                  {new Date(classItem.date).toLocaleString()}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Assignments
                </h3>
                {classItem.assignments.length > 0 ? (
                  <ul className="space-y-4">
                    {classItem.assignments.map((assignment) => {
                      const deadlinePassed = new Date() > new Date(assignment.submissionDeadline);
                      const alreadySubmitted = handleSubmissionCheck(assignment._id);

                      return (
                        <li key={assignment._id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <h4 className="font-semibold text-gray-800">{assignment.title}</h4>
                          <p className="text-gray-600">{assignment.description}</p>
                          <p>
                            <span className="font-medium text-gray-700">File: </span>
                            <a
                              href={`http://localhost:5004/dashboard/showallclass/${assignment.fileUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {assignment.fileUrl.includes(".pdf") ? "Open PDF" : "Download File"}
                            </a>
                          </p>

                          <p>
                            <span className="font-medium text-gray-700">Deadline: </span>
                            {new Date(assignment.submissionDeadline).toLocaleString()}
                          </p>

                          {/* Submission Form */}
                          {!deadlinePassed && !alreadySubmitted ? (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();

                                const fileInput = e.target.elements.file;

                                if (!fileInput || !fileInput.files[0]) {
                                  alert("Please select a file to submit.");
                                  return;
                                }

                                const formData = new FormData();
                                formData.append("file", fileInput.files[0]);
                                formData.append("studentId", user._id);

                                handleAssignmentSubmit(assignment._id, formData, courseId);
                              }}
                            >
                              <input
                                type="file"
                                name="file"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                required
                              />
                              <button
                                type="submit"
                                className={`mt-4 px-4 py-2 rounded-lg ${
                                  submittingAssignments[assignment._id]
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : alreadySubmitted
                                    ? "bg-green-500 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                                } text-white`}
                                disabled={submittingAssignments[assignment._id] || alreadySubmitted || deadlinePassed}
                              >
                                {submittingAssignments[assignment._id]
                                  ? "Submitting..."
                                  : alreadySubmitted
                                  ? "Already Submitted"
                                  : "Submit Assignment"}
                              </button>
                            </form>
                          ) : alreadySubmitted ? (
                            <p className="text-green-500 mt-4">Assignment already submitted!</p>
                          ) : (
                            <p className="text-red-500 mt-4">Deadline passed. Cannot submit.</p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p>No assignments available for this class.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No classes available for this course.</p>
      )}
    </div>
  );
};

export default Classshow;
