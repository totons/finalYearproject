import { useState } from 'react';
import cse from "../../../../public/cse.jpeg"
const Banner = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    // Sample banner image URL - replace with your actual image
    

    return (
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 sm:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Text Content */}
                    <div className="order-2 lg:order-1 space-y-6">
                        <div className="space-y-4 animate-fade-in">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                                Welcome to
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Online Learning
                                </span>
                            </h1>
                            
                            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                        </div>

                        <p className="text-lg sm:text-xl text-slate-700 leading-relaxed animate-slide-up">
                            Learning to Learn Online helps you prepare for online learning success by introducing you to the online learning environment and your role as a learner within it.
                        </p>

                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed animate-slide-up-delay">
                            As you come to understand yourself as a self-directed learner, you will also be introduced to effective learning strategies: time management for online learners, information management, professional communication, and reading strategies.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up-delay-2">
                            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                Get Started
                            </button>
                            <button className="px-8 py-4 bg-white text-slate-800 font-semibold rounded-xl border-2 border-slate-300 hover:border-blue-600 hover:text-blue-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                                Learn More
                            </button>
                        </div>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 pt-6">
                            {['Self-Paced', 'Expert Teachers', 'Flexible Schedule', 'Quality Content'].map((feature, idx) => (
                                <span 
                                    key={idx}
                                    className="px-4 py-2 bg-white text-slate-700 rounded-full text-sm font-medium shadow-sm border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300"
                                    style={{animation: `fadeIn 0.6s ease-out ${0.3 + idx * 0.1}s backwards`}}
                                >
                                    ✓ {feature}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Image Content */}
                    <div className="order-1 lg:order-2 relative animate-float">
                        <div className="relative group">
                            {/* Decorative Elements */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
                            
                            {/* Image Container */}
                            <div className="relative bg-white p-3 rounded-3xl shadow-2xl overflow-hidden">
                                {!imageLoaded && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse"></div>
                                )}
                                <img 
                                    src={cse}
                                    alt="Online Learning Environment" 
                                    className={`w-full h-auto rounded-2xl object-cover transition-all duration-700 ${
                                        imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                    }`}
                                    onLoad={() => setImageLoaded(true)}
                                />
                                
                                {/* Overlay Badge */}
                                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                                    <p className="text-sm font-semibold text-slate-700">🎓 Start Learning Today</p>
                                </div>
                            </div>

                            {/* Floating Cards */}
                            {/* <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-xl hidden sm:block animate-float-delay">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                                        ✓
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Success Rate</p>
                                        <p className="text-lg font-bold text-slate-800">95%</p>
                                    </div>
                                </div>
                            </div> */}

                            {/* <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-xl hidden sm:block animate-float-delay-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                                        👥
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Students</p>
                                        <p className="text-lg font-bold text-slate-800">10K+</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out;
                }

                .animate-slide-up {
                    animation: fadeIn 0.8s ease-out 0.2s backwards;
                }

                .animate-slide-up-delay {
                    animation: fadeIn 0.8s ease-out 0.4s backwards;
                }

                .animate-slide-up-delay-2 {
                    animation: fadeIn 0.8s ease-out 0.6s backwards;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-float-delay {
                    animation: float 6s ease-in-out 1s infinite;
                }

                .animate-float-delay-2 {
                    animation: float 6s ease-in-out 2s infinite;
                }
            `}</style>
        </div>
    );
};

export default Banner;