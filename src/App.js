import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Auth/LoginForm';
import RegistrationForm from './Auth/RegistrationForm';
import AdminHomePage from './Pages/Admin/AdminPage'; 
import AdviserHomePage from './Pages/Adviser/AdviserPage'; 
import AdviserQueuePage from './Pages/Adviser/AdviserQueuePage'; 
import AdviserAvailabilityPage from './Pages/Adviser/AdviserAvailabilityPage';
import AdviserLogPage from './Pages/Adviser/AdviserLogPage';
import StudentHomePage from './Pages/Student/StudentPage'; 
import ProfilePage from './Pages/ProfilePage';
import { UserProvider } from './Components/User/UserContext';
import { ToastContainer } from 'react-toastify';


export default function App() {
    return ( 
        <div className='App'>
            <UserProvider>
                <Router> 
                    <ToastContainer />
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegistrationForm />} />
                        <Route path="/adminhomepage" element={<AdminHomePage />} />
                        <Route path="/adviserhomepage" element={<AdviserHomePage />} />
                        <Route path="/adviserqueuepage" element={<AdviserQueuePage />} />
                        <Route path="/adviseravailabilitypage" element={<AdviserAvailabilityPage />} />
                        <Route path="/adviserlogpage" element={<AdviserLogPage />} />
                        <Route path="/studenthomepage" element={<StudentHomePage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/" element={<LoginForm />} />
                        <Route path="*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </Router>
            </UserProvider>
        </div>
        
    );
} 
