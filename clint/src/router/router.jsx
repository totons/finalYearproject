import {
    createBrowserRouter,
  
  } from "react-router-dom";
import Mains from "../Mains";
import Home from "../component/home/Home";
import InstructorPage from "../component/Instructor/instructorpage/InstructorPage";
import Signup from "../component/signup/Signup";
import Login from "../component/login/Login";
import ErrorPage from "../component/shared/error/ErrorPage";
import DashBord from "../component/dashbord/DashBord";
import PrivateRoute from "./PrivateRoute";
import AddCourse from "../component/dashbord/instactor/AddCourse";
import PandingCourse from "../component/dashbord/admin/PandingCourse";
import ShowAllClass from "../component/dashbord/admin/ShowAllClass";
import UpdateProfile from "../component/dashbord/instactor/UpdateProfile";
import Profile from "../component/dashbord/instactor/Profile";
import AllCourse from "../component/dashbord/instactor/AllCourse";
import ClassPage from "../component/class/ClassPage";
import SingleClassPage from "../component/class/SingleClassPage";
import EnrollmentClass from "../component/dashbord/student/EnrollmentClass";
import ShowAllEnrollStudent from "../component/dashbord/instactor/ShowAllEnrollStudent";
import AddClass from "../component/dashbord/instactor/AddClass";
import Classshow from "../component/dashbord/student/Classshow";
import AddAssignment from "../component/dashbord/instactor/AddAssigment";
import UpdateCourse from "../component/dashbord/instactor/UpdateCourse";
import ShowAssigment from "../component/dashbord/instactor/ShowAssigment";
import Result from "../component/dashbord/student/Result";
import Showclass from "../component/dashbord/instactor/Showclass";
import Show from "../component/dashbord/instactor/Show";
import StudentStatistics from "../component/dashbord/instactor/StudentStatistics"
import PaymentHistory from "../component/dashbord/student/PaymentHistory";
export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Mains/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: '/',
          element: <Home/>,
        },
 {
          path: '/instructor',
          element: <InstructorPage/>,
        },
        {
          path:'/class',
          element: <ClassPage/>,
        },
        {
          path:'/class/:id',
          element: <SingleClassPage/>,
        },
        {
          path: '/signup',
          element: <Signup/>
        },

        {
          path: '/login',
          element: <Login/>
        },
        



        
    ]
    },



    {
      path: '/dashboard',
      element: <PrivateRoute allowedRoles={["admin", "instruct","student"]} ><DashBord/></PrivateRoute>,
      children: [
        
        {
          path: '/dashboard/addcourse',
          element:<PrivateRoute allowedRoles={["instruct"]} > <AddCourse/></PrivateRoute>,
        },

        {
          path: '/dashboard/UpdateProfile',
          element: <PrivateRoute allowedRoles={["instruct"]}><UpdateProfile/></PrivateRoute>,
        },
         {
          path: '/dashboard/profile',
          element: <PrivateRoute allowedRoles={["instruct"]}><Profile/></PrivateRoute>,
        },
        
 {
          path: '/dashboard/panging',
          element:  <PrivateRoute allowedRoles={["admin"]}> <PandingCourse/> </PrivateRoute>,
        },

 {
          path: '/dashboard/myClass',
          element:<PrivateRoute allowedRoles={["instruct"]}><AllCourse/></PrivateRoute>,
        },
        {
          path: '/dashboard/course',
          element: <PrivateRoute allowedRoles={["admin"]}><ShowAllClass/></PrivateRoute>,
        },
 {
          path: '/dashboard/enrollClass',
          element: <PrivateRoute allowedRoles={["student"]}><EnrollmentClass/></PrivateRoute>,
        },

        {
          path: '/dashboard/enrollsetudent/:courseId',
          element:<ShowAllEnrollStudent/>,
        },

        {
          path: '/dashboard/enrollsetudents/:courseId',
          element: <PrivateRoute allowedRoles={["instruct"]}><Show/></PrivateRoute>,
        },
        {
          path: '/dashboard/student-statistics/:courseId',
          element: <PrivateRoute allowedRoles={["instruct"]}><StudentStatistics/></PrivateRoute>,
        },

        {
          path: '/dashboard/addclass/:courseId',
          element: <PrivateRoute allowedRoles={["instruct"]}><AddClass/></PrivateRoute>,
        },
        
        {
          path: '/dashboard/showallclass/:courseId',
          element:<PrivateRoute allowedRoles={["student"]}> <Classshow/></PrivateRoute>,
        },
        {
          path: '/dashboard/showallclasss/:courseId',
          element:<Showclass/>,
        },


        { path:"/dashboard/payments", 
          element:<PaymentHistory />

        }
,
{
  path: "/dashboard/payment-success",
  element: (
    <h2 className="text-3xl font-bold text-green-600 p-10">
      Payment Successful! Course enrolled.
    </h2>
  ),
},
{
  path: "/dashboard/payment-failed",
  element: (
    <h2 className="text-3xl font-bold text-red-600 p-10">
      Payment Failed!
    </h2>
  ),
},
{
  path: "/dashboard/payment-cancel",
  element: (
    <h2 className="text-3xl font-bold text-yellow-600 p-10">
      Payment Cancelled!
    </h2>
  ),
},


        {
          path: '/dashboard/addassigment/:courseId',
          element: <PrivateRoute allowedRoles={["instruct"]}><AddAssignment/></PrivateRoute>,
        },
        {
          path:"/dashboard/courses/update/:courseId" ,
          element: <PrivateRoute allowedRoles={["instruct"]}><UpdateCourse/></PrivateRoute>
        },   

        {
          path:"/dashboard/enrollsetudent/:courseId/student/:studentId" ,
          element:<PrivateRoute allowedRoles={["instruct","admin"]}><ShowAssigment/></PrivateRoute> ,
        }   ,
           {
          path:"/dashboard/courses/:courseId/users/:studentId" ,
          element: <PrivateRoute allowedRoles={["student"]}><Result/></PrivateRoute>,
        }   ,
    ]
    }
  ]);