import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const List = () => {
    const { data, deleteData } = useContext(DataContext);
    const navigate = useNavigate();

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">User List</h2>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary mb-3" onClick={() => navigate("/create")}>
                    + Add User
                </button>
            </div>
            <div className="row">
                {data.map((item) => (
                    <div key={item._id} className="col-md-4 mb-3">
                        <div className="card shadow-sm p-3">
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text"><strong>Email:</strong> {item.email}</p>
                                <p className="card-text"><strong>Mobile:</strong> {item.mobile}</p>
                                <p className="card-text"><strong>Comment:</strong> {item.comment}</p>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-danger" onClick={() => deleteData(item._id)}>Delete</button>
                                    <button className="btn btn-warning" onClick={() => navigate(`/edit/${item._id}`)}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
