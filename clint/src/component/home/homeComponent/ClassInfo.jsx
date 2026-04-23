import { Link } from "react-router-dom";

const ClassInfo = ({ oneCls }) => {
    // const { images, title,instructor    } = oneCls;

    return (

        
        <div className="flex justify-center items-center ">
            <div className="card card-compact md:w-96 w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <figure className="relative">
                    <img
                        src={oneCls.images}
                        alt={oneCls.title}
                        className="w-full h-[300px] object-cover rounded-t-lg transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                </figure>
                <div className="card-body p-6 text-center">
                    <h2 className="card-title text-2xl font-extrabold text-gray-800 dark:text-white tracking-tight leading-tight">
                        {oneCls.title}
                    </h2>
                    <p className="text-lg text-left font-medium text-gray-600 dark:text-gray-300 mt-2 tracking-wide">
                        skills : {oneCls.skills}
                    </p> 
                    <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                        <Link to={`/class/${oneCls._id}`}>
                        View Details
                        
                        </Link>
                    </button>
                </div>
            </div>
        </div>
        
    );
};

export default ClassInfo;

