import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import SectionHeading from '../shared/SectionHeading';

const SingleClassPage = () => {
    const { id: courseId } = useParams(); 
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5004/course/${courseId}`);
                setCourse(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data.message : "Failed to fetch course data");
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId]);

    if (loading) return <div className="text-center text-xl font-bold text-gray-600">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <>
        
        <SectionHeading title={"Meet Our Instructors"} desc={"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"
}/>
        
        <div className="bg-slate-400 max-w-7xl mx-auto mt-16 p-10 ">
            <div className="max-w-4xl mx-auto rounded-lg overflow-hidden ">
                {/* Image and Details Grid */}
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 p-6">
                    <div>
                    <img 
                        src={course.images} 
                        alt={course.title} 
                        className="w-full h-80 object-cover transition-all hover:scale-105 lg:rounded-l-lg border border-gray-300 shadow-md" 
                    />
                    <p className="text-gray-700 text-lg leading-relaxed mt-10"><strong>Details : </strong> {course.description}</p>
                    </div>
                    

                    {/* Course Details */}
                    <div className="p-8 space-y-6 lg:p-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-200">{course.title}</h1>
                       
                        
                        <div className="flex items-center justify-between mt-6 mb-4 border-t border-b py-4">
                            <p className="text-2xl font-semibold text-blue-600">Price: ${course.price}</p>
                            <p className="text-gray-500 text-lg">Enroll by: {new Date(course.enrollLastDate).toLocaleDateString()}</p>
                        </div>
                        
                        <p className="text-gray-600 text-sm italic">Skills covered: <span className="text-blue-500">{course.skills}</span></p>

                        {/* Instructor Info */}
                        <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner border-t border-gray-200">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Instructor Information</h2>
                            <div className="flex items-center space-x-4 mb-4">
                                <img 
                                    src={course.instructor.image} 
                                    alt={course.instructor.fullname} 
                                    className="w-24 h-24 rounded-full border-4 border-blue-600 shadow-lg transition-transform hover:scale-110" 
                                />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{course.instructor.fullname}</h3>
                                    <p className="text-gray-500">{course.instructor.email}</p>
                                    <p className="text-blue-600 mt-1">
                                        <Link to={course.instructor.linkedInLink} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</Link> | <a href={course.instructor.githubLink} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                                    </p>
                                </div>
                            </div>
                          

                        </div>
                    </div>

                   
                </div>
                 {/* Enroll Button */}
                 <div className="flex items-center justify-center mt-12">
    <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
        Enroll Now
    </button>
</div>

            </div>
        </div>
        
        </>
    );
};

export default SingleClassPage;
