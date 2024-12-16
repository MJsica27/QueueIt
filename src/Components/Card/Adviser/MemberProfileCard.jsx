import React from 'react';
import { Button, Card, CardBody } from 'react-bootstrap';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export default function MemberProfileCard({ fullName }) {
  return (
    <Card
      style={{
        height: '280px',
        width: '200px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '5px',
        border: '1px solid black',
        transition: 'background-color 0.3s ease',
      }}
    >
      <CardBody
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {/* Icon Container */}
        <div
          style={{
            height: '150px',
            width: '150px',
            border: '1px solid black',
            display: 'flex',
            borderRadius: '5px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PermIdentityIcon style={{ fontSize: '150px' }} />
        </div>

        {/* Full Name */}
        <Card.Text
          style={{
            textAlign: 'center', 
            fontWeight: '500',
          }}
        >
          {fullName}
        </Card.Text>

        {/* Button */}
        <Button
          style={{
            backgroundColor: '#cdfc56',
            border: '1px solid black',
            borderRadius: '30px',
            color: 'black',
          }}
        >
          View Journal
        </Button>
      </CardBody>
    </Card>
  );
}
