import {
    createBrowserRouter,
  
  } from "react-router-dom";
import Main from "../Main";
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

export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
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
        
    ]
    }
  ]);