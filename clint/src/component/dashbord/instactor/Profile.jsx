import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200 transition-transform transform hover:scale-105">
            <h2 className="text-4xl font-bold text-center mb-6 text-blue-600">Profile Details</h2>
            
            <div className="mb-6 flex items-center justify-center">
                <img 
                    src={user.image} 
                    alt={`${user.fullname}'s profile`} 
                    className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-md transition-transform transform hover:scale-110"
                />
            </div>
            
            <div className="text-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">{user.fullname}</h3>
                <p className="text-lg text-gray-600">{user.email}</p>
            </div>

            <div className="mb-4">
                <h4 className="text-xl font-semibold text-gray-700">About Me</h4>
                <p className="text-gray-600">{user.aboutUs || 'No information provided.'}</p>
            </div>

            <div className="mb-4">
                <h4 className="text-xl font-semibold text-gray-700">Skills</h4>
                <p className="text-gray-600">{user.skills || 'No skills listed.'}</p>
            </div>

            <div className="mb-4">
                <h4 className="text-xl font-semibold text-gray-700">GitHub</h4>
                <a 
                    href={user.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`text-blue-600 hover:underline ${user.githubLink ? '' : 'cursor-not-allowed opacity-50'}`}>
                    {user.githubLink || 'No GitHub link provided.'}
                </a>
            </div>

            <div className="mb-4">
                <h4 className="text-xl font-semibold text-gray-700">LinkedIn</h4>
                <a 
                    href={user.linkedInLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`text-blue-600 hover:underline ${user.linkedInLink ? '' : 'cursor-not-allowed opacity-50'}`}>
                    {user.linkedInLink || 'No LinkedIn link provided.'}
                </a>
            </div>

            <div className="mb-4">
                <h4 className="text-xl font-semibold text-gray-700">Work Experience</h4>
                {user.workExperience.length > 0 ? (
                    user.workExperience.map((work, index) => (
                        <div key={index} className="border-b border-gray-300 py-2 mb-2 hover:bg-gray-100 transition-colors duration-200">
                            <p className="font-semibold text-gray-800">{work.company}</p>
                            <p className="text-gray-600">{work.position}</p>
                            <p className="text-gray-500">
                                {new Date(work.startDate).toLocaleDateString()} - 
                                {work.endDate ? new Date(work.endDate).toLocaleDateString() : ' Present'}
                            </p>
                            <p className="text-gray-600">{work.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No work experience listed.</p>
                )}
            </div>

            <div className="mb-4">
                <h4 className="text-xl font-semibold text-gray-700">Education Experience</h4>
                {user.educationExperience.length > 0 ? (
                    user.educationExperience.map((education, index) => (
                        <div key={index} className="border-b border-gray-300 py-2 mb-2 hover:bg-gray-100 transition-colors duration-200">
                            <p className="font-semibold text-gray-800">{education.institution}</p>
                            <p className="text-gray-600">{education.degree}</p>
                            <p className="text-gray-500">
                                {new Date(education.startDate).toLocaleDateString()} - 
                                {education.endDate ? new Date(education.endDate).toLocaleDateString() : ' Present'}
                            </p>
                            <p className="text-gray-600">{education.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No education experience listed.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
