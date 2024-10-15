import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';
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
    <AdminNavbar />
    <div className="container">
      <h1>Welcome, {user?.firstname}!</h1>
    </div>
  </div>
  )
} 
