import React from 'react';
import { Card } from 'react-bootstrap';

export default function ClassroomCard({ subjectName }) {
  return (
    <div>
      {/* src/Components/Card/ClassroomCard.jsx */}
      <Card className="m-3" style={{ width: '360px' }}>
        <Card.Body>
          <Card.Title>
            {subjectName}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}