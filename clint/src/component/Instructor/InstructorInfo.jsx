import { Link } from "react-router-dom";

const InstructorInfo = ({ instructor }) => {
    const { fullname, email, image,
        linkedInLink,
        githubLink
        

         } = instructor;
   
    
    return (
        <div className="flex justify-center">
            <div className="card card-compact md:w-96 w-full bg-base-100 shadow-xl rounded-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <figure className="overflow-hidden rounded-t-lg">
                    <img 
                        src={image || "https://via.placeholder.com/400"} 
                        alt={`${fullname}'s photo`} 
                        className="w-full h-[400px] object-cover"
                    />
                </figure>
                <div className="card-body p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                    <h2 className="card-title text-2xl font-bold text-gray-800">{fullname}</h2>
                    <p className="text-lg font-medium text-gray-600">{email}</p>
                </div>
                <div className="flex justify-between card-body p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
                       <Link to={githubLink}>
                       Github
                       </Link>
                    </button>
                    <button>

                        <Link to={linkedInLink}>
                        LinkedIn
                        </Link>
                       
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstructorInfo;
