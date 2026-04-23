import React, { useContext, useState } from 'react';
import { GiSightDisabled } from "react-icons/gi";
import { BiSolidShow } from "react-icons/bi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {
    const location = useLocation();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { logIn } = useContext(AuthContext);
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const role = e.target.role.value;

        console.log({ email, password, role });

        try {
            setLoading(true);
            await logIn(email, password, role);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Login successfully",
                showConfirmButton: false,
                timer: 1300,
            });
            e.target.reset();
            
            setTimeout(() => {
                navigate(from, { replace: true });
                window.location.reload();
            }, 1000);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Login Failed",
            });
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
       
        <div className=" flex items-center justify-center  py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="w-full max-w-[95%] sm:max-w-2xl">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">Sign in to continue</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                        {/* Email Input */}
                        <div className="form-control">
                            <label className="label pb-1 sm:pb-2">
                                <span className="label-text font-medium text-gray-700 text-sm sm:text-base">
                                    Email Address
                                </span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your.email@example.com"
                                className="input input-bordered w-full border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-10 sm:h-11 md:h-12 text-sm sm:text-base px-3 sm:px-4"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="form-control">
                            <label className="label pb-1 sm:pb-2">
                                <span className="label-text font-medium text-gray-700 text-sm sm:text-base">
                                    Password
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    name="password"
                                    className="input input-bordered w-full border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 pr-10 sm:pr-12 h-10 sm:h-11 md:h-12 text-sm sm:text-base px-3 sm:px-4"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 px-2 sm:px-3 md:px-4 flex items-center text-gray-500 hover:text-gray-700"
                                    onClick={togglePasswordVisibility}
                                >
                                    {passwordVisible ? (
                                        <BiSolidShow className="text-lg sm:text-xl" />
                                    ) : (
                                        <GiSightDisabled className="text-lg sm:text-xl" />
                                    )}
                                </button>
                            </div>
                            <label className="label pt-1 sm:pt-2">
                                <Link to="/forgot-password" className="label-text-alt text-xs sm:text-sm text-blue-600 hover:text-blue-700 hover:underline">
                                    Forgot password?
                                </Link>
                            </label>
                        </div>

                        {/* Role Selection */}
                        <div className="form-control">
                            <label className="label pb-1 sm:pb-2">
                                <span className="label-text font-medium text-gray-700 text-sm sm:text-base">
                                    Select Role
                                </span>
                            </label>
                            <select
                                name="role"
                                className="select select-bordered w-full border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-10 sm:h-11 md:h-12 text-sm sm:text-base px-3 sm:px-4"
                                defaultValue="student"
                            >
                                <option value="student">🎓 Student</option>
                                <option value="instruct">👨‍🏫 Teacher</option>
                                <option value="admin">⚙️ Admin</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-5 sm:mt-6 md:mt-8">
                            <button
                                type="submit"
                                className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 border-none text-white disabled:opacity-50 h-10 sm:h-11 md:h-12 text-sm sm:text-base"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="text-xs sm:text-sm md:text-base">Logging in...</span>
                                    </span>
                                ) : (
                                    <span className="text-sm sm:text-base">Sign In</span>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="divider text-gray-400 my-4 sm:my-5 md:my-6 text-xs sm:text-sm">OR</div>

                    {/* Social Login */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                        <button className="btn btn-outline border-gray-300 hover:bg-gray-50 h-10 sm:h-11 md:h-12 min-h-0 px-2 sm:px-3">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24">
                                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </button>
                        <button className="btn btn-outline border-gray-300 hover:bg-gray-50 h-10 sm:h-11 md:h-12 min-h-0 px-2 sm:px-3">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                        </button>
                        <button className="btn btn-outline border-gray-300 hover:bg-gray-50 h-10 sm:h-11 md:h-12 min-h-0 px-2 sm:px-3">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center mt-5 sm:mt-6">
                        <p className="text-xs sm:text-sm md:text-base text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer Text */}
               
            </div>
        </div>
    );
};

export default Login;