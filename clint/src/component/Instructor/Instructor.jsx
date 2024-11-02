import { useEffect, useState } from "react";
import InstructorInfo from "./InstructorInfo";


const Instructor = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('https://astha-sports-academy-server.vercel.app/instructor')
            .then(res => res.json())
            .then(data => setInstructors(data));
    },[])
    return (
        <div className="mt-20 md:flex md:flex-col md:items-center md:justify-center">
            <h2 className="text-4xl text-center font-semibold mb-10">Instructors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {} {
                    instructors.map(instructor => <InstructorInfo
                        key={instructor.id}
                        instructor={instructor}
                    >
                    </InstructorInfo>)
                }
            </div>
        </div>
    );
};

export default Instructor;