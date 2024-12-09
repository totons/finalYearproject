import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import axios from 'axios';
import { getBaseUrl } from '../../../utils/baseUrl';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';
const AllCourse = () => {
    const { user } = useContext(AuthContext);
    console.log(user.courses)
    const [courses, setCourses] = useState([]);
    const token = Cookies.get('token');
    const navigate=useNavigate()
 
    useEffect(() => {
        const fetchCourses = async () => {
           
        
            try {
                if (user.courses && user.courses.length > 0) {
                    setCourses(user.courses);
                } 
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        

        fetchCourses();
    }, [user]);

    // Placeholder functions for update and delete actions
    const handleUpdate = (courseId) => {
        console.log("Update course with ID:", courseId);
        navigate(`/dashboard/courses/update/${courseId}`);
    };

    const handleDelete = async (courseId) => {
        console.log("Attempting to delete course with ID:", courseId); // Log the course ID
       
        try {
            await axios.delete(`${getBaseUrl()}/course/${courseId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            // Filter out the deleted course from the state
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
            
            setCourses(courses.filter(course => course._id !== courseId));



            console.log("Deleted course with ID:", courseId);
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };
    
    
    

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">All Courses</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="p-4">#</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Rating</th>
                            <th className="p-4">Skills</th>
                            <th className="p-4">Enrollment Last Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={course._id} className="border-b hover:bg-gray-100 transition-colors">
                                <td className="p-4 text-center font-semibold text-gray-700">{index + 1}</td>
                                <td className="p-4 font-medium text-gray-800">{course.title}</td>
                                <td className="p-4 text-center text-green-600 font-bold">${course.price}</td>
                                <td className="p-4 text-center text-yellow-500 font-medium">{course.rating}</td>
                                <td className="p-4 text-gray-700">{course.skills}</td>
                                <td className="p-4 text-center text-gray-700">{new Date(course.enrollLastDate).toLocaleDateString()}</td>
                                <td className="p-4 text-center">
    <span className={`px-3 py-1 rounded-full text-white ${course.isactive ? 'bg-green-500' : 'bg-red-500'}`}>
        {course.isactive==true ? "Published" : "Inactive"}
    </span>
</td>

                               {
                                course.isactive==false ?  <>
                                 <td className="p-4 text-center">
                                 <button
            onClick={() => handleUpdate(course._id)}
            className="bg-yellow-400 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-500 transition"
        >
            Update
        </button>
                                    <button
                                        onClick={() => handleDelete(course._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                                
                                </>: <>  <td className='p-4 text-center'>
                                <button
                                        
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                                    >
                                      <Link to={`/dashboard/enrollsetudent/${course._id}`}>  {course.enrolledStudents.length}</Link>
                                    </button>
                                </td>
                                </>
                               }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllCourse;
