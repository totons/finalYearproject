import React, { useEffect, useState } from 'react';
import SectionHeading from '../shared/SectionHeading';
import ClassInfo from '../home/homeComponent/ClassInfo';
import { getBaseUrl } from '../../utils/baseUrl';
import { Loader, BookOpen, Search, Filter } from 'lucide-react';
import Loading from '../shared/Loading';

const ClassPage = () => {
    const [classes, setClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        setLoading(true);
        fetch(`${getBaseUrl()}/course/`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch classes');
                return res.json();
            })
            .then(data => {
                setClasses(data);
                setFilteredClasses(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching classes:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Search and filter functionality
    useEffect(() => {
        let filtered = classes.filter(cls =>
            (cls.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (cls.instructor?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (cls.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
        );

        // Sort
        if (sortBy === 'newest') {
            filtered = filtered.reverse();
        } else if (sortBy === 'popular') {
            filtered = filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
        } else if (sortBy === 'price-low') {
            filtered = filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (sortBy === 'price-high') {
            filtered = filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        }

        setFilteredClasses(filtered);
    }, [searchTerm, sortBy, classes]);

    if (loading) {
        return (
           <>
            <Loading/>
           </>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
                <div className="text-center space-y-4 bg-red-50 rounded-2xl p-8 border-2 border-red-200">
                    <p className="text-lg font-semibold text-red-600">Error Loading Classes</p>
                    <p className="text-sm text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                {/* Section Heading */}
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <BookOpen className="w-8 h-8 text-indigo-600" />
                        <span className="text-sm font-semibold text-indigo-600 tracking-widest uppercase">
                            Our Courses
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                        Explore Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Courses</span>
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Choose from hundreds of carefully curated courses designed to help you achieve your learning goals and advance your career.
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-10 sm:mb-14 md:mb-16 space-y-4 sm:space-y-0 sm:flex sm:gap-4 sm:items-end">
                    {/* Search Bar */}
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Search Courses</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, instructor, or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                            />
                        </div>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="sm:w-48">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md appearance-none bg-white cursor-pointer"
                            >
                                <option value="newest">Newest First</option>
                                <option value="popular">Most Popular</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Counter */}
                <div className="mb-6 sm:mb-8 flex items-center justify-between px-4 py-3 sm:py-4 bg-white rounded-lg shadow-sm border-l-4 border-indigo-600">
                    <p className="text-sm sm:text-base text-gray-700">
                        Found <span className="font-bold text-indigo-600">{filteredClasses.length}</span> class{filteredClasses.length !== 1 ? 'es' : ''}
                    </p>
                </div>

                {/* Classes Grid */}
                {filteredClasses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
                        {filteredClasses.map((oneCls, index) => (
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
                ) : (
                    <div className="text-center py-16 sm:py-20">
                        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                            No Classes Found
                        </p>
                        <p className="text-gray-500">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}

                {/* Stats Section */}
                {filteredClasses.length > 0 && (
                    <div className="mt-16 sm:mt-20 md:mt-24">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 sm:p-10 md:p-12 text-white">
                            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Why Choose Our Courses?</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                                <div className="text-center">
                                    <div className="text-4xl sm:text-5xl font-bold mb-2">{classes.length}+</div>
                                    <p className="text-indigo-100">Quality Courses</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl sm:text-5xl font-bold mb-2">💡</div>
                                    <p className="text-indigo-100">Expert Instructors</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl sm:text-5xl font-bold mb-2">🎓</div>
                                    <p className="text-indigo-100">Certification</p>
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

export default ClassPage;