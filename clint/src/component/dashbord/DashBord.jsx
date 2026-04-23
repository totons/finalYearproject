// // import { NavLink, Outlet } from "react-router-dom";
// // import { FaHistory, FaHome, FaSchool, FaUser, FaBars } from 'react-icons/fa';
// // import { useContext } from "react";
// // import { AuthContext } from "../../provider/AuthProvider";
// // import Footer from "../shared/footer/Footer";
// // import Navbar from "../shared/navbar/Navbar";

// // const Dashboard = () => {
// //     const { user } = useContext(AuthContext);
    
// //     return (

// //         <>
// //         <Navbar/>

// //             <div className="drawer lg:drawer-open">
// //             <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
// //             {/* Main content area */}
// //             <div className="drawer-content flex flex-col bg-gray-50 min-h-screen">
// //                 {/* Mobile Header */}
// //                 <div className="lg:hidden bg-white shadow-sm sticky top-0 z-10">
// //                     <div className="flex items-center justify-between p-3 sm:p-4">
// //                         <label 
// //                             htmlFor="my-drawer-2" 
// //                             className="btn btn-ghost btn-sm sm:btn-md"
// //                         >
// //                             <FaBars className="text-lg sm:text-xl" />
// //                         </label>
// //                         <h2 className="text-base sm:text-lg font-semibold text-gray-800">Dashboard</h2>
// //                         <div className="w-8 sm:w-10"></div> {/* Spacer for alignment */}
// //                     </div>
// //                 </div>

// //                 {/* Content */}
// //                 <div className="">
// //                     {/* Welcome header - only shown on dashboard home */}
// //                     {window.location.pathname === "/dashboard" && (
// //                         <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
// //                             <div className="text-center">
// //                                 <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 mb-2 sm:mb-3">
// //                                     Hello, <span className="text-blue-600">{user?.fullname || 'User'}</span>!
// //                                 </h2>
// //                                 <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4">
// //                                     Welcome to
// //                                 </p>
// //                                 <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
// //                                     Online <span className="text-blue-600">Learning Academy</span>
// //                                 </h1>
// //                             </div>
// //                         </div>
// //                     )}
                    
// //                     {/* This is where child routes will render */}
// //                     <div className="w-full">
// //                         <Outlet />
// //                     </div>
// //                 </div>
// //             </div>
            
// //             {/* Sidebar */}
// //             <div className="drawer-side z-20">
// //                 <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
// //                 <div className="bg-white shadow-xl min-h-full w-64 sm:w-72 md:w-80">
// //                     {/* Sidebar Header */}
// //                     <div className="bg-blue-600 p-4 sm:p-5 md:p-6">
// //                         <h2 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h2>
// //                         <p className="text-xs sm:text-sm text-blue-100 mt-1">
// //                             {user?.role === "admin" ? "Admin Panel" : 
// //                              user?.role === "instruct" ? "Instructor Panel" : 
// //                              "Student Panel"}
// //                         </p>
// //                     </div>

// //                     {/* Navigation Menu */}
// //                     <ul className="menu p-3 sm:p-4 text-gray-700">
// //                         {user?.role === "admin" ? (
// //                             <>
// //                                 <li className="mb-1">
// //                                     <NavLink 
// //                                         to="/dashboard/panging" 
// //                                         className={({isActive}) => 
// //                                             `text-sm sm:text-base md:text-lg font-medium rounded-lg transition-all duration-200 ${
// //                                                 isActive 
// //                                                     ? "bg-blue-600 text-white hover:bg-blue-700" 
// //                                                     : "hover:bg-gray-100"
// //                                             }`
// //                                         }
// //                                     >
// //                                         <FaSchool className="text-base sm:text-lg" /> 
// //                                         <span>Pending Classes</span>
// //                                     </NavLink>
// //                                 </li>
// //                                 <li className="mb-1">
// //                                     <NavLink 
// //                                         to="/dashboard/course" 
// //                                         className={({isActive}) => 
// //                                             `text-sm sm:text-base md:text-lg font-medium rounded-lg transition-all duration-200 ${
// //                                                 isActive 
// //                                                     ? "bg-blue-600 text-white hover:bg-blue-700" 
// //                                                     : "hover:bg-gray-100"
// //                                             }`
// //                                         }
// //                                     >
// //                                         <FaUser className="text-base sm:text-lg" /> 
// //                                         <span>All Courses</span>
// //                                     </NavLink>
// //                                 </li>
// //                             </>
// //                         ) : user?.role === "instruct" ? (
// //                             <>
// //                                 <li className="mb-1">
// //                                     <NavLink 
// //                                         to="/dashboard/UpdateProfile" 
// //                                         className={({isActive}) => 
// //                                             `text-sm sm:text-base md:text-lg font-medium rounded-lg transition-all duration-200 ${
// //                                                 isActive 
// //                                                     ? "bg-blue-600 text-white hover:bg-blue-700" 
// //                                                     : "hover:bg-gray-100"
// //                                             }`
// //                                         }
// //                                     >
// //                                         <FaUser className="text-base sm:text-lg" /> 
// //                                         <span>Update Profile</span>
// //                                     </NavLink>
// //                                 </li>
// //                                 <li className="mb-1">
// //                                     <NavLink 
// //                                         to="/dashboard/profile" 
// //                                         className={({isActive}) => 
// //                                             `text-sm sm:text-base md:text-lg font-medium rounded-lg transition-all duration-200 ${
// //                                                 isActive 
// //                                                     ? "bg-blue-600 text-white hover:bg-blue-700" 
// //                                                     : "hover:bg-gray-100"
// //                                             }`
// //                                         }
// //                                     >
// //                                         <FaUser className="text-base sm:text-lg" /> 
// //                                         <span>Profile</span>
// //                                     </NavLink>
// //                                 </li>
// //                                 <li className="mb-1">
// //                                     <NavLink 
// //                                         to="/dashboard/addcourse" 
// //                                         className={({isActive}) => 
// //                                             `text-sm sm:text-base md:text-lg font-medium rounded-lg transition-all duration-200 ${
// //                                                 isActive 
// //                                                     ? "bg-blue-600 text-white hover:bg-blue-700" 
// //                                                     : "hover:bg-gray-100"
// //                                             }`
// //                                         }
// //                                     >
// //                                         <FaSchool className="text-base sm:text-lg" /> 
// //                                         <span>Add A Course</span>
// //                                     </NavLink>
// //                                 </li>
// //                                 <li className="mb-1">
// //                                     <NavLink 
// //                                         to="/dashboard/myClass" 
// //                                         className={({isActive}) => 
// //                                             `text-sm sm:text-base md:text-lg font-medium rounded-lg transition-all duration-200 ${
// //                                                 isActive 
// //                                                     ? "bg-blue-600 text-white hover:bg-blue-700" 
// //                                                     : "hover:bg-gray-100"
// //                                             }`
// //                                         }
// //                                     >
// //                                         <FaSchool className="text-base sm:text-lg" /> 
// //                                         <span>All Courses</span>
// //                                     </NavLink>
// //                                 </li>
// //                             </>
// //                         ) : (
// //                             <>
// //                                 {/* <li className="mb-1">
// //                                     <NavLink 
// //                                         to="/dashboard/selectClass" 
// //                                         className={({isActive}) => 
// //                                             `text-sm sm:text-base md:text-lg font-medium rounded-lg transition-all duration-200 ${
// //                                                 isActive 
// //                                                     ? "bg-blue-600 text-white hover:bg-blue-700" 
// //                                                     : "hover:bg-gray-100"
// //                                             }`
// //                                         }
// //                                     >
// //                                         <FaUser className="text-base sm:text-lg" /> 
// //                                         <span>My Selected Classes</span>
// //                                     </NavLink>
// //                                 </li> */}
// //                                 <li className="mb-1">
// //                                     <NavLink 
// //                                         to="/dashboard/enrollClass" 
// //                                         className={({isActive}) => 
// //                                             `text-sm sm:text-base md:text-lg font-medium rounded-lg transition-all duration-200 ${
// //                                                 isActive 
// //                                                     ? "bg-blue-600 text-white hover:bg-blue-700" 
// //                                                     : "hover:bg-gray-100"
// //                                             }`
// //                                         }
// //                                     >
// //                                         <FaSchool className="text-base sm:text-lg" /> 
// //                                         <span>Enrolled Classes</span>
// //                                     </NavLink>
// //                                 </li>
// //                                 {/* <li className="mb-1">
// //                                     <NavLink 
// //                                         to="/dashboard/paymentHistory" 
// //                                         className={({isActive}) => 
// //                                             `text-sm sm:text-base md:text-lg font-medium rounded-lg transition-all duration-200 ${
// //                                                 isActive 
// //                                                     ? "bg-blue-600 text-white hover:bg-blue-700" 
// //                                                     : "hover:bg-gray-100"
// //                                             }`
// //                                         }
// //                                     >
// //                                         <FaHistory className="text-base sm:text-lg" /> 
// //                                         <span>Payment History</span>
// //                                     </NavLink>
// //                                 </li> */}
// //                             </>
// //                         )}
                        
// //                         {/* Divider */}
// //                         <div className="divider my-2 sm:my-3"></div>
                        
// //                         {/* Home Link */}
// //                         <li>
// //                             <NavLink 
// //                                 to="/" 
// //                                 className={({isActive}) => 
// //                                     `text-sm sm:text-base md:text-lg font-medium rounded-lg transition-all duration-200 ${
// //                                         isActive 
// //                                             ? "bg-blue-600 text-white hover:bg-blue-700" 
// //                                             : "hover:bg-gray-100"
// //                                     }`
// //                                 }
// //                             >
// //                                 <FaHome className="text-base sm:text-lg" /> 
// //                                 <span>Home</span>
// //                             </NavLink>
// //                         </li>
// //                     </ul>

// //                     {/* User Info Footer */}
// //                     <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gray-50 border-t">
// //                         <div className="flex items-center gap-2 sm:gap-3">
// //                             <div className="avatar placeholder">
// //                                 <div className="bg-blue-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10">
// //                                     <span className="text-xs sm:text-sm">
// //                                         {user?.fullname?.charAt(0)?.toUpperCase() || 'U'}
// //                                     </span>
// //                                 </div>
// //                             </div>
// //                             <div className="flex-1 min-w-0">
// //                                 <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
// //                                     {user?.fullname || 'User'}
// //                                 </p>
// //                                 <p className="text-xs text-gray-500 capitalize">
// //                                     {user?.role || 'Student'}
// //                                 </p>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>

// //         <Footer/>

// //         </>
        
// //     );
// // };

// // export default Dashboard;





// import { NavLink, Outlet } from "react-router-dom";
// import { FaHistory, FaHome, FaSchool, FaUser, FaBars } from "react-icons/fa";
// import { useContext } from "react";
// import { AuthContext } from "../../provider/AuthProvider";
// import Footer from "../shared/footer/Footer";
// import Navbar from "../shared/navbar/Navbar";

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);

//   const navClass = ({ isActive }) =>
//     `group flex items-center gap-3 text-sm sm:text-base md:text-[15px] font-medium rounded-2xl px-4 py-3 transition-all duration-300 ${
//       isActive
//         ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200"
//         : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
//     }`;

//   const panelTitle =
//     user?.role === "admin"
//       ? "Admin Panel"
//       : user?.role === "instruct"
//       ? "Instructor Panel"
//       : "Student Panel";

//   return (
//     <>
//       <Navbar />

//       <div className="drawer lg:drawer-open bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//         <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

//         {/* Main content area */}
//         <div className="drawer-content flex flex-col min-h-screen">
//           {/* Mobile Header */}
//           <div className="lg:hidden sticky top-0 z-20 border-b border-white/40 bg-white/80 backdrop-blur-xl shadow-sm">
//             <div className="flex items-center justify-between px-4 py-3">
//               <label
//                 htmlFor="my-drawer-2"
//                 className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer"
//               >
//                 <FaBars className="text-lg" />
//               </label>

//               <h2 className="text-base font-semibold text-gray-800 tracking-wide">
//                 Dashboard
//               </h2>

//               <div className="w-10 h-10" />
//             </div>
//           </div>

//           {/* Content */}
//           <div className="flex-1 p-3 sm:p-5 md:p-6 lg:p-8">
//             {/* Welcome header - only shown on dashboard home */}
//             {window.location.pathname === "/dashboard" && (
//               <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(59,130,246,0.12)] p-5 sm:p-7 md:p-10 mb-5 sm:mb-6">
//                 <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl" />
//                 <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl" />

//                 <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
//                   <div>
//                     <p className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs sm:text-sm font-semibold mb-4">
//                       Welcome Back
//                     </p>

//                     <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
//                       Hello,{" "}
//                       <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                         {user?.fullname || "User"}
//                       </span>
//                     </h2>

//                     <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
//                       Welcome to your learning dashboard. Manage courses, track
//                       progress, and explore everything from one beautiful place.
//                     </p>

//                     <div className="mt-5 flex flex-wrap gap-3">
//                       <div className="rounded-2xl bg-white shadow-sm border border-gray-100 px-4 py-3 min-w-[140px]">
//                         <p className="text-xs text-gray-500 font-medium">
//                           Role
//                         </p>
//                         <p className="mt-1 text-sm sm:text-base font-semibold text-gray-900 capitalize">
//                           {user?.role || "student"}
//                         </p>
//                       </div>

//                       <div className="rounded-2xl bg-white shadow-sm border border-gray-100 px-4 py-3 min-w-[160px]">
//                         <p className="text-xs text-gray-500 font-medium">
//                           Platform
//                         </p>
//                         <p className="mt-1 text-sm sm:text-base font-semibold text-gray-900">
//                           Online Learning Academy
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="w-full lg:w-auto">
//                     <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl px-6 py-6 min-w-[250px]">
//                       <p className="text-sm text-blue-100 font-medium">
//                         Dashboard Overview
//                       </p>
//                       <h3 className="mt-2 text-2xl sm:text-3xl font-bold">
//                         {panelTitle}
//                       </h3>
//                       <p className="mt-2 text-sm text-blue-100 leading-relaxed">
//                         Access all your tools, content, and activities with a
//                         clean and focused experience.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Child route render */}
//             <div className="w-full">
//               <Outlet />
//             </div>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="drawer-side z-30">
//           <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

//           <div className="relative min-h-full w-72 sm:w-80 bg-white/95 backdrop-blur-xl border-r border-blue-100 shadow-[8px_0_30px_rgba(15,23,42,0.08)]">
//             {/* Sidebar Header */}
//             <div className="relative overflow-hidden px-5 sm:px-6 py-6 border-b border-blue-50 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
//               <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-cyan-300/20 rounded-full blur-2xl" />

//               <div className="relative z-10">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
//                   Dashboard
//                 </h2>
//                 <p className="text-sm text-blue-100 mt-1">{panelTitle}</p>
//               </div>
//             </div>

//             {/* Navigation Menu */}
//             <div className="flex flex-col justify-between min-h-[calc(100vh-104px)]">
//               <div className="p-4 sm:p-5">
//                 <ul className="space-y-2">
//                   {user?.role === "admin" ? (
//                     <>
//                       <li>
//                         <NavLink to="/dashboard/panging" className={navClass}>
//                           <FaSchool className="text-base" />
//                           <span>Pending Classes</span>
//                         </NavLink>
//                       </li>
//                       <li>
//                         <NavLink to="/dashboard/course" className={navClass}>
//                           <FaUser className="text-base" />
//                           <span>All Courses</span>
//                         </NavLink>
//                       </li>
//                     </>
//                   ) : user?.role === "instruct" ? (
//                     <>
//                       <li>
//                         <NavLink to="/dashboard/UpdateProfile" className={navClass}>
//                           <FaUser className="text-base" />
//                           <span>Update Profile</span>
//                         </NavLink>
//                       </li>
//                       <li>
//                         <NavLink to="/dashboard/profile" className={navClass}>
//                           <FaUser className="text-base" />
//                           <span>Profile</span>
//                         </NavLink>
//                       </li>
//                       <li>
//                         <NavLink to="/dashboard/addcourse" className={navClass}>
//                           <FaSchool className="text-base" />
//                           <span>Add A Course</span>
//                         </NavLink>
//                       </li>
//                       <li>
//                         <NavLink to="/dashboard/myClass" className={navClass}>
//                           <FaSchool className="text-base" />
//                           <span>All Courses</span>
//                         </NavLink>
//                       </li>
//                     </>
//                   ) : (
//                     <>
//                       <li>
//                         <NavLink to="/dashboard/enrollClass" className={navClass}>
//                           <FaSchool className="text-base" />
//                           <span>Enrolled Classes</span>
//                         </NavLink>
//                       </li>
//                     </>
//                   )}

//                   {/* Divider */}
//                   <div className="my-4 border-t border-gray-200" />

//                   <li>
//                     <NavLink to="/" className={navClass}>
//                       <FaHome className="text-base" />
//                       <span>Home</span>
//                     </NavLink>
//                   </li>
//                 </ul>
//               </div>

//               {/* User Info Footer */}
//               <div className="p-4 sm:p-5 border-t border-gray-100 bg-gradient-to-r from-slate-50 to-blue-50">
//                 <div className="flex items-center gap-3 rounded-2xl bg-white border border-gray-100 shadow-sm p-3">
//                   <div className="shrink-0">
//                     <div className="flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl w-11 h-11 shadow-md">
//                       <span className="text-sm font-bold">
//                         {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-semibold text-gray-900 truncate">
//                       {user?.fullname || "User"}
//                     </p>
//                     <p className="text-xs text-gray-500 capitalize">
//                       {user?.role || "Student"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Dashboard;







import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaHome, FaSchool, FaUser, FaBars } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Footer from "../shared/footer/Footer";
import Navbar from "../shared/navbar/Navbar";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  const isDashboardHome = location.pathname === "/dashboard";

  const navClass = ({ isActive }) =>
    `group flex items-center gap-3 text-sm sm:text-base md:text-[15px] font-medium rounded-2xl px-4 py-3 transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-200 scale-[1.01]"
        : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700"
    }`;

  const panelTitle =
    user?.role === "admin"
      ? "Admin Panel"
      : user?.role === "instruct"
      ? "Instructor Panel"
      : "Student Panel";

  if (!isDashboardRoute) {
    return <Outlet />;
  }

  return (
    <>
      <Navbar />

      <div className="drawer lg:drawer-open bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* Main content area */}
        <div className="drawer-content flex flex-col min-h-screen">
          {/* Mobile Header */}
          <div className="lg:hidden sticky top-0 z-30 border-b border-white/50 bg-white/80 backdrop-blur-xl shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
              <label
                htmlFor="my-drawer-2"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 hover:from-blue-200 hover:to-indigo-200 transition cursor-pointer shadow-sm"
              >
                <FaBars className="text-lg" />
              </label>

              <h2 className="text-base font-bold text-gray-800 tracking-wide">
                Dashboard
              </h2>

              <div className="w-10 h-10" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-3 sm:p-5 md:p-6 lg:p-8">
            {/* Welcome section only for /dashboard */}
            {isDashboardHome && (
              <div className="relative overflow-hidden rounded-[28px] border border-white/50 bg-white/75 backdrop-blur-xl shadow-[0_15px_50px_rgba(59,130,246,0.15)] p-5 sm:p-7 md:p-10 mb-5 sm:mb-6">
                <div className="absolute top-0 right-0 w-52 h-52 bg-blue-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-52 h-52 bg-indigo-200/30 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
                  <div className="max-w-3xl">
                    <p className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-1.5 text-xs sm:text-sm font-semibold mb-4 shadow-sm">
                      Welcome Back
                    </p>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                      Hello,{" "}
                      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {user?.fullname || "User"}
                      </span>
                    </h2>

                    <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
                      Manage your courses, monitor activity, and enjoy a cleaner,
                      smarter, and more beautiful learning experience from your
                      personal dashboard.
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="rounded-2xl bg-white/90 border border-gray-100 shadow-sm px-4 py-4">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                          Logged in as
                        </p>
                        <p className="mt-1 text-base sm:text-lg font-bold text-gray-900 capitalize">
                          {user?.role || "student"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/90 border border-gray-100 shadow-sm px-4 py-4">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                          Platform
                        </p>
                        <p className="mt-1 text-base sm:text-lg font-bold text-gray-900">
                          Online Learning Academy
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full xl:w-auto">
                    <div className="rounded-[26px] bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 text-white shadow-[0_18px_40px_rgba(79,70,229,0.35)] px-6 py-7 min-w-[260px]">
                      <p className="text-sm text-blue-100 font-medium">
                        Dashboard Overview
                      </p>
                      <h3 className="mt-2 text-2xl sm:text-3xl font-bold">
                        {panelTitle}
                      </h3>
                      <p className="mt-3 text-sm text-blue-100 leading-relaxed">
                        Everything you need is organized here with a polished,
                        distraction-free interface.
                      </p>

                      <div className="mt-5 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-300" />
                        <span className="text-sm text-white/90">
                          System ready
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Child routes */}
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-40">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          <div className="relative min-h-full w-72 sm:w-80 bg-white/95 backdrop-blur-xl border-r border-blue-100 shadow-[8px_0_30px_rgba(15,23,42,0.08)]">
            {/* Sidebar header */}
            <div className="relative overflow-hidden px-5 sm:px-6 py-6 border-b border-white/10 bg-gradient-to-br from-slate-900 via-blue-800 to-indigo-800">
              <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-8 w-32 h-32 bg-cyan-300/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                    {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      Dashboard
                    </h2>
                    <p className="text-sm text-blue-100">{panelTitle}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between min-h-[calc(100vh-105px)]">
              {/* Navigation */}
              <div className="p-4 sm:p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-semibold px-3 mb-3">
                  Navigation
                </p>

                <ul className="space-y-2">
                  {user?.role === "admin" ? (
                    <>
                      <li>
                        <NavLink to="/dashboard/panging" className={navClass}>
                          <FaSchool className="text-base" />
                          <span>Pending Classes</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/course" className={navClass}>
                          <FaUser className="text-base" />
                          <span>All Courses</span>
                        </NavLink>
                      </li>
                    </>
                  ) : user?.role === "instruct" ? (
                    <>
                      <li>
                        <NavLink
                          to="/dashboard/UpdateProfile"
                          className={navClass}
                        >
                          <FaUser className="text-base" />
                          <span>Update Profile</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/profile" className={navClass}>
                          <FaUser className="text-base" />
                          <span>Profile</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/addcourse" className={navClass}>
                          <FaSchool className="text-base" />
                          <span>Add A Course</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/myClass" className={navClass}>
                          <FaSchool className="text-base" />
                          <span>All Courses</span>
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink to="/dashboard/enrollClass" className={navClass}>
                          <FaSchool className="text-base" />
                          <span>Enrolled Classes</span>
                        </NavLink>
                      </li>
                    </>
                  )}

                  <div className="my-4 border-t border-gray-200" />

                  <li>
                    <NavLink to="/" className={navClass}>
                      <FaHome className="text-base" />
                      <span>Home</span>
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* Bottom user card */}
              <div className="p-4 sm:p-5 border-t border-gray-100 bg-gradient-to-r from-slate-50 to-blue-50">
                <div className="rounded-3xl bg-white border border-gray-100 shadow-md p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl w-12 h-12 shadow-lg">
                      <span className="text-sm font-bold">
                        {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.fullname || "User"}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user?.role || "Student"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-2xl bg-blue-50 px-3 py-2 text-center">
                      <p className="text-[10px] text-blue-500 font-medium uppercase">
                        Status
                      </p>
                      <p className="text-xs font-bold text-blue-700 mt-1">
                        Active
                      </p>
                    </div>
                    <div className="rounded-2xl bg-indigo-50 px-3 py-2 text-center">
                      <p className="text-[10px] text-indigo-500 font-medium uppercase">
                        Access
                      </p>
                      <p className="text-xs font-bold text-indigo-700 mt-1">
                        Granted
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;