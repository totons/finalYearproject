import { useEffect, useState } from "react";
import ClassInfo from "./ClassInfo";


const HomeClasses = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('https://astha-sports-academy-server.vercel.app/home')
            .then(res => res.json())
            .then(data => setClasses(data));
    },[])


    return (
        <div className="max-w-7xl mx-auto mt-20">
            <h2 className="uppercase text-center text-4xl font-semibold mb-10">popular Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" >
                {
                    classes.map(oneCls => <ClassInfo
                        key={oneCls._id}
                        oneCls={oneCls}
                    ></ClassInfo>)
                }
            </div>
        </div>
    );
};

export default HomeClasses;