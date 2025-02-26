import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateForm = () => {
    const { data, updateData } = useContext(DataContext);
    const navigate = useNavigate();
    const { id } = useParams(); // Get the user ID from the URL

    // State to store form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        comment: "",
    });

    // State for validation errors
    const [errors, setErrors] = useState({});

    // Ensure data exists before searching for user
    useEffect(() => {
        if (data.length > 0) {
            const userToEdit = data.find((item) => item._id === id);
            if (userToEdit) {
                setFormData({
                    name: userToEdit.name || "",
                    email: userToEdit.email || "",
                    mobile: userToEdit.mobile || "",
                    comment: userToEdit.comment || "",
                });
            } else {
                console.error("User not found with ID:", id);
            }
        }
    }, [data, id]); // Runs when `data` changes

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // Remove error message when user types
        setErrors({ ...errors, [e.target.name]: "" });
    };

    // Validate form before submission
    const validateForm = () => {
        let newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const mobileRegex = /^[0-9]{10}$/; 

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format. Example: example@domain.com";
        }
        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile number is required.";
        } else if (!mobileRegex.test(formData.mobile)) {
            newErrors.mobile = "Mobile number must be exactly 10 digits.";
        }
        if (!formData.comment.trim()) {
            newErrors.comment = "Comment is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // 
        }

        try {
            console.log("Updating user with ID:", id, "Data:", formData);
            await updateData(id, formData);
            navigate("/");
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Update User</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                {/* Name Input */}
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>

                {/* Email Input */}
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>

                {/* Mobile Input */}
                <div className="mb-3">
                    <label className="form-label">Mobile:</label>
                    <input
                        type="text"
                        name="mobile"
                        className="form-control"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                    {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
                </div>

                {/* Comment Input */}
                <div className="mb-3">
                    <label className="form-label">Comment:</label>
                    <textarea
                        name="comment"
                        className="form-control"
                        value={formData.comment}
                        onChange={handleChange}
                        required
                    />
                    {errors.comment && <div className="text-danger">{errors.comment}</div>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateForm;
