import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2"; // SweetAlert2 import
import { getBaseUrl } from "../../../utils/baseUrl";

const AddAssignment = () => {
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submissionDeadline, setSubmissionDeadline] = useState("");
  const [classId, setClassId] = useState("");
  const [file, setFile] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoadingClasses(true);
        const response = await fetch(
          `${getBaseUrl()}/api/${courseId}/classes`
        );
        const data = await response.json();

        if (response.ok) {
          setClasses(data.classes || []);
        } else {
          Swal.fire("Oops!", data.message, "error");
        }
      } catch (err) {
        Swal.fire("Error", "Failed to load classes!", "error");
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchClasses();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !submissionDeadline || !classId) {
      Swal.fire("Missing Fields", "All fields are required!", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("submissionDeadline", submissionDeadline);
    formData.append("classId", classId);
    if (file) formData.append("file", file);

    try {
      setSubmitting(true);
      const response = await fetch(
        `${getBaseUrl()}/api/${courseId}/add-assignment`,
        { method: "POST", body: formData }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Assignment Added",
          text: "Assignment created successfully!",
          timer: 1800,
          showConfirmButton: false,
        });

        setTitle("");
        setDescription("");
        setSubmissionDeadline("");
        setClassId("");
        setFile(null);
      } else {
        Swal.fire("Error", data.message || "Failed to add assignment", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-3 sm:px-6 py-8">
      <div className="w-full max-w-6xl">

        {/* Header */}
        

        {/* Header */}
                <div className="text-center mb-8 mt-5">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                         Add New Assignment
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">Create assignment, set deadline & attach file.</p>
                    
                </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 space-y-5"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Assignment Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. Chapter 1 Quiz"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Describe the assignment briefly..."
            />
          </div>

          {/* Deadline + Class */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Submission Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={submissionDeadline}
                onChange={(e) => setSubmissionDeadline(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Class Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Select Class <span className="text-red-500">*</span>
              </label>
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg text-sm text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {loadingClasses ? (
                  <option>Loading classes...</option>
                ) : (
                  <>
                    <option value="">Select class</option>
                    {classes.map((cls) => (
                      <option key={cls._id} value={cls._id}>
                        {cls.title}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Upload File (optional)
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-600 border border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:bg-blue-50 file:text-blue-600 file:py-2 file:px-4 file:border-none file:rounded-md hover:file:bg-blue-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-lg text-white font-semibold text-sm shadow-md transition 
              ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {submitting ? "Adding..." : "Add Assignment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAssignment;
