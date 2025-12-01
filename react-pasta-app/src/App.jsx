import './App.css'
import AdminPage from "./components/AdminPage.jsx";
import HomePage from "./components/HomePage.jsx";
import Footer from "./components/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import AdminGate from "./components/AdminGate.jsx";

function App() {

    return (
        <div className="app-layout">
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/admin" element={<AdminGate>
                                                    <AdminPage />
                                                </AdminGate>} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App
