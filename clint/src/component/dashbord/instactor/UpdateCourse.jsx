import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UpdateCourse = () => {
    const { courseId } = useParams();
    const navigare=useNavigate()
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
                const response = await axios.get(`http://127.0.0.1:5004/course/${courseId}`);
                
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
                `http://127.0.0.1:5004/course/${courseId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        
                    },
                }
            );

            alert('Course updated successfully!');
            // Optionally navigate to another page
            navigare('/dashboard/myClass')
        } catch (err) {
            console.error('Failed to update course:', err);
            alert('Failed to update course. Please try again.');
        }
    };

    // Display loading or error messages
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <form onSubmit={handleSubmit} className="p-5">
            <h2 className="text-lg font-bold mb-4">Update Course</h2>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={course.title}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    name="description"
                    value={course.description}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                />
            </div>
            <div>
                <label>Enroll Last Date</label>
                <input
                    type="date"
                    name="enrollLastDate"
                    value={course.enrollLastDate}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                />
            </div>
            <div>
                <label>Skills</label>
                <input
                    type="text"
                    name="skills"
                    value={course.skills}
                    onChange={handleInputChange}
                    placeholder="Comma-separated skills"
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={course.price}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                />
            </div>
            {/* <div>
            {course.images && !file && (
                    <img src={course.images} alt="Current course image" className="mt-2 " />
                )}
                <input
                    type="file"
                    name="images"
                    onChange={handleFileChange}
                    className="border p-2 w-full disabled"
                    
                />
               
            </div> */}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 mt-3 rounded hover:bg-blue-600"
            >
                Save Changes
            </button>
        </form>
    );
};

export default UpdateCourse;
