import React, { useEffect, useState } from 'react';
import SectionHeading from '../../shared/SectionHeading';
import InstructorInfo from '../InstructorInfo';






const InstructorPage = () => {
    const [instructors, setInstructors] = useState([]);
    console.log(instructors)

    useEffect(() => {
        fetch('http://127.0.0.1:5004/user/ins/')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch instructors');
                return res.json();
            })
            .then(data => setInstructors(data.instructors))
            .catch(error => console.error('Error fetching instructors:', error));
    }, []);


    return (
        <div className='container mx-auto'>
            <SectionHeading title={"Meet Our Instructors"} desc={"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"
}/>



<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
                {instructors.length > 0 ? (
                    instructors.map(instructor => (
                        <InstructorInfo key={instructor._id} instructor={instructor} />
                       
                    ))
                ) : (
                    <p>Loading instructors...</p>
                )}
            </div>


        </div>
    );
}

export default InstructorPage;
