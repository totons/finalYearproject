import React, { useEffect, useState } from 'react';
import SectionHeading from '../../shared/SectionHeading';
import InstructorInfo from '../InstructorInfo';
import { getBaseUrl } from '../../../utils/baseUrl';
import { Loader, Users, Search } from 'lucide-react';

const InstructorPage = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredInstructors, setFilteredInstructors] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(`${getBaseUrl()}/user/ins/`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch instructors');
                return res.json();
            })
            .then(data => {
                setInstructors(data.instructors);
                setFilteredInstructors(data.instructors);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching instructors:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Search functionality
    useEffect(() => {
        const filtered = instructors.filter(instructor =>
            (instructor.fullname?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (instructor.expertise?.toLowerCase() || '').includes(searchTerm.toLowerCase())
        );
        setFilteredInstructors(filtered);
    }, [searchTerm, instructors]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="relative inline-block">
                        <Loader className="w-16 h-16 text-indigo-600 animate-spin" />
                        <div className="absolute inset-0 bg-indigo-600/10 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-lg font-semibold text-gray-700">Loading Instructors...</p>
                    <p className="text-sm text-gray-500">Please wait while we fetch all our amazing instructors</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
                <div className="text-center space-y-4 bg-red-50 rounded-2xl p-8 border-2 border-red-200">
                    <p className="text-lg font-semibold text-red-600">Error Loading Instructors</p>
                    <p className="text-sm text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                {/* Section Heading */}
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Users className="w-8 h-8 text-indigo-600" />
                        <span className="text-sm font-semibold text-indigo-600 tracking-widest uppercase">
                            Our Team
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                        Meet Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Instructors</span>
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Our team of experienced professionals is dedicated to providing you with the highest quality education and support throughout your learning journey.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-12 sm:mb-16 md:mb-20">
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search instructors by name or expertise..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Counter */}
                <div className="mb-6 sm:mb-8 flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm">
                    <p className="text-sm sm:text-base text-gray-600">
                        Showing <span className="font-bold text-indigo-600">{filteredInstructors.length}</span> instructor{filteredInstructors.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Instructors Grid */}
                {filteredInstructors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
                        {filteredInstructors.map((instructor, index) => (
                            <div
                                key={instructor._id}
                                className="animate-fade-in"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: `fadeInUp 0.6s ease-out forwards`
                                }}
                            >
                                <div className="h-full transform transition-all duration-300 hover:scale-101 hover:-translate-y-2">
                                    <InstructorInfo instructor={instructor} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 sm:py-20">
                        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                            No Instructors Found
                        </p>
                        <p className="text-gray-500">
                            Try adjusting your search terms
                        </p>
                    </div>
                )}

                {/* Statistics Section */}
                {filteredInstructors.length > 0 && (
                    <div className="mt-16 sm:mt-20 md:mt-24">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 sm:p-10 md:p-12 text-white">
                            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Why Learn With Our Instructors?</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                                <div className="text-center">
                                    <div className="text-4xl sm:text-5xl font-bold mb-2">{instructors.length}+</div>
                                    <p className="text-indigo-100">Expert Instructors</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl sm:text-5xl font-bold mb-2">✓</div>
                                    <p className="text-indigo-100">Industry Experienced</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl sm:text-5xl font-bold mb-2">24/7</div>
                                    <p className="text-indigo-100">Support Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Background Animations */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default InstructorPage;