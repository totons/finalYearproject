import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    // Sample images - replace with your actual imports
    const facilities = [
        {
            id: 1,
            title: "Cricket Academy",
            description: "Professional cricket training facilities",
            image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop",
            icon: "🏏"
        },
        {
            id: 2,
            title: "Football Ground",
            description: "State-of-the-art football training ground",
            image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=600&fit=crop",
            icon: "⚽"
        },
        {
            id: 3,
            title: "Badminton Court",
            description: "Indoor badminton courts with premium facilities",
            image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=600&fit=crop",
            icon: "🏸"
        },
        {
            id: 4,
            title: "Chess Club",
            description: "Strategic thinking and chess training center",
            image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&h=600&fit=crop",
            icon: "♟️"
        },
        {
            id: 5,
            title: "Volleyball Arena",
            description: "Modern volleyball courts for all skill levels",
            image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=600&fit=crop",
            icon: "🏐"
        },
        {
            id: 6,
            title: "Handball Court",
            description: "Professional handball training facilities",
            image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=600&fit=crop",
            icon: "🤾"
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        beforeChange: (current, next) => setActiveSlide(next),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
        appendDots: dots => (
            <div style={{ bottom: "-50px" }}>
                <ul className="flex justify-center gap-2"> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <button className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === activeSlide % facilities.length 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
            }`} />
        )
    };

    return (
        <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <div className="inline-block mb-4">
                        <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider px-4 py-2 bg-blue-50 rounded-full">
                            What We Offer
                        </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-4">
                        Our Premium
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            Facilities
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Explore our world-class training facilities designed for excellence
                    </p>
                </div>

                {/* Slider */}
                <div className="slider-container pb-16">
                    <Slider {...settings}>
                        {facilities.map((facility, index) => (
                            <div key={facility.id} className="px-3">
                                <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                    {/* Image Container */}
                                    <div className="relative h-72 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                                        <img 
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                                            src={facility.image}
                                            alt={facility.title}
                                        />
                                        
                                        {/* Icon Badge */}
                                        <div className="absolute top-4 right-4 z-20 w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                                            {facility.icon}
                                        </div>

                                        {/* Overlay Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                {facility.title}
                                            </h3>
                                            <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {facility.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom Section */}
                                    <div className="p-6 bg-gradient-to-br from-slate-50 to-white">
                                        <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                                            Learn More
                                        </button>
                                    </div>

                                    {/* Decorative Corner */}
                                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-br-full"></div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Stats Section */}
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                    {[
                        { number: "6+", label: "Facilities" },
                        { number: "500+", label: "Students" },
                        { number: "50+", label: "Trainers" },
                        { number: "15+", label: "Years" }
                    ].map((stat, idx) => (
                        <div 
                            key={idx}
                            className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                                {stat.number}
                            </p>
                            <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div> */}
            </div>

            <style>{`
                @keyframes fadeIn {
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
                    animation: fadeIn 1s ease-out;
                }

                .slick-track {
                    display: flex !important;
                    gap: 0;
                }

                .slick-slide {
                    height: inherit !important;
                }

                .slick-slide > div {
                    height: 100%;
                }

                .slick-dots li button:before {
                    display: none;
                }

                .slick-prev, .slick-next {
                    width: 50px;
                    height: 50px;
                    z-index: 10;
                }

                .slick-prev {
                    left: -60px;
                }

                .slick-next {
                    right: -60px;
                }

                .slick-prev:before, .slick-next:before {
                    font-size: 50px;
                    color: #3b82f6;
                }

                @media (max-width: 1024px) {
                    .slick-prev {
                        left: -40px;
                    }
                    .slick-next {
                        right: -40px;
                    }
                }

                @media (max-width: 640px) {
                    .slick-prev {
                        left: 10px;
                    }
                    .slick-next {
                        right: 10px;
                    }
                }
            `}</style>
        </div>
    );
};

export default HomeSlider;