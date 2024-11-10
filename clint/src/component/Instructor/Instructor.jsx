import { useEffect, useState } from "react";
import InstructorInfo from "./InstructorInfo";
import { Link } from "react-router-dom";

const Instructor = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5004/user/ins/')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch instructors');
                return res.json();
            })
            .then(data => setInstructors(data.instructors.slice(0,6)))
            .catch(error => console.error('Error fetching instructors:', error));
    }, []);
    
    console.log(instructors);

    // console.log(instructors.instructors);

    return (
        <div className="mt-20 md:flex md:flex-col md:items-center md:justify-center">
            <h2 className="text-4xl text-center font-semibold mb-10">Instructors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {instructors.length > 0 ? (
                    instructors.map(instructor => (
                        <InstructorInfo key={instructor._id} instructor={instructor} />
                       
                    ))
                ) : (
                    <p>Loading instructors...</p>
                )}
            </div>

            <div className="mt-[50px]">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
                   <Link to={'/instructor'}>view instractor</Link>
                </button>
            </div>
        </div>
    );
    
};

export default Instructor;
