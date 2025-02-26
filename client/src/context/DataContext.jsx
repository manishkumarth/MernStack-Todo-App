import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    // Fetch Data
    const fetchData = async () => {
        try {
            const res = await fetch("http://localhost:8000/todolist");
            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    // Add Data
    const addData = async (newItem) => {
        try {
            await fetch("http://localhost:8000/addTodolist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem),
            });
            fetchData();
        } catch (error) {
            console.error("Error adding data", error);
        }
    };

    // Delete Data
    const deleteData = async (id) => {
        try {
            await fetch(`http://localhost:8000/deleteTodolist/${id}`, {
                method: "DELETE",
            });
            fetchData();
        } catch (error) {
            console.error("Error deleting data", error);
        }
    };

    // Update Data
    const updateData = async (id, updatedItem) => {
        try {
            const res = await fetch(`http://localhost:8000/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedItem),
            });
            fetchData()
        } catch (error) {
            console.error("Error updating data", error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []); // Runs only once on mount

    return (
        <DataContext.Provider value={{ data, addData, deleteData, updateData }}>
            {children}
        </DataContext.Provider>
    );
};
