import React from 'react';
import '../../../Static/ClassroomCard.css'; 
import { NavLink } from 'react-router-dom';

export default function StudentClassroomCard({ classroom }) {
  return (

    <NavLink
      to={`/queuePage`}
      state={classroom}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <div
        className="navlinkcustom"
        style={{
          height: '205px',
          width: '350px',
          border: '1px solid black',
          boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '15px',
        }}
      >
        {/* Title Section */}
        <div className="mt-4 text-3xl font-bold">
          {classroom ? classroom.subjectName : 'Classroom Name'}
        </div>

         
      </div>
    </NavLink>

  );
}
