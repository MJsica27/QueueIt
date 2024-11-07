import React from 'react'
import AdviserNavbar from '../../Components/Navbar/AdviserNavbar';
import vector from '../../Assets/Vector.png';

export default function AdviserLogPage() {
  return (
    <div className="m-0 vh-100" style={{ background: '#b9ff66', color: '#333333'  }}>
      <AdviserNavbar />
        <div style={{ background: '#fff', color: '#333333', height: '100vh',  padding: '25px'}}> 
          {/* content here  */}
        </div>
    </div>
  )
}
