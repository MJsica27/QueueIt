import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/Auth/LoginForm';
import RegistrationForm from './Components/Auth/RegistrationForm';
import StudentHomePage from './Components/Student/HomePage';

function App() {
    return (

        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/studenthomepage" element={<StudentHomePage />} />
                <Route path="/" element={
                  <RegistrationForm/>} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
