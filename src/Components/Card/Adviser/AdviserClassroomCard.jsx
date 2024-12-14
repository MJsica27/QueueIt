import { Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';

export default function AdviserClassroomCard({ classroom }) {
  return (
    <NavLink
      to={`/adviserclassroompage`}
      state={classroom}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <div
        className="navlinkcustom"
        style={{
          height: '215px',
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

        {/* Enrollees Section (Bottom Part) */}
        <div className="d-flex align-items-center" style={{ marginTop: 'auto' }}>
          <GroupIcon style={{ color: 'black' }} />
          <Typography style={{ marginLeft: '5px', color: '#333' }}>
            6 Enrollees
          </Typography>
        </div>
      </div>
    </NavLink>
  );
}
