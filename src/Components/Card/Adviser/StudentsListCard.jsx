import React from 'react';
import { Card } from 'react-bootstrap';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import bin from '../../../Assets/icons/bin.png'
import edit from '../../../Assets/icons/transfer-student.png' 

export default function StudentList({ fullName, userName }) {

  
  return (
    <div>       
    <Card className="m-0" style={{ width: 'auto', backgroundColor: '#eee', width: '430px' }}>
      <Card.Body className="d-flex align-items-center justify-content-between">
        {/* Profile picture */}
        <div className="d-flex align-items-center">
        <AccountCircleIcon alt="User Profile" style={{ fontSize: '2.3rem' }} />
          
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
    </div>
  );  
}
