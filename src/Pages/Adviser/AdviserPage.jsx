import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import AdviserNavbar from '../../Components/Navbar/AdviserNavbar';
import vector from '../../Assets/Vector.png';


export default function AdminPage() {
  const location = useLocation();  
  const { user } = location.state || {};
  return (
    <div className="m-0 vh-100" 
       style={{ 
        background: '#ffffff', 
        color: '#333333',
        backgroundImage: `url(${vector})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
         }}>
      <AdviserNavbar />
      <div className="container">
        {user ? (
          <div className="mt-5">
            <h2>Welcome, {user.username}!</h2>  
          </div>
        ) : (
          <p>No user information available.</p>
        )}
      </div>
    </div>
  )
} 
