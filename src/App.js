import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Auth/LoginForm';
import RegistrationForm from './Auth/RegistrationForm';
import AdminHomePage from './Pages/Admin/AdminPage'; 
import AdviserHomePage from './Pages/Adviser/AdviserPage'; 
import StudentHomePage from './Pages/Student/StudentPage'; 
import ProfilePage from './Pages/ProfilePage';
import { ToastContainer } from 'react-toastify';


export default function App() {
    return ( 
        <div className='App'>
            <Router> 
            <ToastContainer />
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/adminhomepage" element={<AdminHomePage />} />
                <Route path="/adviserhomepage" element={<AdviserHomePage />} />
                <Route path="/studenthomepage" element={<StudentHomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/" element={<LoginForm />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
        </div>
        
    );
} 
