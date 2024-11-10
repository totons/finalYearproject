import { useEffect, useState } from "react";
import ClassInfo from "./ClassInfo";
import { getBaseUrl } from "../../../utils/baseUrl";
import { Link } from "react-router-dom";

const HomeClasses = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch(`${getBaseUrl()}/course/`)
            .then(res => res.json())
            .then(data => setClasses(data.slice(0, 6)));  // Limit to the first 4 classes
    }, []);
    
    console.log(classes);

    return (
        <div className="max-w-7xl mx-auto mt-20">
            <h2 className="uppercase text-center text-4xl font-semibold mb-10">Popular Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {
                    classes.map(oneCls => (
                        <ClassInfo
                            key={oneCls._id}
                            oneCls={oneCls}
                        />
                    ))
                }
            </div>

           <div className="flex justify-center mt-9">
           <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
  <Link to="/class">
  View All Classes
  </Link>
</button>
           </div>

        </div>
    );
};

export default HomeClasses;
