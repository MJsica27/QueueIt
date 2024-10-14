import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useLocation } from 'react-router-dom';
import vector from '../../Assets/Vector.png';
import StudentNavbar from '../../Components/Navbar/StudentNavbar';


export default function AdminPage() {
  const location = useLocation();  
  const { user } = location.state || {};
  return (
    <div className="m-0 vh-100" 
       style={{ 
        background: '#B9FF66', 
        color: '#333333',
        backgroundImage: `url(${vector})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
         }}> 

    <StudentNavbar />
    <div className="container">
        {user ? (
          <div className="mt-5">
            <h2>Welcome, {user.username}!</h2>
            <p>Your role: {user.role === 0 ? 'Admin' : user.role === 1 ? 'Adviser' : 'Student'}</p>
            {/* Display other user details as needed */}
          </div>
        ) : (
          <p>No user information available.</p>
        )}
      </div>
    </div>
  )
} 