import React, { useContext, useEffect, useState } from 'react';  
import TextField from '@mui/material/TextField';
import Select from 'react-select';  
import Button from '@mui/material/Button'; 
import { UserContext } from '../User/UserContext';
import { toast } from 'react-toastify';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Typography } from '@mui/material';
import { Col, Container, Row } from 'react-bootstrap';

// Function to get the current date
function getDate() {
  const today = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month} ${date}, ${year}`;
}



export default function AdviserSetQueue({handleClose,adviser,setAdviser}) {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [classroomOptions, setClassroomOptions] = useState([]);
  const [time, setTime] = useState(null)
  const user = useContext(UserContext).user;
  const [minTime, setMinTime] = useState('');
  const [classID,setClassID] = useState(-1);
  useEffect(() => {
    if(user){
      fetchClassrooms();
    }
    // Function to get the current time in HH:MM format
    const getCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0'); // Add leading zero if needed
      const minutes = String(now.getMinutes()).padStart(2, '0'); // Add leading zero if needed
      return `${hours}:${minutes}`;
    };

    // Set the minimum time to the current time
    setMinTime(getCurrentTime());
  }, []);
  const fetchClassrooms = async ()=>{
    try{
      const response = await fetch(`http://localhost:8080/classroom/getClassrooms?userID=${user.userID}`)

      if(response.ok){
        const data = await response.json();
        let temp = []
        data.map((classroom)=>{
          temp.push({value:classroom.classID, label:`${classroom.subjectName} - ${classroom.section}`})
        })
        setClassroomOptions(temp)
      }
    }catch(err){
      console.log(err)
    }
  }

  

  const options = [
    { value: -1, label: 'All Classrooms' },
    {
      label: 'Your Classrooms',
      options:classroomOptions
    },
  ];

  // para solid ang background ni select/dropdown
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#fff',  
      zIndex: 9999,  
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: '#fff', 
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#fff', 
    }),
  };

  const openQueueing = async () =>{
    if(time < minTime){
      toast.error("Please select valid time.")
    }else{
      try{
        const response = await fetch(`http://localhost:8080/queue/adviser/open`,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              adviserID: user.userID,
              timeEnds: time,
              classID: classID,
          }),
        })
  
        if (response.ok){          
          setAdviser({
            ...adviser,
            ready: true
          })
          handleClose()
        }
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <Container style={{backgroundColor:'white', padding:'15% 15%'}}>
      {adviser?
        <>
          <Row>
            <Col sm={12} md={6} style={{display:'flex', alignItems:'center'}}>
                {/* Calendar Icon */}
                <CalendarMonthIcon style={{ color: '#505050'}} />

                {/* Current Date */}
                <span style={{ fontWeight: 'bold', color: '#505050', fontSize:'calc(10px + 0.5dvw)' }}>{currentDate}</span>
            </Col>
            <Col sm={12} md={6} style={{display:'flex', alignItems:'center'}}>
              {/* Time Picker */}
              <input style={{border:'solid 1px silver', padding:'5px 10px', borderRadius:'5px', width:'100%'}} type="time" min={minTime} onChange={(e)=>{console.log(e.target.value)}}/>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col>
              <Select
                options={options}
                defaultValue={options[0]}
                label="Framework"
                styles={customStyles}
                onChange={(e)=>{setClassID(e.value)}}
              />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col sm={12} md={6} style={{display:'flex', alignItems:'center'}}>
            <Typography variant='caption' fontSize={'10px'}>Enter maximum number of groups for consultation</Typography>
            </Col>
            <Col sm={12} md={6} style={{display:'flex', alignItems:'center'}}>
              <input style={{border:'solid 1px silver', padding:'5px 10px', borderRadius:'5px', width:'100%'}} type='number' defaultValue={0}/>
            </Col>
          </Row>
          <Row className='mt-5 d-flex justify-content-center gap-5'>
            <Button onClick={handleClose} variant='contained' style={{background:'rgba(255,0,0,0.7)',color:'white',textTransform:'none',fontWeight:'bold', width:'30%'}}>Close</Button>
            {!adviser.ready?<Button onClick={openQueueing} variant='contained' style={{background:'#b9ff66',color:'#000',textTransform:'none',fontWeight:'bold', width:'30%'}}>Open</Button>:<></>}
          </Row>
        </>
      :
        <>Loading</>
      }
    </Container>
  );
}
