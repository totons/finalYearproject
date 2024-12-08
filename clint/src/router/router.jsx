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
      element: <PrivateRoute><DashBord/></PrivateRoute>,
      children: [
        
        {
          path: '/dashboard/addcourse',
          element: <AddCourse/>,
        },

        {
          path: '/dashboard/UpdateProfile',
          element: <UpdateProfile/>,
        },
         {
          path: '/dashboard/profile',
          element:<Profile/>,
        },
        
 {
          path: '/dashboard/panging',
          element:<PandingCourse/>,
        },

 {
          path: '/dashboard/myClass',
          element:<AllCourse/>,
        },
        {
          path: '/dashboard/course',
          element:<ShowAllClass/>,
        },
 {
          path: '/dashboard/enrollClass',
          element:<EnrollmentClass/>,
        },

        {
          path: '/dashboard/enrollsetudent/:courseId',
          element:<ShowAllEnrollStudent/>,
        },
        {
          path: '/dashboard/addclass/:courseId',
          element:<AddClass/>,
        },
        {
          path: '/dashboard/showallclass/:courseId',
          element:<Classshow/>,
        },
        {
          path: '/dashboard/addassigment/:courseId',
          element:<AddAssignment/>,
        },
        
    ]
    }
  ]);