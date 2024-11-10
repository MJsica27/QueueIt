import { Typography } from '@mui/material';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../../Static/ClassroomCard.css'; 
import { NavLink } from 'react-router-dom';  
import GroupIcon from '@mui/icons-material/Group';

export default function AdviserClassroomCard({ classroom }) {
  

  return ( 
    <div className="navlinkcustom">
      <NavLink to={`/adviserclassroompage`} state={classroom} style={{ textDecoration: 'none'}}>
        <Row  style={{ paddingLeft:'20px'}}>
          <Col xs={9} >    
            <Row className="align-items-center" style={{ width: '100%' }}>  
              {/* Image placeholder */}
              <Col xs={4} style={{ backgroundColor: '#b9ff66', borderRadius: '5px', height: '85px', display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
                <Typography variant="h6" style={{ color: '#fff', fontWeight: 'bold' }}>IMG</Typography>
              </Col>
              {/* Classroom info */}
              <Col xs={8} className="d-flex align-items-center" style={{ overflow: 'hidden', paddingLeft: '10px' }}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontSize: '16px', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden',  textOverflow: 'ellipsis', }}>
                  {classroom ? classroom.subjectName : 'Classroom Name'}
                </Typography>
              </Col>
              <div>
                <GroupIcon style={{color:'black'}}/>
                {/* show how many student enrolled this classroom */}
              </div>
            </Row> 
          
          </Col>
        </Row> 
      </NavLink> 
    </div>
      
 
  );
}
