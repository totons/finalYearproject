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

    const {logIn} =useContext(AuthContext)
    // Get the 'from' location or set it to home if undefined
const from=location.state?.from?.pathname || "/"
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const role = e.target.role.value; // Get the selected role

        console.log({ email, password, role }); // Log the role along with email and password

        try {
            setLoading(true);
            await logIn(email, password, role); // Pass role to the login function
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Login successfully",
                showConfirmButton: false,
                timer: 1300,
            });
            e.target.reset();
            
            // Delay navigation to ensure SweetAlert finishes
            setTimeout(() => {
               // Navigate to login page after refresh
               navigate(from,{replace:true})
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
        <>
            <div className="hero my-3 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        placeholder="password"
                                        name='password'
                                        className="input input-bordered w-full"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-3 flex items-center text-sm"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? <BiSolidShow /> : <GiSightDisabled />}
                                    </button>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Role</span>
                                </label>
                                <select
                                    name="role"
                                    className="select select-bordered"
                                    defaultValue="student" // Default role
                                >
                                    <option value="student">Student</option>
                                    <option value="instruct">Instructor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </form>
                        <p className='text-center mb-7'>Don't have an account? <Link className='text-gray-900' to="/signup">Register</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
