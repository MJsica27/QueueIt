import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; 
import '../../Static/ClassroomCard.css';
import { NavLink } from 'react-router-dom';

export default function AdviserClassroomCard({ classroom }) {
  return (
    <div className='navlinkcustom'>
      <Row className='h-75' style={{paddingLeft:'20px'}}>
        <Col xs={9}>
         <NavLink to={`/adviserclassroompage`} state={classroom} style={{textDecoration:'none'}} >
            <Row>
              {/* image */}
                <Col xs={4} style={{backgroundColor:'greenyellow', borderRadius:'5px', height:'85px'}}>

                </Col>
                <Col xs={8} className='d-flex align-items-center justify-content-left' style={{overflow:'hidden'}}>
                 <Typography variant='caption' style={{fontWeight:'bold',fontSize:'15px', color:'black'}}>{classroom?classroom.subjectName:<></>}</Typography>
                </Col>
            </Row>
         </NavLink>
        </Col>
            <Col xs={3} className='d-flex align-items-center justify-content-center'>
            <IconButton>
                <MoreHorizIcon/>
            </IconButton>
            </Col>
      </Row>
    </div>
  );
}
