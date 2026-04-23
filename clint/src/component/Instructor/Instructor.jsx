import { useEffect, useState } from "react";
import InstructorInfo from "./InstructorInfo";
import { Link } from "react-router-dom";
import { getBaseUrl } from "../../utils/baseUrl";
import { Loader, Users, ArrowRight } from "lucide-react";

const Instructor = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`${getBaseUrl()}/user/ins/`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch instructors');
                return res.json();
            })
            .then(data => {
                setInstructors(data.instructors.slice(0, 6));
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching instructors:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-blue-50 via-white to-purple-50">
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative">
                        <Loader className="w-12 h-12 text-indigo-600 animate-spin" />
                        <div className="absolute inset-0 bg-indigo-600/10 rounded-full animate-pulse"></div>
                    </div>
                    <p className="mt-4 text-gray-600 font-medium">Loading incredible instructors...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-blue-50 via-white to-purple-50">
                <div className="text-center text-red-600 font-semibold">
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Users className="w-8 h-8 text-purple-600" />
                        <span className="text-sm font-semibold text-purple-600 tracking-widest uppercase">
                            Expert Team
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                        Meet Our <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Instructors</span>
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                        Learn from experienced professionals dedicated to your success
                    </p>
                </div>

                {/* Instructors Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 sm:mb-16">
                    {instructors.length > 0 ? (
                        instructors.map((instructor, index) => (
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
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-600 font-medium text-lg">No instructors available at the moment</p>
                        </div>
                    )}
                </div>

                {/* CTA Button */}
                {instructors.length > 0 && (
                    <div className="flex justify-center">
                        <Link to={'/instructor'} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                            <button className="relative px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap">
                                <span>View All Instructors</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Background Decorations */}
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

export default Instructor;