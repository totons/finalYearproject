const InstructorInfo = ({ instructor }) => {
    const { name, image, email } = instructor;
    return (
        <div className="flex justify-center">
            <div className="card card-compact md:w-96 w-full bg-base-100 shadow-xl rounded-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <figure className="overflow-hidden rounded-t-lg">
                    <img src={image} alt={`${name}'s photo`} className="w-full h-[400px] object-cover"/>
                </figure>
                <div className="card-body p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                    <h2 className="card-title text-2xl font-bold text-gray-800">{name}</h2>
                    <p className="text-lg font-medium text-gray-600">{email}</p>
                </div>
            </div>
        </div>
    );
};

export default InstructorInfo;
