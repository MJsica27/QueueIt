import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/Auth/LoginForm';
import RegistrationForm from './Components/Auth/RegistrationForm';
import AdminHomePage from './Components/Admin/AdminPage'; 
import AdviserHomePage from './Components/Adviser/AdviserPage'; 
import StudentHomePage from './Components/Student/StudentPage'; 
import { ToastContainer } from 'react-toastify';

function App() {
    return ( 
        <Router>
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
