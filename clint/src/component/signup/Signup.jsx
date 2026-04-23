import { useContext, useState } from 'react';
import { GiSightDisabled } from "react-icons/gi";
import { BiSolidShow } from "react-icons/bi";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const { createUser, logOut } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const role = e.target.role.value;
        const image = e.target.image.files[0];
    
        const formData = new FormData();
        formData.append("fullname", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("image", image);
    
        try {
            setLoading(true);
            await createUser(formData);
    
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Registered successfully!",
                showConfirmButton: false,
                timer: 900,
            });
    
            e.target.reset();
            setImage(null);
            await logOut();
    
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Registration failed. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="w-full max-w-[95%] sm:max-w-2xl">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                        Create Account
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">Sign up to get started</p>
                </div>

                {/* Signup Card */}
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        {/* Photo Upload */}
                        <div className="form-control">
                            <label className="label pb-1 sm:pb-2">
                                <span className="label-text font-medium text-gray-700 text-sm sm:text-base">
                                    Profile Photo
                                </span>
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="file-input file-input-bordered border-gray-300 focus:border-blue-500 w-full h-10 sm:h-11 md:h-12 text-xs sm:text-sm"
                                accept="image/*"
                                required
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            {image && (
                                <p className="text-xs sm:text-sm text-green-600 mt-1 sm:mt-2">
                                    ✓ {image.name}
                                </p>
                            )}
                        </div>

                        {/* Full Name */}
                        <div className="form-control">
                            <label className="label pb-1 sm:pb-2">
                                <span className="label-text font-medium text-gray-700 text-sm sm:text-base">
                                    Full Name
                                </span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                className="input input-bordered w-full border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-10 sm:h-11 md:h-12 text-sm sm:text-base px-3 sm:px-4"
                                required
                            />
                        </div>

                        {/* Email */}
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
                            </select>
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label pb-1 sm:pb-2">
                                <span className="label-text font-medium text-gray-700 text-sm sm:text-base">
                                    Password
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="Create a strong password"
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
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-5 sm:mt-6">
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
                                        <span className="text-xs sm:text-sm md:text-base">Signing Up...</span>
                                    </span>
                                ) : (
                                    <span className="text-sm sm:text-base">Sign Up</span>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-5 sm:mt-6">
                        <p className="text-xs sm:text-sm md:text-base text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
                            >
                                Login!
                            </Link>
                        </p>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default Signup;