import { IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HistoryIcon from '@mui/icons-material/History';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import '../../../Static/ClassroomCard.css'; 
import { NavLink } from 'react-router-dom';

export default function StudentClassroomCard({ classroom }) {
  return (

    <NavLink
      to={`/queuePage`}
      state={classroom}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <div
        className="navlinkcustom"
        style={{
          height: '205px',
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

         
      </div>
    </NavLink>

    // <div
    //   className='navlinkcustom'
    // >
    //   <NavLink
    //         to={`/queuePage`}
    //         state={classroom}
    //         style={{textDecoration:'none'}}
    //      > 
    //   <Row   style={{paddingLeft:'20px'}}>
    //     <Col xs={9}> 
    //       <Row>
    //           {/* image */}
    //           <Col xs={4} style={{backgroundColor:'greenyellow', borderRadius:'5px', height:'85px'}}>
    //         </Col>
    //         <Col xs={8} className='d-flex align-items-center justify-content-left' style={{overflow:'hidden'}}>
    //           <Typography variant='caption' style={{fontWeight:'bold',fontSize:'15px', color:'black'}}>{classroom?classroom.subjectName:<></>}</Typography>
    //         </Col>
    //         </Row>
    //     </Col>
    //     <Col xs={3} className='d-flex align-items-center justify-content-center'>
    //       <IconButton>
    //         <MoreHorizIcon/>
    //       </IconButton>
    //     </Col>
    //   </Row>
    //   <Row>
    //     <div className='iconButtonDiv'>
    //       <Tooltip title="Meeting Notes" className='tooltipCustom'>
    //         <IconButton className='iconButtonsCustom'>
    //           <EventNoteIcon style={{color:'black'}}/>
    //         </IconButton>
    //       </Tooltip>
    //       <Tooltip title="Meeting History" className='tooltipCustom'>
    //         <IconButton className='iconButtonsCustom'>
    //           <HistoryIcon style={{color:'black'}}/>
    //         </IconButton>
    //       </Tooltip>
    //       <Tooltip title="My Group" className='tooltipCustom'>
    //         <IconButton className='iconButtonsCustom'>
    //           <GroupsOutlinedIcon style={{color:'black'}}/>
    //         </IconButton>
    //       </Tooltip>
          
    //     </div>
    //   </Row>
    //   </NavLink>
    // </div>

  );
}
