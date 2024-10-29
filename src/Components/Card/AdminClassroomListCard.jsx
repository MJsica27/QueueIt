import React from 'react';
import { Card } from 'react-bootstrap';
import bin from '../../Assets/icons/bin.png';
import edit from '../../Assets/icons/edit.png';
import groupUser from '../../Assets/icons/group-users.png';

export default function AdminClassroomListCard({ classID, classCode, subjectName, subjectCode, adviserID, section, onDelete }) {

  return (
    <Card className="mt-3" style={{ width: 'auto' }}>
      <Card.Body className="d-flex align-items-center justify-content-between">
        {/* Profile picture */}
        <div className="d-flex align-items-center" style={{ gap: '100px', marginLeft: '70px' }}>
          <h6 className="flex-grow-1">{adviserID}</h6>
          <h6 className="flex-grow-1">{subjectCode}</h6>
          <h6 className="flex-grow-1">{subjectName} - {section}</h6> 
          <h6 className="flex-grow-1">{classCode}</h6>
        </div>

        {/* Edit and Bin */}
        <div className="ml-auto">
          <img
            src={groupUser}
            alt="Group User"
            style={{ width: '25px', height: '25px', marginRight: '100px' }}
          />
          <img
            src={edit}
            alt="Edit Icon"
            style={{ width: '25px', height: '25px', marginRight: '10px' }}
          />
          <img
            src={bin}
            alt="Delete Icon"
            style={{ width: '25px', height: '25px', cursor: 'pointer' }}
            onClick={() => onDelete(classID)}   
          />
        </div>
      </Card.Body>
    </Card>
  );  
}
