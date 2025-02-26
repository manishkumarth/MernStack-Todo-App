import { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateForm = () => {
    const { addData } = useContext(DataContext);
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        comment: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Name is required.";
        }
        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
            newErrors.email = "Invalid email format.";
        }
        if (!form.mobile.trim()) {
            newErrors.mobile = "Mobile number is required.";
        } else if (!/^\d{10}$/.test(form.mobile)) {
            newErrors.mobile = "Mobile number must be 10 digits.";
        }
        if (!form.comment.trim()) {
            newErrors.comment = "Comment is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            await addData(form);
            setForm({ name: "", email: "", mobile: "", comment: "" }); // Clear inputs after submission
            navigate("/");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">Add New User</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <small className="text-danger">{errors.name}</small>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mobile:</label>
                                <input
                                    type="text"
                                    name="mobile"
                                    className="form-control"
                                    placeholder="Enter mobile number"
                                    value={form.mobile}
                                    onChange={handleChange}
                                />
                                {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Comment:</label>
                                <textarea
                                    name="comment"
                                    className="form-control"
                                    placeholder="Enter comment"
                                    value={form.comment}
                                    onChange={handleChange}
                                />
                                {errors.comment && <small className="text-danger">{errors.comment}</small>}
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Add User
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateForm;
