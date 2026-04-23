import { useEffect, useState } from "react";
import ClassInfo from "./ClassInfo";
import { getBaseUrl } from "../../../utils/baseUrl";
import { Link } from "react-router-dom";
import { Loader, ChevronRight, BookOpen } from "lucide-react";

const HomeClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${getBaseUrl()}/course/`)
            .then(res => res.json())
            .then(data => {
                setClasses(data.slice(0, 6));
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching classes:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-blue-50 to-indigo-50">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <BookOpen className="w-8 h-8 text-indigo-600" />
                        <span className="text-sm font-semibold text-indigo-600 tracking-widest uppercase">
                            Discover
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                        Popular <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Courses</span>
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                        Explore our most-loved courses and start your learning journey today
                    </p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                            <Loader className="w-12 h-12 text-indigo-600 animate-spin" />
                            <div className="absolute inset-0 bg-indigo-600/10 rounded-full animate-pulse"></div>
                        </div>
                        <p className="mt-4 text-gray-600 font-medium">Loading amazing courses...</p>
                    </div>
                ) : (
                    <>
                        {/* Classes Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 sm:mb-16">
                            {classes.map((oneCls, index) => (
                                <div
                                    key={oneCls._id}
                                    className="animate-fade-in"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        animation: `fadeInUp 0.6s ease-out forwards`
                                    }}
                                >
                                    <div className="h-full transform transition-all duration-300 hover:scale-101 hover:-translate-y-2">
                                        <ClassInfo oneCls={oneCls} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-center">
                            <Link to="/class" className="group relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                                <button className="relative px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap">
                                    <span>View All Courses</span>
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </Link>
                        </div>
                    </>
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

export default HomeClasses;