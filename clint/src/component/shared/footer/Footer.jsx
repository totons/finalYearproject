import React from 'react';
import { FaGoogle, FaGithub, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        { Icon: FaFacebook, href: '#', label: 'Facebook', color: 'hover:text-blue-500' },
        { Icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
        { Icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:text-sky-400' },
        { Icon: FaGoogle, href: '#', label: 'Google', color: 'hover:text-red-500' },
        { Icon: FaGithub, href: '#', label: 'Github', color: 'hover:text-gray-400' }
    ];

    const footerLinks = [
        { text: 'Advertising', href: '#' },
        { text: 'Terms and Condition', href: '#' },
        { text: 'Privacy Policy', href: '#' },
        { text: 'Contact Us', href: '#' }
    ];

    return (
        <footer className="bg-gradient-to-b from-gray-900 via-black to-gray-900 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Decorative Line */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

                {/* Main Content */}
                <div className="py-12 sm:py-16">
                    {/* Logo & Title Section */}
                    <div className="flex items-center justify-center mb-10 sm:mb-12">
                        <div className="text-center">
                            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-2 leading-tight">
                                Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Learning     & </span>
                            </h2>
                            <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                            ASSIGNMENT SUBMISSION SYSTEM
                            </h3>
                            <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                        </div>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-12">
                        {socialLinks.map(({ Icon, href, label, color }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className={`group relative p-3 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-orange-500/50 ${color}`}
                            >
                                <Icon className="text-xl sm:text-2xl text-white transition-colors duration-300" />
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    {label}
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* Navigation Links */}
                    <nav className="mb-8 sm:mb-10">
                        <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 px-4">
                            {footerLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-sm sm:text-base text-gray-400 hover:text-orange-500 transition-all duration-300 relative group"
                                    >
                                        {link.text}
                                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

                    {/* Bottom Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-gray-400 text-xs sm:text-sm px-4">
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                            <p className="flex items-center gap-2">
                                <span className="text-orange-500">©</span> 
                                <span>2025 All Rights Reserved</span>
                            </p>
                            <span className="hidden sm:inline text-white/20">|</span>
                            <p className="hover:text-orange-500 transition-colors duration-300">
                                Hosted by <span className="font-semibold text-white">Oveshek 200154</span>
                            </p>
                        </div>
                        <div className="text-center sm:text-right">
                            <p className="hover:text-orange-500 transition-colors duration-300">
                                Developed with <span className="text-red-500 animate-pulse">♥</span> by <span className="font-semibold text-white">Oveshek Kundu</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-500/5 to-transparent pointer-events-none"></div>
            
            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }

                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </footer>
    );
};

export default Footer;