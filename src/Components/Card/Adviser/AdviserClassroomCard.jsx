import { Typography } from '@mui/material';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../../Static/ClassroomCard.css'; 
import { NavLink } from 'react-router-dom';  

export default function AdviserClassroomCard({ classroom }) {
 
  const handleAction = (action) => {
    console.log(action);  
};

  return ( 
    <>
      <Row className="h-100" style={{ padding: '10px 10px 0px 10px', height: '100%' }}>
        <Col xs={9} className="d-flex align-items-center">  
          <NavLink to={`/adviserclassroompage`} state={classroom} style={{ textDecoration: 'none'}}>
            <div className="navlinkcustom" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s', height: '100%' , width: '300px'}}>
            
            <Row className="align-items-center" style={{ width: '100%' }}>  
              {/* Image placeholder */}
              <Col xs={4} style={{ backgroundColor: '#b9ff66', borderRadius: '8px', height: '85px', display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
                <Typography variant="h6" style={{ color: '#fff', fontWeight: 'bold' }}>IMG</Typography>
              </Col>
              {/* Classroom info */}
              <Col xs={8} className="d-flex align-items-center" style={{ overflow: 'hidden', paddingLeft: '10px' }}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontSize: '16px', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden',  textOverflow: 'ellipsis', }}>
                  {classroom ? classroom.subjectName : 'Classroom Name'}
                </Typography>
              </Col>
            </Row>
            </div>
          </NavLink>
           
        </Col>
      </Row>
    </>
      
 
  );
}
