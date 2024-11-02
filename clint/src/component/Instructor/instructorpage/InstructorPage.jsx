import React from 'react';
import SectionHeading from '../../shared/SectionHeading';
import Instructor from '../Instructor';


const InstructorPage = () => {
    return (
        <div className='container mx-auto'>
            <SectionHeading title={"Meet Our Instructors"} desc={"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"
}/>

<Instructor/>


        </div>
    );
}

export default InstructorPage;
