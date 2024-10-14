import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Auth/LoginForm';
import RegistrationForm from './Auth/RegistrationForm';
import AdminHomePage from './Pages/Admin/AdminPage'; 
import AdviserHomePage from './Pages/Adviser/AdviserPage'; 
import StudentHomePage from './Pages/Student/StudentPage'; 
import { ToastContainer } from 'react-toastify';
import AdminNavbar from './Components/Navbar/AdminNavbar';

function App() {
    return ( 
        <Router>
            <AdminNavbar />
            <ToastContainer />
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/adminhomepage" element={<AdminHomePage />} />
                <Route path="/adviserhomepage" element={<AdviserHomePage />} />
                <Route path="/studenthomepage" element={<StudentHomePage />} />
                <Route path="/" element={<RegistrationForm />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
