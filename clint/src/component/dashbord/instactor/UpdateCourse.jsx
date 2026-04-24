import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { Loader } from 'lucide-react';
import { getBaseUrl } from '../../../utils/baseUrl';
const UpdateCourse = () => {
    const { courseId } = useParams();
    const navigare = useNavigate();
    
    // Initial course state
    const [course, setCourse] = useState({
        title: '',
        images: '',
        description: '',
        enrollLastDate: '',
        skills: '',
        price: ''
    });
    const [file, setFile] = useState(null); // For storing the selected file
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(''); // For error handling

    // Fetch course details by ID
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/course/${courseId}`);
                
                if (response.data.enrollLastDate) {
                    response.data.enrollLastDate = new Date(response.data.enrollLastDate)
                        .toISOString()
                        .slice(0, 10); // Extract only the "YYYY-MM-DD" part
                }
                
                setCourse(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data.message : "Failed to fetch course data");
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = Cookies.get('token'); // Fetch token from cookies

            // Create FormData to handle the file upload
            const formData = new FormData();
            formData.append('title', course.title);
            formData.append('description', course.description);
            formData.append('enrollLastDate', course.enrollLastDate);
            formData.append('skills', course.skills);
            formData.append('price', course.price);
            if (file) {
                formData.append('imagess', file);
            }

            console.log(formData.data);
            await axios.put(
                `${getBaseUrl()}/course/${courseId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Course created successfully!',
                showConfirmButton: false,
                timer: 900,
            });
            // Optionally navigate to another page
            navigare('/dashboard/myClass');
        } catch (err) {
            console.error('Failed to update course:', err);
            alert('Failed to update course. Please try again.');
        }
    };

    // Display loading or error messages
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-700">Loading your courses...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <p className="text-red-600 text-lg font-semibold">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white  rounded-2xl  mx-auto p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8"
            >
                {/* Header */}
                <div className="text-center pb-4 border-b border-gray-200">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                        Update Course
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">Modify course details below</p>
                </div>

                {/* Title */}
                <div className="w-full">
                    <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                        Course Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={course.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        placeholder="Enter course title"
                    />
                </div>

                {/* Description */}
                <div className="w-full">
                    <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={course.description}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base"
                        placeholder="Provide a comprehensive description of the course..."
                    ></textarea>
                </div>

                {/* Enroll Last Date & Skills Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                            Enrollment Deadline <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="enrollLastDate"
                            value={course.enrollLastDate}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                            Skills Covered
                        </label>
                        <input
                            type="text"
                            name="skills"
                            value={course.skills}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                            placeholder="e.g., HTML, CSS, JavaScript, React"
                        />
                    </div>
                </div>

                {/* Price */}
                <div className="w-full">
                    <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                        Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm sm:text-base">৳</span>
                        <input
                            type="number"
                            name="price"
                            value={course.price}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-8 sm:pl-10 pr-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                            placeholder="Enter course price"
                        />
                    </div>
                </div>

                {/* File Upload (Commented out in original) */}
                {/* <div className="w-full">
                    <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                        Course Image
                    </label>
                    {course.images && !file && (
                        <div className="mb-3">
                            <img 
                                src={course.images} 
                                alt="Current course image" 
                                className="w-full max-w-md h-48 object-cover rounded-xl border-2 border-gray-200"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        name="images"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base file:mr-3 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
                    />
                </div> */}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 py-3.5 sm:py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]  hover:shadow-xl text-sm sm:text-base"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => navigare('/dashboard/myClass')}
                        className="flex-1 sm:flex-none py-3.5 sm:py-4 px-6 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300 text-sm sm:text-base"
                    >
                        Cancel
                    </button>
                </div>

                {/* Footer Note */}
                <p className="text-center text-gray-500 text-xs sm:text-sm pt-2">
                    <span className="text-red-500">*</span> Required fields
                </p>
            </form>
        </div>
    );
};

export default UpdateCourse;