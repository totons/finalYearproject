import React, { useContext, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../utils/baseUrl';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../provider/AuthProvider';

const UpdateProfile = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
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
        console.log(formData);
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
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Instructor Profile</h2>

            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-800">Skills</label>
                <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                    placeholder="Enter your skills"
                />
            </div>

            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-800">GitHub Link</label>
                <input
                    type="url"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                    placeholder="https://github.com/username"
                />
            </div>

            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-800">LinkedIn Link</label>
                <input
                    type="url"
                    name="linkedInLink"
                    value={formData.linkedInLink}
                    onChange={handleChange}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                    placeholder="https://linkedin.com/in/username"
                />
            </div>

            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-800">About Us</label>
                <textarea
                    name="aboutUs"
                    value={formData.aboutUs}
                    onChange={handleChange}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                    rows="4"
                    placeholder="Tell us about yourself..."
                />
            </div>

            <h3 className="text-lg font-bold mt-8 mb-3">Work Experience</h3>
            {formData.workExperience.map((work, index) => (
                <div key={index} className="mb-4 border-t border-gray-300 pt-4">
                    <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={work.company}
                        onChange={(e) => handleWorkExperienceChange(index, e)}
                        className="mt-1 mb-2 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                    />
                    <input
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={work.position}
                        onChange={(e) => handleWorkExperienceChange(index, e)}
                        className="mt-1 mb-2 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                    />
                    <input
                        type="date"
                        name="startDate"
                        value={work.startDate}
                        onChange={(e) => handleWorkExperienceChange(index, e)}
                        className="mt-1 mb-2 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                    />
                    <input
                        type="date"
                        name="endDate"
                        value={work.endDate}
                        onChange={(e) => handleWorkExperienceChange(index, e)}
                        className="mt-1 mb-2 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={work.description}
                        onChange={(e) => handleWorkExperienceChange(index, e)}
                        className="mt-1 mb-2 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                        rows="2"
                    />
                    <button
                        type="button"
                        onClick={() => removeWorkExperience(index)}
                        className="text-red-600 hover:underline"
                    >
                        Remove Work Experience
                    </button>
                </div>
            ))}
            <button type="button" onClick={addWorkExperience} className="text-blue-600 hover:underline mb-6">Add Work Experience</button>

            <h3 className="text-lg font-bold mt-8 mb-3">Education Experience</h3>
            {formData.educationExperience.map((education, index) => (
                <div key={index} className="mb-4 border-t border-gray-300 pt-4">
                    <input
                        type="text"
                        name="institution"
                        placeholder="Institution"
                        value={education.institution}
                        onChange={(e) => handleEducationExperienceChange(index, e)}
                        className="mt-1 mb-2 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                    />
                    <input
                        type="text"
                        name="degree"
                        placeholder="Degree"
                        value={education.degree}
                        onChange={(e) => handleEducationExperienceChange(index, e)}
                        className="mt-1 mb-2 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                    />
                    <input
                        type="date"
                        name="startDate"
                        value={education.startDate}
                        onChange={(e) => handleEducationExperienceChange(index, e)}
                        className="mt-1 mb-2 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                    />
                    <input
                        type="date"
                        name="endDate"
                        value={education.endDate}
                        onChange={(e) => handleEducationExperienceChange(index, e)}
                        className="mt-1 mb-2 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={education.description}
                        onChange={(e) => handleEducationExperienceChange(index, e)}
                        className="mt-1 mb-2 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                        rows="2"
                    />
                    <button
                        type="button"
                        onClick={() => removeEducationExperience(index)}
                        className="text-red-600 hover:underline"
                    >
                        Remove Education Experience
                    </button>
                </div>
            ))}
            <button type="button" onClick={addEducationExperience} className="text-blue-600 hover:underline mb-6">Add Education Experience</button>

            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150">
                Update Profile
            </button>
        </form>
    );
};

export default UpdateProfile;
