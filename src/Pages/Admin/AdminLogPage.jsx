import React from 'react'
import AdminNavbar from '../../Components/Navbar/AdminNavbar'; 

export default function AdminLogPage() {
  return (
    <div className="m-0 vh-100" style={{ background: '#b9ff66', color: '#333333'  }}>
      <AdminNavbar />
        <div style={{ background: '#fff', color: '#333333', height: '100vh',  padding: '25px'}}> 
          {/* content here  */}
        </div>
    </div>
  )
}
