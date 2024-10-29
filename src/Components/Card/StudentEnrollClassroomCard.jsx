import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  

export default function StudentEnrollClassroomCard() {
  return (
    <div className="m-0">
      <div className="card" 
           style={{ 
             width: '250px', 
             height: '120px', 
             margin: '10px', 
             border: '2px solid #ccc', 
             borderRadius: '10px', 
             transition: '0.3s' 
           }}>
        <div className="card-body d-flex align-items-center justify-content-center" 
             style={{ 
               backgroundColor: '#f8f9fa', 
               borderRadius: '10px' 
             }}>
          <h5 className="card-title" style={{ color: '#2e2e2e' }}>Enroll Classroom+</h5>
        </div>
      </div>
    </div>
  );
}
