import { IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Col, Container, NavLink, Row } from 'react-bootstrap';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HistoryIcon from '@mui/icons-material/History';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import '../../Static/ClassroomCard.css';

export default function ClassroomCard({ classroom }) {
  return (
    <Container
      className='mt-4 p-3 shadow-sm navlinkcustom' 
      
    >
      <Row className='h-75' style={{paddingLeft:'20px'}}>
        <Col xs={9}>
         <NavLink
            href={`/queuePage/${classroom.classID}`}
         >
          <Row>
              {/* image */}
              <Col xs={4} style={{backgroundColor:'greenyellow', borderRadius:'5px', height:'85px'}}>

            </Col>
            <Col xs={8} className='d-flex align-items-center justify-content-left' style={{overflow:'hidden'}}>
              <Typography variant='caption' style={{fontWeight:'bold',fontSize:'15px', color:'black'}}>{classroom.subjectName}</Typography>
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
      <div className='iconButtonDiv'>
        <Tooltip title="Meeting Notes" className='tooltipCustom'>
          <IconButton className='iconButtonsCustom'>
            <EventNoteIcon style={{color:'black'}}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Meeting History" className='tooltipCustom'>
          <IconButton className='iconButtonsCustom'>
            <HistoryIcon style={{color:'black'}}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="My Group" className='tooltipCustom'>
          <IconButton className='iconButtonsCustom'>
            <GroupsOutlinedIcon style={{color:'black'}}/>
          </IconButton>
        </Tooltip>
      </div>
    </Container>
  );
}
