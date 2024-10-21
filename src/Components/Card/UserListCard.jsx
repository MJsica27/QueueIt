import React from 'react';
import { Card } from 'react-bootstrap';
import pu from '../../Assets/icons/profile-user.png';
import bin from '../../Assets/icons/bin.png'
import edit from '../../Assets/icons/edit.png'

export default function UserListCard({ fullName, userName }) {

  
  return (
    <Card className="m-3" style={{ width: 'auto' }}>
      <Card.Body className="d-flex align-items-center justify-content-between">
        {/* Profile picture */}
        <div className="d-flex align-items-center">
          <img
            src={pu}
            alt="User Profile"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
          <div className="mx-2">
            <Card.Text className="mb-0">{fullName}</Card.Text>
            <Card.Text className="text-muted">{userName}</Card.Text>
          </div>
        </div>

        {/* Edit and Bin */}
        <div className="ml-auto">
          <img
            src={edit}
            alt="Edit Icon"
            style={{ width: '25px', height: '25px', marginRight: '10px' }}
          />
          <img
            src={bin}
            alt="Delete Icon"
            style={{ width: '25px', height: '25px' }}
          />
        </div>
      </Card.Body>
    </Card>
  );  
}
