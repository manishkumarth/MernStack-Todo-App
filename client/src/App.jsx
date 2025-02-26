import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

const App = () => {
    return (
        <DataProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/edit/:id" element={<Edit />} />
                </Routes>
            </Router>
        </DataProvider>
    );
};

export default App;
