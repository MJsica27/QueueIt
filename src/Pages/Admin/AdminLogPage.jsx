import React from 'react'
import UserNavbar from '../../Components/Navbar/UserNavbar';

export default function AdminLogPage() {
  return (
    <div className="m-0 vh-100" style={{ background: '#b9ff66', color: '#333333'  }}>
      <UserNavbar/>
        <div style={{ background: '#fff', color: '#333333', height: '100vh',  padding: '25px' }}> 
          {/* content here  */}
        </div>
    </div>
  )
}
 