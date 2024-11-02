import { NavLink, Outlet } from "react-router-dom";
import { FaHistory, FaHome, FaSchool, FaUser } from 'react-icons/fa';
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const DashBord = () => {
    const { user } = useContext(AuthContext);
    
    return (
        <div className="drawer lg:drawer-open drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* <div className="flex flex-col items-center justify-center mt-28">
                    <h2 className="uppercase text-4xl mb-7 text-gray-800">Hello, {user?.fullname}! Welcome to</h2>
                    <div className="flex md:flex-row gap-5 items-center">
                        <p className="font-bold text-5xl text-black">Online <span className="font-bold text-orange-500">Learning Academy</span></p>
                    </div>
                </div> */}
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mt-4">Open Menu</label>
            </div> 
            <div className="drawer-side bg-[#D1A054] shadow-lg">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 h-full text-base-content">
                    {
                       user.role === "admin" ? (
                            <>
                                <li className="text-xl font-semibold hover:bg-orange-300 transition duration-200 rounded">
                                    <NavLink to="/dashboard/panging">
                                        <FaSchool /> Panding Classes
                                    </NavLink>
                                </li>
                                <li className="text-xl font-semibold hover:bg-orange-300 transition duration-200 rounded">
                                    <NavLink to="/dashboard/course">
                                        <FaUser /> All Course
                                    </NavLink>
                                </li>
                            </>
                        ) : user.role === "instruct" ? (
                            <>
                            <li className="text-xl font-semibold hover:bg-orange-300 transition duration-200 rounded">
                                    <NavLink to="/dashboard/UpdateProfile">
                                        <FaSchool /> Update Profile
                                    </NavLink>
                                </li>

<li className="text-xl font-semibold hover:bg-orange-300 transition duration-200 rounded">
                                    <NavLink to="/dashboard/profile">
                                        <FaSchool /> Profile
                                    </NavLink>
                                </li>
                                
                                <li className="text-xl font-semibold hover:bg-orange-300 transition duration-200 rounded">
                                    <NavLink to="/dashboard/addcourse">
                                        <FaSchool /> Add A Class
                                    </NavLink>
                                </li>
                                <li className="text-xl font-semibold hover:bg-orange-300 transition duration-200 rounded">
                                    <NavLink to="/dashboard/myClass">
                                        <FaUser /> All Class
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="text-xl font-semibold hover:bg-orange-300 transition duration-200 rounded">
                                    <NavLink to="/dashboard/selectClass">
                                        <FaUser /> My Selected Class
                                    </NavLink>
                                </li>
                                <li className="text-xl font-semibold hover:bg-orange-300 transition duration-200 rounded">
                                    <NavLink to="/dashboard/enrollClass">
                                        <FaSchool /> Enrolled Class
                                    </NavLink>
                                </li>
                                <li className="text-xl font-semibold hover:bg-orange-300 transition duration-200 rounded">
                                    <NavLink to="/dashboard/paymentHistory">
                                        <FaHistory /> Payment History
                                    </NavLink>
                                </li>
                            </>
                        )
                    }
                    <div className="divider my-4"></div>
                    <li className="text-xl font-semibold hover:bg-orange-300 transition duration-200 rounded">
                        <NavLink to="/">
                            <FaHome /> Home
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashBord;
