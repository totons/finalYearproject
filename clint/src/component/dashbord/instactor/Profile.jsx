import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className=" mx-auto">
                <div className="bg-white  rounded-3xl overflow-hidden">
                    {/* Header Section with Gradient */}
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 h-32 sm:h-40 relative">
                        <div className="absolute inset-0 bg-black opacity-10"></div>
                    </div>

                    {/* Profile Image */}
                    <div className="relative px-4 sm:px-8">
                        <div className="flex justify-center -mt-16 sm:-mt-20">
                            <div className="relative">
                                <img
                                    src={user.image}
                                    alt={`${user.fullname}'s profile`}
                                    className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full border-4 sm:border-6 border-white shadow-2xl object-cover"
                                />
                                <div className="absolute inset-0 rounded-full ring-4 ring-purple-200 ring-opacity-50"></div>
                            </div>
                        </div>

                        {/* Name and Email */}
                        <div className="text-center mt-4 sm:mt-6 mb-8">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                                {user.fullname}
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600">{user.email}</p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-4 sm:px-8 pb-8 sm:pb-12 space-y-6 sm:space-y-8">
                        {/* About Me */}
                        {user.aboutUs && (
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 border border-blue-100">
                                <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 flex items-center">
                                    <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
                                    About Me
                                </h3>
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                    {user.aboutUs || 'No information provided.'}
                                </p>
                            </div>
                        )}

                        {/* Skills */}
                        {user.skills && (
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 border border-purple-100">
                                <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-3 flex items-center">
                                    <span className="w-1.5 h-6 bg-purple-600 rounded-full mr-3"></span>
                                    Skills
                                </h3>
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                    {user.skills || 'No skills listed.'}
                                </p>
                            </div>
                        )}

                        {/* Social Links */}
                        {(user.githubLink || user.linkedInLink) && (
                            <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-200">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <span className="w-1.5 h-6 bg-gray-600 rounded-full mr-3"></span>
                                    Connect With Me
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {user.githubLink && (
                                        <a
                                            href={user.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-3 p-3 sm:p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 group"
                                        >
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs sm:text-sm font-medium text-gray-500">GitHub</p>
                                                <p className="text-sm sm:text-base text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                                                    {user.githubLink.replace(/^https?:\/\//, '')}
                                                </p>
                                            </div>
                                        </a>
                                    )}

                                    {user.linkedInLink && (
                                        <a
                                            href={user.linkedInLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-3 p-3 sm:p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200 group"
                                        >
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-700 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs sm:text-sm font-medium text-gray-500">LinkedIn</p>
                                                <p className="text-sm sm:text-base text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                                                    {user.linkedInLink.replace(/^https?:\/\//, '')}
                                                </p>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Work Experience */}
                        {user.workExperience && user.workExperience.length > 0 && (
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 sm:p-6 border border-emerald-100">
                                <h3 className="text-lg sm:text-xl font-semibold text-emerald-800 mb-4 sm:mb-6 flex items-center">
                                    <span className="w-1.5 h-6 bg-emerald-600 rounded-full mr-3"></span>
                                    Work Experience
                                </h3>
                                <div className="space-y-4 sm:space-y-6">
                                    {user.workExperience.map((work, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-emerald-100"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                                                <div className="mb-2 sm:mb-0">
                                                    <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                                                        {work.position}
                                                    </h4>
                                                    <p className="text-sm sm:text-base text-emerald-600 font-medium">
                                                        {work.company}
                                                    </p>
                                                </div>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-emerald-100 text-emerald-800 w-fit">
                                                    {new Date(work.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {work.endDate ? new Date(work.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                                                </span>
                                            </div>
                                            {work.description && (
                                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                                    {work.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education Experience */}
                        {user.educationExperience && user.educationExperience.length > 0 && (
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-6 border border-amber-100">
                                <h3 className="text-lg sm:text-xl font-semibold text-amber-800 mb-4 sm:mb-6 flex items-center">
                                    <span className="w-1.5 h-6 bg-amber-600 rounded-full mr-3"></span>
                                    Education
                                </h3>
                                <div className="space-y-4 sm:space-y-6">
                                    {user.educationExperience.map((education, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-amber-100"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                                                <div className="mb-2 sm:mb-0">
                                                    <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                                                        {education.degree}
                                                    </h4>
                                                    <p className="text-sm sm:text-base text-amber-600 font-medium">
                                                        {education.institution}
                                                    </p>
                                                </div>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-amber-100 text-amber-800 w-fit">
                                                    {new Date(education.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {education.endDate ? new Date(education.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                                                </span>
                                            </div>
                                            {education.description && (
                                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                                    {education.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;