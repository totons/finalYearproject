import { useContext, useState } from 'react';
import { GiSightDisabled } from "react-icons/gi";
import { BiSolidShow } from "react-icons/bi";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
// import axios from 'axios';
// import { getBaseUrl } from '../../utils/baseUrl';

const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null); // State for storing image file
    const navigate = useNavigate();

    const { createUser,logOut}=useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const role = e.target.role.value;
        const image = e.target.image.files[0]; // Assuming you have an input for the image file
    
        const formData = new FormData(); // Using FormData to handle file uploads
        formData.append("fullname", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("image", image); // Append image
        console.log()
    
        try {
            setLoading(true);
    
            // Replace this with your API call to register the user
           await createUser(formData);
    
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Registered successfully!",
                showConfirmButton: false,
                timer: 900,
            });
    
            e.target.reset();
            setImage(null); // Reset image selection

            await logOut()
    
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
        <div className="hero mt-9 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Sign Up!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">

                    <div className="form-control ">
    <label className="label">
        <span className="label-text">Photo</span>
    </label>
    <div className="relative flex justify-center ">
    <input
                        type="file"
                        id="image"
                        
                        className="border border-gray-300 rounded p-2 w-full"
                        accept="image/*"
                        required
                        onChange={(e) => setImage(e.target.files[0])}
                    />
        
    </div>
</div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <select
                                name="role"
                                className="select select-bordered"
                                defaultValue="student"
                            >
                                <option value="student">Student</option>
                                <option value="instruct">Instructor</option>
                                {/* <option value="admin">Admin</option> */}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="Password"
                                    name="password"
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

                        <div className="form-control mt-6">
                            <button className="btn btn-primary" disabled={loading}>
                                {loading ? "Signing Up..." : "Sign Up"}
                            </button>
                        </div>
                    </form>
                    <p className="text-center mb-7">
                        Already have an account? <Link className="text-gray-900" to="/login">Login!</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;

