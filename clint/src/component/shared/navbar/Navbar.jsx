import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { useContext, useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/instructor", label: "Instructor" },
        { to: "/class", label: "Courses" },
        { to: "/dashboard", label: "Dashboard" }
    ];

    return (
        <nav className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg transform group-hover:scale-110 transition-transform duration-300">
                            <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-white text-2xl font-bold uppercase tracking-wide">
                                Online Learning 
                            </p>
                            <p className="text-yellow-400 text-sm uppercase tracking-widest">
                                & ASSIGNMENT SUBMISSION SYSTEM
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-slate-600 hover:text-yellow-400 transition-all duration-300 transform hover:scale-105"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {user ? (
                            <button
                                onClick={async () => await logOut()}
                                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-lg font-semibold uppercase tracking-wide hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link to="/login">
                                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-6 py-2.5 rounded-lg font-semibold uppercase tracking-wide hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                    Log In
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden text-white p-2 rounded-lg hover:bg-slate-600 transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-4 pt-2 pb-4 space-y-2 bg-slate-800 border-t border-slate-700">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className="block text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-slate-700 hover:text-yellow-400 transition-all duration-300"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-2">
                        {user ? (
                            <button
                                onClick={async () => {
                                    await logOut();
                                    setIsOpen(false);
                                }}
                                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold uppercase tracking-wide hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-6 py-3 rounded-lg font-semibold uppercase tracking-wide hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-lg">
                                    Log In
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;