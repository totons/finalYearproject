// import { useContext } from 'react';


// import { Navigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../provider/AuthProvider';
// import { Loader } from 'lucide-react';

// const PrivateRoute = ({ children }) => {
//     const { user, loading } = useContext(AuthContext);
//     const location=useLocation()

//     // If still loading authentication status, show a loading spinner
//     if (loading) {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="text-center">
//         <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
//         <p className="text-lg font-semibold text-gray-700">Loading your Dashboard...</p>
//       </div>
//     </div>
//   );
// }


//     // If the user is authenticated, render the children (protected content)
//     if (user) {
//         return children;
//     }

//     // If not authenticated, store the current path and redirect to login
//     // Store the current location in localStorage
//     return <Navigate state={{from:location}} replace to="/login"></Navigate>;
// };

// export default PrivateRoute;


import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { Loader } from "lucide-react";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // 1️⃣ Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">
            Loading your Dashboard...
          </p>
        </div>
      </div>
    );
  }

  // 2️⃣ Not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3️⃣ Role check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // 4️⃣ Authorized
  return children;
};

export default PrivateRoute;
