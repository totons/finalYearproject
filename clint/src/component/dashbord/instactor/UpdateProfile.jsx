import React, { useContext, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../utils/baseUrl';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../provider/AuthProvider';

const UpdateProfile = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        skills: '',
        githubLink: '',
        linkedInLink: '',
        aboutUs: '',
        workExperience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
        educationExperience: [{ institution: '', degree: '', startDate: '', endDate: '', description: '' }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleWorkExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const newWorkExperience = [...formData.workExperience];
        newWorkExperience[index][name] = value;
        setFormData({ ...formData, workExperience: newWorkExperience });
    };

    const handleEducationExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const newEducationExperience = [...formData.educationExperience];
        newEducationExperience[index][name] = value;
        setFormData({ ...formData, educationExperience: newEducationExperience });
    };

    const addWorkExperience = () => {
        setFormData((prevData) => ({
            ...prevData,
            workExperience: [...prevData.workExperience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
        }));
    };

    const addEducationExperience = () => {
        setFormData((prevData) => ({
            ...prevData,
            educationExperience: [...prevData.educationExperience, { institution: '', degree: '', startDate: '', endDate: '', description: '' }]
        }));
    };

    const removeWorkExperience = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            workExperience: prevData.workExperience.filter((_, i) => i !== index)
        }));
    };

    const removeEducationExperience = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            educationExperience: prevData.educationExperience.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        };
        try {
            await axios.patch(`${getBaseUrl()}/user/instructor/${user._id}`, formData, config);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Instructor profile updated successfully',
            });
        } catch (error) {
            console.error('Error updating instructor profile:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update instructor profile',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-0 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 sm:px-8 py-8 sm:py-10">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center">
                            Instructor Profile
                        </h2>
                        <p className="text-blue-100 text-center mt-2 text-sm sm:text-base">
                            Update your professional information
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-8 space-y-8">
                        {/* Personal Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
                                Personal Information
                            </h3>
                            
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Skills
                                    </label>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                                        placeholder="e.g., JavaScript, React, Node.js"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            GitHub Profile
                                        </label>
                                        <input
                                            type="url"
                                            name="githubLink"
                                            value={formData.githubLink}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                                            placeholder="https://github.com/username"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            LinkedIn Profile
                                        </label>
                                        <input
                                            type="url"
                                            name="linkedInLink"
                                            value={formData.linkedInLink}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                                            placeholder="https://linkedin.com/in/username"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        About You
                                    </label>
                                    <textarea
                                        name="aboutUs"
                                        value={formData.aboutUs}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none resize-none"
                                        rows="5"
                                        placeholder="Tell us about your teaching experience and expertise..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Work Experience Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-purple-500 pb-2 flex-grow">
                                    Work Experience
                                </h3>
                            </div>

                            <div className="space-y-6">
                                {formData.workExperience.map((work, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition duration-200">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-sm font-medium text-gray-500">
                                                Experience #{index + 1}
                                            </span>
                                            {formData.workExperience.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeWorkExperience(index)}
                                                    className="text-red-600 hover:text-red-700 text-sm font-medium hover:underline transition duration-150"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="sm:col-span-2">
                                                <input
                                                    type="text"
                                                    name="company"
                                                    placeholder="Company Name"
                                                    value={work.company}
                                                    onChange={(e) => handleWorkExperienceChange(index, e)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none bg-white"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <input
                                                    type="text"
                                                    name="position"
                                                    placeholder="Position/Title"
                                                    value={work.position}
                                                    onChange={(e) => handleWorkExperienceChange(index, e)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                                                <input
                                                    type="date"
                                                    name="startDate"
                                                    value={work.startDate}
                                                    onChange={(e) => handleWorkExperienceChange(index, e)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">End Date</label>
                                                <input
                                                    type="date"
                                                    name="endDate"
                                                    value={work.endDate}
                                                    onChange={(e) => handleWorkExperienceChange(index, e)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none bg-white"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <textarea
                                                    name="description"
                                                    placeholder="Description of your role and achievements..."
                                                    value={work.description}
                                                    onChange={(e) => handleWorkExperienceChange(index, e)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none resize-none bg-white"
                                                    rows="3"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button 
                                type="button" 
                                onClick={addWorkExperience} 
                                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-200 font-medium shadow-md hover:shadow-lg"
                            >
                                + Add Work Experience
                            </button>
                        </div>

                        {/* Education Experience Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-green-500 pb-2 flex-grow">
                                    Education
                                </h3>
                            </div>

                            <div className="space-y-6">
                                {formData.educationExperience.map((education, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-green-300 transition duration-200">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-sm font-medium text-gray-500">
                                                Education #{index + 1}
                                            </span>
                                            {formData.educationExperience.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeEducationExperience(index)}
                                                    className="text-red-600 hover:text-red-700 text-sm font-medium hover:underline transition duration-150"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="sm:col-span-2">
                                                <input
                                                    type="text"
                                                    name="institution"
                                                    placeholder="Institution Name"
                                                    value={education.institution}
                                                    onChange={(e) => handleEducationExperienceChange(index, e)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none bg-white"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <input
                                                    type="text"
                                                    name="degree"
                                                    placeholder="Degree/Qualification"
                                                    value={education.degree}
                                                    onChange={(e) => handleEducationExperienceChange(index, e)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                                                <input
                                                    type="date"
                                                    name="startDate"
                                                    value={education.startDate}
                                                    onChange={(e) => handleEducationExperienceChange(index, e)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">End Date</label>
                                                <input
                                                    type="date"
                                                    name="endDate"
                                                    value={education.endDate}
                                                    onChange={(e) => handleEducationExperienceChange(index, e)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none bg-white"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <textarea
                                                    name="description"
                                                    placeholder="Description of your studies and achievements..."
                                                    value={education.description}
                                                    onChange={(e) => handleEducationExperienceChange(index, e)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none resize-none bg-white"
                                                    rows="3"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button 
                                type="button" 
                                onClick={addEducationExperience} 
                                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition duration-200 font-medium shadow-md hover:shadow-lg"
                            >
                                + Add Education
                            </button>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 border-t border-gray-200">
                            <button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;