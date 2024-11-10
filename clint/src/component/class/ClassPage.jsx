import React, { useEffect, useState } from 'react';
import SectionHeading from '../shared/SectionHeading';
import ClassInfo from '../home/homeComponent/ClassInfo';
import { getBaseUrl } from '../../utils/baseUrl';

const ClassPage = () => {

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch(`${getBaseUrl()}/course/`)
            .then(res => res.json())
            .then(data => setClasses(data));  // Limit to the first 4 classes
    }, []);
    console.log(classes);
    return (
        <div className='container mx-auto'>
            <SectionHeading title={"Show Our Class"} desc={"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"
}/>
  
<div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {
                    classes.map(oneCls => (
                        <ClassInfo
                            key={oneCls._id}
                            oneCls={oneCls}
                        />
                    ))
                }
            </div>

        </div>
    );
}

export default ClassPage;
