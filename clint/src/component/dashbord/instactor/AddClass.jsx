// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Plus, BookOpen, FileText, ExternalLink, Calendar, CheckCircle, AlertCircle, Loader } from 'lucide-react';
// import { getBaseUrl } from '../../../utils/baseUrl';

// const AddClass = () => {
//     const { courseId } = useParams();
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         resourcesLink: '',
//         classLink: '',
//         date: ''
//     });

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         setSuccess(false);

//         try {
//             const response = await axios.post(
//                 `${getBaseUrl()}/api/${courseId}/add-class`, 
//                 formData
//             );
//             setSuccess(true);
//             setFormData({
//                 title: '',
//                 description: '',
//                 resourcesLink: '',
//                 classLink: '',
//                 date: ''
//             });
//             console.log('Class added successfully:', response.data);
            
//             setTimeout(() => setSuccess(false), 5000);
//         } catch (err) {
//             setError('Failed to add class. Please try again.');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 md:p-10">
//             {/* Header */}
//             {/* <div className="mb-10">
//                 <div className="flex items-center gap-3 mb-2">
//                     <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
//                         <Plus className="w-7 h-7 text-white" />
//                     </div>
//                     <h1 className="text-4xl font-bold text-slate-900">Add New Class</h1>
//                 </div>
//                 <p className="text-slate-600 ml-16">Create a new class session for your course</p>
//             </div> */}


//              {/* Header */}
//                 <div className="text-center mb-8 mt-5">
//                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
//                         Add New Class
//                     </h2>
//                     <p className="text-gray-600 text-sm sm:text-base">Review and publish courses awaiting approval</p>
                    
//                 </div>

//             {/* Alert Messages */}
//             {success && (
//                 <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 shadow-md">
//                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
//                     <span className="text-green-800 font-medium">Class added successfully! Your new class is now available.</span>
//                 </div>
//             )}
            
//             {error && (
//                 <div className="mb-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 shadow-md">
//                     <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
//                     <span className="text-red-800 font-medium">{error}</span>
//                 </div>
//             )}

//             {/* Form Container */}
//             <div className="max-w-7xl mx-auto">
//                 <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
//                     {/* Form Header */}
//                     <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-6 border-b border-slate-200">
//                         <p className="text-slate-600 font-medium">Fill in the class details below</p>
//                     </div>

//                     {/* Form Content */}
//                     <div onSubmit={handleSubmit} className="p-4 lg:p-8 space-y-6" role="form">
//                         {/* Title Field */}
//                         <div>
//                             <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3">
//                                 <BookOpen className="w-4 h-4 text-blue-600" />
//                                 Class Title
//                             </label>
//                             <input
//                                 type="text"
//                                 id="title"
//                                 name="title"
//                                 value={formData.title}
//                                 onChange={handleChange}
//                                 placeholder="e.g., Introduction to React"
//                                 className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
//                                 required
//                             />
//                         </div>

//                         {/* Description Field */}
//                         <div>
//                             <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3">
//                                 <FileText className="w-4 h-4 text-blue-600" />
//                                 Description
//                             </label>
//                             <textarea
//                                 id="description"
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 placeholder="Describe what this class will cover..."
//                                 className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white resize-none"
//                                 rows="4"
//                                 required
//                             />
//                         </div>

//                         {/* Links Section */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Resources Link */}
//                             <div>
//                                 <label htmlFor="resourcesLink" className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3">
//                                     <ExternalLink className="w-4 h-4 text-purple-600" />
//                                     Resources Link
//                                 </label>
//                                 <input
//                                     type="url"
//                                     id="resourcesLink"
//                                     name="resourcesLink"
//                                     value={formData.resourcesLink}
//                                     onChange={handleChange}
//                                     placeholder="https://example.com/resources"
//                                     className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
//                                     required
//                                 />
//                             </div>

//                             {/* Class Link */}
//                             <div>
//                                 <label htmlFor="classLink" className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3">
//                                     <ExternalLink className="w-4 h-4 text-indigo-600" />
//                                     Class Link
//                                 </label>
//                                 <input
//                                     type="url"
//                                     id="classLink"
//                                     name="classLink"
//                                     value={formData.classLink}
//                                     onChange={handleChange}
//                                     placeholder="https://meet.example.com/class"
//                                     className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
//                                     required
//                                 />
//                             </div>
//                         </div>

//                         {/* Date Field */}
//                         <div>
//                             <label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3">
//                                 <Calendar className="w-4 h-4 text-green-600" />
//                                 Class Date & Time
//                             </label>
//                             <input
//                                 type="datetime-local"
//                                 id="date"
//                                 name="date"
//                                 value={formData.date}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
//                                 required
//                             />
//                         </div>

//                         {/* Submit Button */}
//                         <button
//                             onClick={handleSubmit}
//                             disabled={loading}
//                             className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
//                                 loading
//                                     ? 'bg-slate-400 cursor-not-allowed'
//                                     : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
//                             }`}
//                         >
//                             {loading ? (
//                                 <>
//                                     <Loader className="w-5 h-5 animate-spin" />
//                                     Adding Class...
//                                 </>
//                             ) : (
//                                 <>
//                                     <Plus className="w-5 h-5" />
//                                     Add Class
//                                 </>
//                             )}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Info Box */}
                
//             </div>
//         </div>
//     );
// };

// export default AddClass;



import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Plus,
  BookOpen,
  FileText,
  ExternalLink,
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import { getBaseUrl } from "../../../utils/baseUrl";

const AddClass = () => {
  const { courseId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    resourcesLink: "",
    classLink: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const token = Cookies.get("token");

      const response = await axios.post(
        `${getBaseUrl()}/api/${courseId}/add-class`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);

      setFormData({
        title: "",
        description: "",
        resourcesLink: "",
        classLink: "",
        date: "",
      });

      console.log("Class added successfully:", response.data);

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add class. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 md:p-10">
      <div className="text-center mb-8 mt-5">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
          Add New Class
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Create a new class session for your course
        </p>
      </div>

      {success && (
        <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 shadow-md">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <span className="text-green-800 font-medium">
            Class added successfully! Your new class is now available.
          </span>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 shadow-md">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span className="text-red-800 font-medium">{error}</span>
        </div>
      )}

      <div className=" mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-6 border-b border-slate-200">
            <p className="text-slate-600 font-medium">
              Fill in the class details below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-4 lg:p-8 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                Class Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Introduction to React"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what this class will cover..."
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white resize-none"
                rows="4"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="resourcesLink"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3"
                >
                  <ExternalLink className="w-4 h-4 text-purple-600" />
                  Resources Link
                </label>
                <input
                  type="url"
                  id="resourcesLink"
                  name="resourcesLink"
                  value={formData.resourcesLink}
                  onChange={handleChange}
                  placeholder="https://example.com/resources"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="classLink"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3"
                >
                  <ExternalLink className="w-4 h-4 text-indigo-600" />
                  Class Link
                </label>
                <input
                  type="url"
                  id="classLink"
                  name="classLink"
                  value={formData.classLink}
                  onChange={handleChange}
                  placeholder="https://meet.example.com/class"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="date"
                className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3"
              >
                <Calendar className="w-4 h-4 text-green-600" />
                Class Date & Time
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Adding Class...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add Class
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClass;