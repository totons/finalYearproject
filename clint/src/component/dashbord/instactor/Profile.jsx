import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200 transition-transform transform hover:scale-105">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-gradient bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                Profile Details
            </h2>

            <div className="mb-8 flex items-center justify-center">
                <img
                    src={user.image}
                    alt={`${user.fullname}'s profile`}
                    className="w-36 h-36 rounded-full border-4 border-gradient-to-r from-blue-400 to-purple-500 shadow-lg transform hover:scale-110 transition-transform"
                />
            </div>

            <div className="text-center mb-6">
                <h3 className="text-3xl font-semibold text-gray-800">{user.fullname}</h3>
                <p className="text-lg text-gray-600 italic">{user.email}</p>
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="text-xl font-semibold text-blue-700 border-b-2 border-gray-200 pb-1">
                        About Me
                    </h4>
                    <p className="text-gray-700 mt-2">{user.aboutUs || 'No information provided.'}</p>
                </div>

                <div>
                    <h4 className="text-xl font-semibold text-blue-700 border-b-2 border-gray-200 pb-1">
                        Skills
                    </h4>
                    <p className="text-gray-700 mt-2">{user.skills || 'No skills listed.'}</p>
                </div>

                <div>
                    <h4 className="text-xl font-semibold text-blue-700 border-b-2 border-gray-200 pb-1">
                        GitHub
                    </h4>
                    <a
                        href={user.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block text-blue-600 hover:text-blue-800 hover:underline transition-opacity ${user.githubLink ? '' : 'cursor-not-allowed opacity-50'}`}
                    >
                        {user.githubLink || 'No GitHub link provided.'}
                    </a>
                </div>

                <div>
                    <h4 className="text-xl font-semibold text-blue-700 border-b-2 border-gray-200 pb-1">
                        LinkedIn
                    </h4>
                    <a
                        href={user.linkedInLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block text-blue-600 hover:text-blue-800 hover:underline transition-opacity ${user.linkedInLink ? '' : 'cursor-not-allowed opacity-50'}`}
                    >
                        {user.linkedInLink || 'No LinkedIn link provided.'}
                    </a>
                </div>

                <div>
                    <h4 className="text-xl font-semibold text-blue-700 border-b-2 border-gray-200 pb-1">
                        Work Experience
                    </h4>
                    {user.workExperience.length > 0 ? (
                        user.workExperience.map((work, index) => (
                            <div
                                key={index}
                                className="border-l-4 border-blue-400 bg-blue-50 px-4 py-3 rounded-lg shadow-sm mb-4 hover:bg-blue-100"
                            >
                                <p className="font-semibold text-gray-800">{work.company}</p>
                                <p className="text-gray-600">{work.position}</p>
                                <p className="text-gray-500">
                                    {new Date(work.startDate).toLocaleDateString()} -{' '}
                                    {work.endDate ? new Date(work.endDate).toLocaleDateString() : ' Present'}
                                </p>
                                <p className="text-gray-700 mt-1">{work.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No work experience listed.</p>
                    )}
                </div>

                <div>
                    <h4 className="text-xl font-semibold text-blue-700 border-b-2 border-gray-200 pb-1">
                        Education Experience
                    </h4>
                    {user.educationExperience.length > 0 ? (
                        user.educationExperience.map((education, index) => (
                            <div
                                key={index}
                                className="border-l-4 border-purple-400 bg-purple-50 px-4 py-3 rounded-lg shadow-sm mb-4 hover:bg-purple-100"
                            >
                                <p className="font-semibold text-gray-800">{education.institution}</p>
                                <p className="text-gray-600">{education.degree}</p>
                                <p className="text-gray-500">
                                    {new Date(education.startDate).toLocaleDateString()} -{' '}
                                    {education.endDate ? new Date(education.endDate).toLocaleDateString() : ' Present'}
                                </p>
                                <p className="text-gray-700 mt-1">{education.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No education experience listed.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
